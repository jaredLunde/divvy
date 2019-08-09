import React from 'react'
import {Box} from 'curls'
import {Content} from '@stellar-apps/content'


export default ({children, ...props}) => (
  <Box flex w='100%' minH='calc(100vh - 60px)' pos='relative'>
    <Content
      as='section'
      flex
      grow
      justify='start@desktop center@phone'
      align='end'
      p='[b6 x4]@tablet [b5 x3]@phone'
      {...props}
    >
      {children}
    </Content>
  </Box>
)