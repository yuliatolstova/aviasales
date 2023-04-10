import React from 'react'
// import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { setSortedButton } from '../../store/actions'

import styles from './Sort.module.scss'

export default function Sort() {
  const dispatch = useDispatch()
  const sortedButton = useSelector((state) => state.sortedButton)
  const onChangeButton = (value) => {
    dispatch(setSortedButton(value))
  }
  const items = [
    {
      key: 'cheapest',
      label: 'самый дешевый',
    },
    {
      key: 'fastest',
      label: 'самый быстрый',
    },
    {
      key: 'optimal',
      label: 'оптимальный',
    },
  ]
  return (
    <div className={styles.sort}>
      {items.map((item) => {
        let classSorted = `${styles.sort__tab}`
        if (sortedButton === item.key) {
          classSorted = `${styles.sort__tab} ${styles.sorted}`
        }
        return (
          <button
            key={item.key}
            className={classSorted}
            onClick={() => {
              onChangeButton(item.key)
            }}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
