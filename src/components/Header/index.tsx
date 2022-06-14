import { SyntheticEvent, useRef, useState } from 'react'
import { useApp } from '@/providers/AppProvider'
import Spinner from '@/components/icons/Spinner'
import Error from '@/components/icons/Error'
import './header.css'

const Header = () => {
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { addBookmark, isLoading } = useApp()

    const handleSubmit = (e: SyntheticEvent) => {
        if (inputRef.current && inputRef.current?.value !== '') {
            setError(null)

            addBookmark(inputRef.current.value.trim())
                .then(() => {
                    inputRef.current!.value = ''
                    inputRef.current!.focus()
                })
                .catch((e: string) => setError(e))
        }

        e.preventDefault()
    }

    return (
        <div className="header">
            <h1>Bookmarks manager</h1>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    name="bookmark"
                    placeholder="Saisir une URL ..."
                />
                <button type="submit" className="btn btn-primary">
                    {isLoading && <Spinner />}
                    Ajouter
                </button>
                {error && (
                    <div className="error">
                        <Error />
                        <p className="error">{error}</p>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Header
