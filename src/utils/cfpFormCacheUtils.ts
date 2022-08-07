import localForageCfpForm from "localforage";

import { CacheUtilsService } from "./cacheUtils";

export const CFP_FORM_CACHE_STORAGE_NAME = "cfp-form-lf";

export const CFPFormCacheNamespaces = {
  CFP_FORM: {
    name: "cfpForm" as CFPFormCacheNamespace,
  },
};
export type CFPFormCacheNamespace = "cfpForm";

export const CfpFormCacheUtils = new CacheUtilsService<CFPFormCacheNamespace>(
  localForageCfpForm,
  {
    name: CFP_FORM_CACHE_STORAGE_NAME,
  }
);
