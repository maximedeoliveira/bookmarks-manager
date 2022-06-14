import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Bookmark, Provider } from '@/types'
import { PROVIDER_REGEX } from '@/utils/regex'
import { AppState, STATE_KEY } from '@/providers/AppProvider/types'

const AppContext = createContext({} as AppState)

type AppProviderProps = {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(
        JSON.parse(localStorage.getItem(STATE_KEY) as string) ?? []
    )
    const [isLoading, setIsLoading] = useState(false)

    const addBookmark = async (str: string) => {
        setIsLoading(true)

        if (bookmarks.find((b) => b.url === str)) {
            return throwError(`L'élément existe déjà`)
        }

        if (!PROVIDER_REGEX.test(str)) {
            return throwError('Le lien doit provenir de Vimeo ou de Flickr')
        }

        const data = await fetch(`https://noembed.com/embed?url=${str}`)
            .then((res) => res.json())
            .catch((e) => console.log(e))

        if (data.error && data.error === '404 Not Found') {
            return throwError('Elément non trouvé')
        }

        const provider = data.provider_name
        setBookmarks([
            {
                thumbnail: data.thumbnail_url,
                url: data.url,
                title: data.title,
                author: data.author_name,
                addedAt: new Date().getTime(),
                publishedAt: data.upload_date ?? null,
                duration: provider === Provider.VIMEO ? data.duration : null,
                height: provider === Provider.FLICKR ? data.height : null,
                width: provider === Provider.FLICKR ? data.width : null,
            },
            ...bookmarks,
        ])

        setIsLoading(false)
    }

    const throwError = (error: string) => {
        setIsLoading(false)
        return Promise.reject(error)
    }

    const removeBookmark = async (str: string) => {
        setBookmarks([...bookmarks.filter((b) => b.url !== str)])
    }

    useEffect(() => {
        localStorage.setItem(STATE_KEY, JSON.stringify(bookmarks))
    }, [bookmarks])

    return (
        <AppContext.Provider
            value={{ bookmarks, addBookmark, removeBookmark, isLoading }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    if (!AppContext) {
        throw new Error('AppContext should not be null')
    }

    return useContext(AppContext)
}
