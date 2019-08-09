import React from 'react'
import {Box, Text} from 'curls'


export default ({message, ...props}) => !message ? null : (
  <Box kind='row' bc='red' bw='2' br='2' p='3' m='b4' justify='center' {...props}>
    <Text bold center color='red'>{message}</Text>
  </Box>
)