export type PostStatisticType = {
  favorites: number
  downloads: number
}

export type PostType = {
  title: string
  author: string
  id: string
  statistic: PostStatisticType
  tags: string[]
  photo: string
}

export type CurrentUserType = {
  id: string
  username: string
  email: string
  favorites: Array<PostType>
  posts: Array<PostType>
}

export type HandlersType = {
  downloadHandler?: (options: PostType) => void
  slideShowHandler?: () => void
  deletePhotoHandler?: (options: PostType) => void
}
