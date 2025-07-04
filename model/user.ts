import {DowlodURL} from "./ImagesForm"

export interface User {
  _id: string
  nickname?: string
  phone: string
  createdAt: string
  introduction?:string
  avatar?: DowlodURL[]
}
