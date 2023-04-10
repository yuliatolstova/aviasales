const initialState = {
  checkedList: [],
  indeterminate: true,
  checkAll: false,
  sortedButton: 'cheapest',
  ticketsList: [],
  searchId: '',
  loaded: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CHECKED_LIST':
      return {
        ...state,
        checkedList: action.payload,
        indeterminate: !!action.payload.length && action.payload.length < 4,
        checkAll: action.payload.length === 4,
      }
    case 'SET_SORT_BUTTON':
      return {
        ...state,
        sortedButton: action.payload,
      }
    case 'SET_TICKETS_LIST':
      return {
        ...state,
        ticketsList: [...state.ticketsList, action.payload],
      }
    case 'SET_SEARCH_ID':
      return {
        ...state,
        searchId: action.payload,
      }
    case 'SET_LOADED':
      return {
        ...state,
        loaded: action.payload,
      }
    default:
      return state
  }
}
