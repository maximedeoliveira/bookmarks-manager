import { TimeUnits } from '@/types/date'

/**
 * Format un timestamp en une chaîne de caractères de type dd/mm/yyyy
 * @param timestamp
 */
export const formatDateTimeToString = (timestamp: number): string => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('fr-FR').format(date)
}

const timeUnits: TimeUnits = [
    { unit: 'year', value: 24 * 60 * 60 * 1000 * 365 },
    { unit: 'month', value: (24 * 60 * 60 * 1000 * 365) / 12 },
    { unit: 'day', value: 24 * 60 * 60 * 1000 },
    { unit: 'hour', value: 60 * 60 * 1000 },
    { unit: 'minute', value: 60 * 1000 },
    { unit: 'second', value: 1000 },
]

/**
 * Format un timestamp en une chaîne de caractères de type il y a xx secondes
 * @param timestamp
 */
export const formatDateTimeToRelativeTime = (timestamp: number): string => {
    const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' })

    const now = new Date().getTime()
    const diff = timestamp - now

    const bestUnit = timeUnits
        .reverse()
        .find((val) => Math.abs(diff) > val.value)

    return rtf.format(
        Math.round(diff / (bestUnit?.value ?? 1000)),
        bestUnit?.unit ?? 'second'
    )
}

/**
 * Format une durée en une chaîne de caractères de type xx:xx
 * @param duration
 */
export const formatDuration = (duration: number): string => {
    const result = []
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration - hours * 3600) / 60)
    const seconds = duration - hours * 3600 - minutes * 60

    if (hours > 0) {
        result.push(hours < 10 ? `0${hours}` : hours)
    }

    if (minutes > 0) {
        result.push(minutes < 10 ? `0${minutes}` : minutes)
    }

    if (seconds > 0) {
        result.push(seconds < 10 ? `0${seconds}` : seconds)
    }

    return result.join(':')
}
