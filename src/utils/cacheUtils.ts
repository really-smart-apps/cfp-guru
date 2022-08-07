import lf from "localforage";
import filter from "lodash/filter";
import forEach from "lodash/forEach";
import includes from "lodash/includes";

export interface IRequiredCache<T> {
  value: T;
}
export interface IBaseCache<T> extends IRequiredCache<T> {
  lastModifiedDate?: string;
  expiresAt?: number;
}

export interface ICacheOptions {
  expireAt?: number;
}

export function isFirefox(): boolean {
  return "MozAppearance" in document.documentElement.style;
}

export function getCacheValue<T>(cacheValue: IBaseCache<T>): T | undefined {
  const value = cacheValue?.value;
  return !!value ? value : undefined;
}

export function cacheObjectFactory<T>(value: T): IRequiredCache<T> {
  return { value };
}

export class CacheUtilsService<P extends string> {
  private localForage: typeof lf;

  /* eslint-disable @typescript-eslint/no-inferrable-types */
  public indexDBAvailable: boolean = true;
  static localStorageAvailable: boolean = true;

  /* eslint-enable @typescript-eslint/no-inferrable-types */

  constructor(localForage: typeof lf, options: LocalForageOptions) {
    // For FF only attempt to determine if indexDB is available, this mainly affects
    // FF private mode
    const store = localForage.createInstance(options);
    try {
      if (isFirefox() && window.indexedDB) {
        const db = indexedDB.open("test");
        db.onerror = () => {
          this.indexDBAvailable = false;
        };
      }
    } catch (e) {
      console.warn("IndexDB unavailable.");
      this.indexDBAvailable = false;
    }

    // For FF, if indexDB isn't available and localStorage is, prefer localStorage
    if (
      isFirefox() &&
      !this.indexDBAvailable &&
      CacheUtilsService.localStorageAvailable
    ) {
      store.setDriver([localForage.LOCALSTORAGE, localForage.WEBSQL]);
    } else if (
      isFirefox() &&
      !this.indexDBAvailable &&
      !CacheUtilsService.localStorageAvailable
    ) {
      // If indexDB and localStorage aren't available, try WEBSQL as a last resort
      store.setDriver([localForage.WEBSQL]);
    }

    this.localForage = store;
  }

  makeKey(namespace: P, key: string): string {
    return `${namespace}-${key}`;
  }

  set<S extends IBaseCache<T>, T>(
    namespace: P,
    key: string,
    obj: S
  ): Promise<S> {
    if (!obj.lastModifiedDate) {
      obj.lastModifiedDate = new Date().toISOString();
    }
    return this.setWithFullKey(this.makeKey(namespace, key), obj);
  }

  setWithFullKey<S extends IBaseCache<T>, T>(key: string, obj: S): Promise<S> {
    try {
      return this.localForage.setItem(key, obj);
    } catch (e: any) {
      console.warn(`Unable to set ${key} due to: ${e.message}`);
    }
  }

  get<S>(namespace: P, key: string): Promise<S> {
    return this.getWithFullKey<S>(this.makeKey(namespace, key));
  }

  getWithFullKey<S>(key: string): Promise<S> {
    try {
      return this.localForage.getItem<S>(key);
    } catch (e: any) {
      console.warn(`Unable to get ${key} due to: ${e.message}`);
    }
  }

  delete(namespace: P, key: string): Promise<void> {
    return this.deleteWithFullKey(this.makeKey(namespace, key));
  }

  deleteWithFullKey(key: string): Promise<void> {
    try {
      return this.localForage.removeItem(key);
    } catch (e: any) {
      console.warn(`Unable to delete ${key} due to: ${e.message}`);
    }
  }

  clear(): Promise<void> {
    try {
      return this.localForage.clear();
    } catch (e: any) {
      console.warn(`Unable to clear all cache: ${e.message}`);
    }
  }

  keys(namespace?: P): Promise<string[]> {
    try {
      if (namespace) {
        return this.localForage.keys().then((keys: string[]) => {
          if (keys) {
            return filter(keys, (key) => includes(key, namespace));
          } else {
            return [];
          }
        });
      } else {
        return this.localForage.keys();
      }
    } catch (e: any) {
      console.warn(
        `Unable to get keys from namespace ${namespace} due to: ${e.message}`
      );
    }
  }

  async expireCache(): Promise<void> {
    try {
      const keys = await this.keys();
      forEach(keys, (k) => {
        this.localForage.getItem(k).then((c: any) => {
          if (c.expiresAt && +new Date() > c.expiresAt) {
            this.localForage.removeItem(k);
          }
        });
      });
    } catch (e: any) {
      console.warn(`Could not expire indexdb cache: ${e.message}`);
    }
  }
}
