import { setSearchId, setTicketsList, setLoaded } from './actions'

export const getSearchId = () => {
  return function (dispatch) {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((body) => {
        dispatch(setSearchId(body))
      })
      .catch((err) => err)
  }
}

export const getTicketsList = (searchId) => {
  return function (dispatch) {
    fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      .then((res) => res.json())
      .then((body) => {
        body.tickets.map((item) => {
          let tickets = {
            price: item.price,
            airlines: item.carrier,
            segments: item.segments,
          }
          dispatch(setTicketsList(tickets))
        })
        dispatch(setLoaded(true))
      })
      .catch((err) => err)
  }
}
