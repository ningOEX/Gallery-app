export interface DowlodURL{
	fileID?:string
	tempFileURL?: string
}

export interface ImagesForm {
  title: string // 标题
  description: string //描述
  images: string[] // 上传作品数组
  type:string // 作品类型
  views:number // 点赞
  nickname?:string
  uid?:string // 用户id
  dowlodURL: DowlodURL[] // 下载连接
  createdAt?:string // 创建时间
  timestamp: number // 时间戳
  token?: string | null
}
