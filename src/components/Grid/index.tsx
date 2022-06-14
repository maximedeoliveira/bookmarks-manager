import { useApp } from '@/providers/AppProvider'
import Card from '@/components/Card'
import './grid.css'

const Grid = () => {
    const { bookmarks } = useApp()

    return (
        <div className="grid">
            {bookmarks?.map((bookmark) => (
                <Card key={bookmark.url} {...bookmark} />
            ))}
        </div>
    )
}

export default Grid
