import React, { useState } from 'react'
import { Button, Space, Spin } from 'antd'
// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import TicketCard from '../TicketCard/TicketCard'

import styles from './TicketsList.module.scss'

export default function TicketsList() {
  const ticketsList = useSelector((state) => state.ticketsList)
  const checkedList = useSelector((state) => state.checkedList)
  const checkAll = useSelector((state) => state.checkAll)
  const sortedButton = useSelector((state) => state.sortedButton)
  const loaded = useSelector((state) => state.loaded)
  const [visibleTickets, setVisibleTickets] = useState(5)
  const filterTickets = (ticketsList) => {
    let filteredTickets
    if (checkAll) {
      filteredTickets = ticketsList
    } else if (checkedList.length > 0) {
      filteredTickets = ticketsList.filter((item) => {
        if (
          checkedList.includes('Без пересадок') &&
          (item.segments[0].stops.length === 0 || item.segments[1].stops.length === 0)
        ) {
          return true
        }
        if (
          checkedList.includes('1 пересадка') &&
          (item.segments[0].stops.length === 1 || item.segments[1].stops.length === 1)
        ) {
          return true
        }
        if (
          checkedList.includes('2 пересадки') &&
          (item.segments[0].stops.length === 2 || item.segments[1].stops.length === 2)
        ) {
          return true
        }
        if (
          checkedList.includes('3 пересадки') &&
          (item.segments[0].stops.length === 3 || item.segments[1].stops.length === 3)
        ) {
          return true
        }
      })
    } else return []
    return filteredTickets.slice(0, visibleTickets)
  }
  const sortTickets = (tickets) => {
    switch (sortedButton) {
      case 'cheapest':
        return tickets.sort((a, b) => a.price - b.price)
      case 'fastest':
        return tickets.sort((a, b) => {
          const durationA = a.segments[0].duration + a.segments[1].duration
          const durationB = b.segments[0].duration + b.segments[1].duration
          return durationA - durationB
        })
      case 'optimal':
        return tickets.sort((a, b) => {
          const priceDiff = a.price - b.price
          const durationDiff = a.segments[0].duration - b.segments[0].duration
          return 0.6 * priceDiff + 0.4 * durationDiff
        })
      default:
        return tickets
    }
  }
  let newList = filterTickets(sortTickets([...ticketsList]))
  const showMoreTickets = () => {
    setVisibleTickets(visibleTickets + 5)
  }
  const spin =
    !loaded && (checkedList.length > 0 || checkAll) ? <Spin size="large" className={styles.tickets__spin} /> : null
  const btnMore = (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Button type="primary" block className={styles.tickets__btn} onClick={showMoreTickets}>
        Показать еще 5 билетов
      </Button>
    </Space>
  )

  let maxId = 0
  function counter() {
    maxId++
    return maxId
  }
  return (
    <div className={styles.tickets}>
      {spin}
      <>
        {newList.map((item) => {
          const id = counter()
          return (
            <TicketCard
              key={
                item.price +
                item.airlines +
                item.segments[0].origin +
                item.segments[0].destination +
                item.segments[0].duration +
                item.segments[0].stops +
                id
              }
              {...item}
            />
          )
        })}
        <>{visibleTickets <= newList.length && btnMore}</>
      </>
    </div>
  )
}
