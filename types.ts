import { Hash } from './holochain'
import { Map } from "immutable"  // import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type HCHCState = {
  currentAgent: {agent: {Hash: Hash, Name: string}}| null,
  MyApps: [{Entry:AppDetailState, Hash: Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  currentAppDetails: {Entry: AppDetailState, Hash: Hash} | null,
  reviewEntries: [ReviewLog] | [{}],
  currentCategory: string | null,
  appsByCategory: Array<{Entry: AppDetailState, Hash: Hash}> | null, // A map parigin of the category string AND the array of app hashes and names(titles), belonging to that app Category...
  appCode: AppDNACode | null,
  UIappLink: uiLinkParams | null,
};

export type AppDetailState = {
  author: {Hash: Hash, Name: string},
  thumbnail: string,
  description: HTMLInputElement | string,
  title: string,
  uuid: string,
}

export type AppDNACode = {
  fileload: Map<Hash, {dna: string}>,
}

export type uiLinkParams = {
  title: string,
  link: string,
  thumbnail: string,
  appHash: Hash,
}

export type coreCodeFile = {
  fileload: Map<Hash, CodeParams>,
}

export type CodeParams = {
  dna: string,
  test: string
}

export type ReviewLog = {
  authorHash: Hash,
  authorName: string,
  rating: number,
  review: string,
  timestamp?: number
} | null


// ================================
//      Redux Action Typing
// ================================

export type ReduxAction
  = {type: 'RETURN_STATE'}
  | {type: 'UPLOAD_FILE_REQUEST'}
  | {type: 'UPLOAD_FILE_SUCCESS'}
  | {type: 'UPLOAD_FILE_ERROR'}

  | { type: 'FETCH_AGENT', agent: {Hash: Hash, Name: string}}
  | { type: 'REGISTER_CATEGORY', category: string }
  | { type: 'REGISTER_APP_HASH', appHash: string }

  | { type: 'FETCH_ALL_APPS', myApps: [{Entry:AppDetailState, Hash: Hash}] }  // {Hash:Hash, icon: string}
  | { type: 'GET_APPS_BY_CATEGORY', appsByCurrentCategory: Array<{Entry: AppDetailState, Hash: Hash}> }
  | { type: 'VIEW_APP', details: AppDetailState }
  | { type: 'FETCH_APP_CODE', code: CodeParams }
  | { type: 'FETCH_REVIEWS', reviewEntries: [ReviewLog]}

  | { type: 'CREATE_NEW_APP_DETAILS', params: AppParams }
  | { type: 'CREATE_NEW_APP_CODE', params: AppDNACode }
  | { type: 'SET_CURRENT_APP', agent: string }


export interface AppParams {
 author: string,
 description: string,
 fileload: string
}

export interface ReviewParams {
 appHash: Hash,
 // author: Map<Hash, string>,
 authorHash: Hash,
 authorName: string,
 rating: number,
 review: string,
timestamp?: number
}
