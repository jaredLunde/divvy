import React from 'react'
import {Button} from 'curls'
import {Spinner} from '@jaredlunde/curls-addons'
import memoize from 'trie-memoize'
import {connectStatus} from '../state/containers'
import {Api} from '../state'
import * as theme from '../theme'


const getConnectedButton = memoize(
  [Map],
  (connect) => connectStatus(connect)(({status, dispatch, children, ...props}) => (
    <Button kind='solid' type='submit' {...props}>
      {status === Api.LOADING ? <Spinner size={theme.text.scale.sm * 16}/> : children}
    </Button>
  ))
)
export default ({connect, ...props}) => React.createElement(getConnectedButton(connect), props)