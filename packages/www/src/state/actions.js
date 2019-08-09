// Boilerplate for fetching from the API
const dispatchApi = (action, doneAction) => dispatch  => {
  dispatch(is.loading(action))

  return fetch(`${process.env.API_DOMAIN}/v1.0`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  }).then(
    response => response.json(),
    error => dispatch(is.error(action, error))
  ).then(
    json => {
      if (!json.error)
        dispatch(is.done(doneAction || action, json.data))
      else
        dispatch(is.error(action, json.error))
    }
  )
}

// API loading states
export const Api = {
  LOADING: 'loading',
  ERROR: 'error',
  DONE: 'done',
}
// API state shortcuts
// Ensures consistency in our actions when dealing w/ loading states
export const is = {
  loading: action => ({...action, status: Api.LOADING}),
  error: (action, error) => ({...action, error, status: Api.ERROR}),
  done: (action, data) => ({...action, ...data, status: Api.DONE}),
}

//
// Company actions
export const ADD_COMPANY = 'ADD_COMPANY'
export const GET_COMPANY = 'GET_COMPANY'
export const RECEIVE_COMPANY = 'RECEIVE_COMPANY'
export const addCompany = company => dispatchApi({type: ADD_COMPANY, company})
export const getCompany = id => dispatchApi({type: GET_COMPANY, id}, {type: RECEIVE_COMPANY})

//
// Shareholder
export const ADD_SHAREHOLDER = 'ADD_SHAREHOLDER'
export const EDIT_SHAREHOLDER = 'EDIT_SHAREHOLDER'
export const GET_SHAREHOLDERS = 'GET_SHAREHOLDERS'
export const DELETE_SHAREHOLDER = 'DELETE_SHAREHOLDER'
export const RECEIVE_SHAREHOLDERS = 'RECEIVE_SHAREHOLDERS'
export const addShareholder = shareholder => dispatchApi({type: ADD_SHAREHOLDER, shareholder})
export const editShareholder = shareholder => dispatchApi({type: EDIT_SHAREHOLDER, shareholder})
export const deleteShareholder = id => dispatchApi({type: DELETE_SHAREHOLDER, id})
export const getShareholders = company => dispatchApi(
  {type: GET_SHAREHOLDERS, filters: {company}},
  {type: RECEIVE_SHAREHOLDERS}
)

//
// Shares
export const ADD_SHARE = 'ADD_SHARE'
export const EDIT_SHARE = 'EDIT_SHARE'
export const GET_SHARES = 'GET_SHARES'
export const DELETE_SHARE = 'DELETE_SHARE'
export const RECEIVE_SHARES = 'RECEIVE_SHARES'
export const addShare = share => dispatchApi({type: ADD_SHARE, share})
export const editShare = share => dispatchApi({type: EDIT_SHARE, share})
export const deleteShare = id => dispatchApi({type: DELETE_SHARE, id})
export const getShares = company => dispatchApi(
  {type: GET_SHARES, filters: {company}},
  {type: RECEIVE_SHARES}
)

//