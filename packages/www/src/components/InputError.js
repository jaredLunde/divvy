// Displayed when <Input> contains a validation error
import React from 'react'
import {Text} from 'curls'


export default error => (
  <Text d='block' w='100%' color='red' size='sm' m='t2' right>
    {error}
  </Text>
)
