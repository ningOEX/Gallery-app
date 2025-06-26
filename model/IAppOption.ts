import type { User } from './user'
export interface IAppOption {
  globalData: {
    user: User
	vaild?: boolean
	tokenValidity:Function
	updateUserInfo: Function
	getUser: Function
  }
}
