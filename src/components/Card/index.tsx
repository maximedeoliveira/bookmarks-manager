import { Bookmark } from '@/types'
import { useApp } from '@/providers/AppProvider'
import './card.css'
import {
    formatDateTimeToRelativeTime,
    formatDateTimeToString,
    formatDuration,
} from '@/utils/date'

type CardProps = Bookmark

const Card = (props: CardProps) => {
    const { removeBookmark } = useApp()

    return (
        <div className="card">
            <img alt={props.title} src={props.thumbnail} />
            <div className="content">
                <p>
                    <span>Titre :</span>
                    {props.title}
                </p>
                <p>
                    <span>URL :</span>
                    {props.url}
                </p>
                <p>
                    <span>Auteur :</span>
                    {props.author}
                </p>
                <p>
                    <span>Date d'ajout :</span>
                    {formatDateTimeToRelativeTime(props.addedAt)}
                </p>
                <p>
                    <span>Date de publication :</span>
                    {props.publishedAt
                        ? formatDateTimeToString(props.publishedAt)
                        : 'N/C'}
                </p>
                {props.duration && (
                    <p>
                        <span>Durée :</span>
                        {formatDuration(props.duration)}
                    </p>
                )}
                {props.width && props.height && (
                    <p>
                        <span>Largeur x Hauteur :</span>
                        {props.width} x {props.height}
                    </p>
                )}
                <div className="btn-group">
                    <a
                        className="btn btn-primary"
                        href={props.url}
                        target="_blank"
                    >
                        Ouvrir
                    </a>
                    <button
                        className="btn btn-danger"
                        onClick={() => removeBookmark(props.url)}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
