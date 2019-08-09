import {connect} from 'react-redux'
import objectPath from 'object-path'
import {
  addCompany,
  getCompany,
  getShareholders,
  addShareholder,
  editShareholder,
  deleteShareholder,
  getShares,
  addShare,
  editShare,
  deleteShare
} from './actions'

// picks status state for @path
export const connectStatus = path => connect(state => ({
  status: objectPath.get(state, path)?.status
}))

export const connectCompany = connect(
  // picks the company state
  state => ({company: objectPath.get(state, 'company')}),
  // creates a dispatch prop for fetching the company by ID
  dispatch => ({
    getCompany: id => dispatch(getCompany(id)),
    addCompany: data => dispatch(addCompany(data))
  })
)

export const connectShareholders = connect(
  // picks the company state
  state => ({shareholders: objectPath.get(state, 'shareholders')}),
  // creates a dispatch prop for fetching the company by ID
  dispatch => ({
    getShareholders: id => dispatch(getShareholders(id)),
    addShareholder: data => dispatch(addShareholder(data)),
    editShareholder: data => dispatch(editShareholder(data)),
    deleteShareholder: data => dispatch(deleteShareholder(data)),
  })
)

export const connectShares = connect(
  // picks the company state
  state => ({shares: objectPath.get(state, 'shares')}),
  // creates a dispatch prop for fetching the company by ID
  dispatch => ({
    getShares: id => dispatch(getShares(id)),
    addShare: data => dispatch(addShare(data)),
    editShare: data => dispatch(editShare(data)),
    deleteShare: data => dispatch(deleteShare(data)),
  })
)