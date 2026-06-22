import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import * as dates from '../utils/dates'
import '../css/Event.css'

const Event = (props) => {
    const [event, setEvent] = useState({})
    const [time, setTime] = useState('')
    const [remaining, setRemaining] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventsById(props.id)
                setEvent(eventData)
            }
            catch (error) {
                console.log(error)
            }
        })()
    }, [props.id])

    useEffect(() => {
        if (!event.time) return
        const result = dates.formatTime(event.time)
        setTime(result)
    }, [event])

    useEffect(() => {
        if (!event.date || !event.time) return
        const eventDateTime = dates.getEventDateTime(event.date, event.time)
        const timeRemaining = dates.formatRemainingTime(eventDateTime)
        setRemaining(timeRemaining)
        dates.formatNegativeTimeRemaining(timeRemaining, event.id)
    }, [event])

    return (
        <article className='event-information'>
            <img src={event.image} />
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date ? event.date.split('T')[0] : ''} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}
export default Event