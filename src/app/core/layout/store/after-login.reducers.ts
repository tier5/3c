import * as fromApp from '../../store/core.reducers';
import { ProfileState } from './profile/profile.reducers'
import * as fromProfile from './profile/profile.reducers';
import { ActionReducerMap } from '@ngrx/store'

export interface AfterLoginFeatureState extends fromApp.AppState {
  profile: State
}

export interface State {
  profile: ProfileState;
};

// export interface FeatureState implemennts fromApp.AppState{
//   profile: fromProfile.ProfileState
// }
//
// export const reducers: ActionReducerMap<FeatureState> = {
//   profile: fromProfile.profileReducer,
// };