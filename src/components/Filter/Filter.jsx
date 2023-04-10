import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, Card } from 'antd'

import { setCheckedList } from '../../store/actions'
import { getTicketsList } from '../../store/asyncActions'

const CheckboxGroup = Checkbox.Group
const options = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки']
import styles from './Filter.module.scss'

export default function Filter() {
  const dispatch = useDispatch()
  const checkedList = useSelector((state) => state.checkedList)
  const indeterminate = useSelector((state) => state.indeterminate)
  const checkAll = useSelector((state) => state.checkAll)
  const searchId = useSelector((state) => state.searchId.searchId)
  const [isFirst, setStateFirst] = useState(true)
  const onChange = (list) => {
    dispatch(setCheckedList(list))
  }
  const onCheckAllChange = (e) => {
    dispatch(setCheckedList(e.target.checked ? options : []))
  }
  const onChooseFilter = () => {
    if (isFirst) {
      dispatch(getTicketsList(searchId))
      setStateFirst(false)
    }
  }
  return (
    <Card className={styles.filter} bodyStyle={{ padding: '0' }} onClick={onChooseFilter}>
      <span className={styles.filter__title}>Количество пересадок</span>
      <Checkbox
        className={styles['ant-checkbox-inner']}
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Все
      </Checkbox>
      <CheckboxGroup className={styles.vertical} options={options} value={checkedList} onChange={onChange} />
    </Card>
  )
}
