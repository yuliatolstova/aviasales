import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd'
// import { debounce } from 'lodash'

import Filter from '../Filter/Filter'
import Sort from '../Sort/Sort'
import TicketsList from '../TicketsList/TicketsList'
import { getSearchId } from '../../store/asyncActions'

import styles from './App.module.scss'

export default function App() {
  const dispatch = useDispatch()
  const checkedList = useSelector((state) => state.checkedList)
  const checkAll = useSelector((state) => state.checkAll)

  useEffect(() => {
    dispatch(getSearchId())
  }, [])
  let classAlert
  if (checkedList.length == 0 && !checkAll) {
    classAlert = styles.wrapper__alert
  } else if (checkedList.length > 0 || checkAll) {
    classAlert = styles.wrapper__alert_none
  }
  return (
    <>
      <div className={styles.logo}></div>
      <div className={styles.wrapper}>
        <Filter />
        <div className={styles.wrapper__tickets}>
          <Sort />
          <Alert
            type="warning"
            message="Рейсов, подходящих под заданные фильтры, не найдено"
            showIcon="true"
            className={classAlert}
          />
          <TicketsList />
        </div>
      </div>
    </>
  )
}
