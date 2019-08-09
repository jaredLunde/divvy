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
import {foreign, pct} from '../utils'

// picks status state for @path
export const connectStatus = path => connect(state => ({
  status: objectPath.get(state, path)?.status
}))

export const connectCompany = connect(
  // picks the company state
  state => ({company: objectPath.get(state, 'company')}),
  dispatch => ({
    getCompany: id => dispatch(getCompany(id)),
    addCompany: data => dispatch(addCompany(data))
  })
)

export const connectShareholders = connect(
  // picks the shareholders state
  state => ({shareholders: objectPath.get(state, 'shareholders')}),
  dispatch => ({
    getShareholders: id => dispatch(getShareholders(id)),
    addShareholder: data => dispatch(addShareholder(data)),
    editShareholder: data => dispatch(editShareholder(data)),
    deleteShareholder: data => dispatch(deleteShareholder(data)),
  })
)

export const connectShares = connect(
  // picks the shares state
  state => ({shares: objectPath.get(state, 'shares')}),
  dispatch => ({
    getShares: id => dispatch(getShares(id)),
    addShare: data => dispatch(addShare(data)),
    editShare: data => dispatch(editShare(data)),
    deleteShare: data => dispatch(deleteShare(data)),
  })
)

export const connectAggregateShares = connect(
  state => {
    if (state.shares?.members && state.shareholders?.members) {
      const totalIssued = state.shares.members.reduce((p, c) => c.count + p, 0)
      // creates the aggregate share information
      let owners = {}
      let ownersByRole = {}
      state.shares.members.forEach(member => {
        const prev = owners[member.shareholder] || {shares: 0, contribution: 0}
        const shares = member.count + prev.shares
        const owner = foreign(state.shareholders.members, member.shareholder)
        owners[member.shareholder] = {
          ...owner,
          contribution: prev.contribution + (member.count * member.price),
          shares,
          pct: shares / totalIssued
        }
        const prevCat = ownersByRole[owner.role] || {shares: 0, contribution: 0}
        const catShares =  member.count + prevCat.shares
        ownersByRole[owner.role] = {
          role: owner.role,
          shares:catShares,
          contribution: prevCat.contribution + (member.count * member.price),
          pct: catShares / totalIssued
        }
      })
      // sorts the owners by most shares (high -> low)
      owners = Object.values(owners)
      owners.sort((a, b) => b.shares - a.shares)
      ownersByRole = Object.values(ownersByRole)
      ownersByRole.sort((a, b) => b.shares - a.shares)

      return {
        aggregateShares: {
          owners,
          ownersByRole,
          totalAuthorized: state.company.authorizedShares,
          totalIssued
        }
      }
    }

    return {}
  }
)