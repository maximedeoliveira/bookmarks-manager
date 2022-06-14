export enum Provider {
    VIMEO = 'Vimeo',
    FLICKR = 'Flickr',
}

export type Bookmark = {
    thumbnail: string
    url: string
    title: string
    author: string
    addedAt: number
    publishedAt: number
    duration?: number
    height?: number
    width?: number
}
