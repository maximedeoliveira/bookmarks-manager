import { Bookmark } from '@/types'

export const STATE_KEY = 'bookmarksManager'

export type AppState = {
    bookmarks: Bookmark[]
    addBookmark: Function
    removeBookmark: Function
    isLoading: boolean
}
