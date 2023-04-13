import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import styles from './TicketCard.module.scss'

export default function TicketCard({ price, airlines, segments }) {
  const timeTravel = (data, duration) => {
    let timeDeparture = new Date(data)
    let timeArrivals = new Date(timeDeparture.getTime() + duration * 60 * 1000)
    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    }
    return [formatTime(timeDeparture), formatTime(timeArrivals)]
  }
  let info = segments.map((seg) => {
    const [timeDeparture, timeArrivals] = timeTravel(seg.date, seg.duration)
    return (
      <div key={seg.origin + seg.destination + seg.duration} className={styles.ticket__info}>
        <div className={styles.ticket__way}>
          <span className={styles.ticket__title}>{`${seg.origin} - ${seg.destination}`}</span>
          <span className={styles.ticket__subTitle}>{`${timeDeparture} - ${timeArrivals}`}</span>
        </div>
        <div className={styles.ticket__wayTime}>
          <span className={styles.ticket__title}>В пути</span>
          <span className={styles.ticket__subTitle}>{`${Math.floor(seg.duration / 60)}ч ${seg.duration % 60}м`}</span>
        </div>
        <div className={styles.ticket__transfers}>
          <span className={styles.ticket__title}>
            {seg.stops.length ? `${seg.stops.length} пересадки` : 'Без пересадок'}
          </span>
          <span className={styles.ticket__subTitle}>{seg.stops.join(', ')}</span>
        </div>
      </div>
    )
  })
  return (
    <Card className={styles.ticket} bodyStyle={{ padding: '0' }}>
      <div className={styles.ticket__header}>
        <span className={styles.ticket__price}>{`${price} Р`}</span>
        <img
          src={`https://pics.avs.io/99/36/${airlines}.png`}
          alt="airlines logo"
          aria-label="airlines logo"
          className={styles.ticket__logo}
        />
      </div>
      {info}
    </Card>
  )
}
TicketCard.defaultProps = {
  price: '',
  airlines: '',
  segments: [],
}
TicketCard.PropTypes = {
  price: PropTypes.string,
  airlines: PropTypes.string,
  segments: PropTypes.array,
}
