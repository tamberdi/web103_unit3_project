export const formatTime = (time) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export const getEventDateTime = (date, time) => {
    if (!date || !time) return null
    const dateStr = date.split('T')[0]
    return new Date(`${dateStr}T${time}`)
}

export const formatRemainingTime = (eventDateTime) => {
    if (!eventDateTime) return ''
    const now = new Date()
    const diffMs = eventDateTime - now

    const isPast = diffMs < 0
    const absMs = Math.abs(diffMs)

    const days = Math.floor(absMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((absMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (isPast) {
        return `Event passed ${days}d ${hours}h ago`
    }
    return `${days}d ${hours}h remaining`
}

export const formatNegativeTimeRemaining = (remainingText, eventId) => {
    if (!remainingText) return
    const el = document.getElementById(`remaining-${eventId}`)
    if (el && remainingText.includes('passed')) {
        el.classList.add('event-passed')
    }
}