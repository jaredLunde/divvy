import {combineReducers} from 'redux'
import * as actions from './actions'


const assignWithCreatedAt = data => ({
  ...data,
  createdAt: isNaN(data.createdAt) ? data.createdAt : new Date(data.createdAt)
})

export const company = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_COMPANY:
      return {...assignWithCreatedAt(action.company), status: action.status}

    case actions.GET_COMPANY:
      return {status: action.status}

    case actions.RECEIVE_COMPANY:
      return {...assignWithCreatedAt(action.company), status: action.status}

    default:
      return state
  }
}

export const shareholders = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_SHAREHOLDER:
      if (action.status === actions.Api.DONE)
        return {
           members: [...state.members, assignWithCreatedAt(action.shareholder)],
           status: action.status
        }
      return {...state, status: action.status}

    case actions.EDIT_SHAREHOLDER:
      if (action.status === actions.Api.DONE) {
        const members = [...state.members]
        for (let i = 0; i < members.length; i++) {
          const member = members[i]
          if (member.id === action.shareholder.id)
            members[i] = {...member, ...assignWithCreatedAt(action.shareholder)}
        }

        return {members, status: action.status}
      }

      return {...state, status: action.status}

    case actions.DELETE_SHAREHOLDER:
      if (action.status === actions.Api.DONE)
        return {
          members: state.members.filter(member => member.id !== action.id),
          status: action.status
        }
      return {...state, status: action.status}

    case actions.GET_SHAREHOLDERS:
      return {status: action.status}

    case actions.RECEIVE_SHAREHOLDERS:
      return {members: action.shareholders.map(assignWithCreatedAt), status: action.status}

    default:
      return state
  }
}

export const shares = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_SHARE:
      if (action.status === actions.Api.DONE)
        return {
          members: [...state.members, assignWithCreatedAt(action.share)],
          status: action.status
        }
      return {...state, status: action.status}

    case actions.EDIT_SHARE:
      if (action.status === actions.Api.DONE) {
        const members = [...state.members]
        for (let i = 0; i < members.length; i++) {
          const member = members[i]
          if (member.id === action.share.id)
            members[i] = {...member, ...assignWithCreatedAt(action.share)}
        }

        return {members, status: action.status}
      }

      return {...state, status: action.status}

    case actions.DELETE_SHARE:
      if (action.status === actions.Api.DONE)
        return {
          members: state.members.filter(member => member.id !== action.id),
          status: action.status
        }
      return {...state, status: action.status}

    case actions.GET_SHARES:
      return {status: action.status}

    case actions.RECEIVE_SHARES:
      return {members: action.shares.map(assignWithCreatedAt), status: action.status}

    default:
      return state
  }
}

export default combineReducers({company, shareholders, shares})