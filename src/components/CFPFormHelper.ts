import { ConferenceAttendeeMembers } from "../enum/conferenceAttendeeMembers";
import { ConferenceCommitteeMembers } from "../enum/conferenceCommitteeMembers";
import { ConferenceTypes } from "../enum/conferenceTypes";
import { getCacheValue, IBaseCache } from "../utils/cacheUtils";
import {
  CFPFormCacheNamespaces,
  CfpFormCacheUtils,
} from "../utils/cfpFormCacheUtils";

export interface IConferenceFormState {
  conferenceType: ConferenceTypes;
  conferenceCommitteeMember: ConferenceCommitteeMembers;
  conferenceAttendeeMember: ConferenceAttendeeMembers;
  problem: string;
  problemReason: string;
  title: string;
  titleProblemSolution: string;
  takeways: string;
}

export const initialConfFormState: IConferenceFormState = {
  conferenceType: ConferenceTypes.FREE,
  conferenceCommitteeMember: ConferenceCommitteeMembers.EXPERT_DOMAIN,
  conferenceAttendeeMember: ConferenceAttendeeMembers.DIVERSE_INSIGHTS,
  problem: "",
  problemReason: "",
  title: "",
  titleProblemSolution: "",
  takeways: "",
};

export async function getCfpFormCache(): Promise<IConferenceFormState> {
  try {
    const cacheValue = await CfpFormCacheUtils.get<
      IBaseCache<IConferenceFormState>
    >(CFPFormCacheNamespaces.CFP_FORM.name, "cfpform");

    return getCacheValue(cacheValue);
  } catch (e) {
    console.error(e);
  }
}

export async function setCfpFormCache(
  value: IConferenceFormState
): Promise<void> {
  try {
    await CfpFormCacheUtils.set(
      CFPFormCacheNamespaces.CFP_FORM.name,
      "cfpform",
      {
        value: value,
      }
    );
  } catch (e) {
    console.error(e);
  }
}
