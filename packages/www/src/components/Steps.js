import React from 'react'
import {Box, Text} from 'curls'
import {range} from '../utils'


export default ({current, count, set}) => (
  <Box flex>
    {range(count).map(step => {
      step = step + 1
      const active = step === current
      return (
        <Text
          key={step}
          flex
          bold
          w='36'
          h='36'
          br='5'
          color={step < current ? 'primary' : active ? 'white' : 'primaryText'}
          bg={active ? 'primary' : 'transparent'}
          align='center'
          justify='center'
          role='button'
          onClick={() => set(step)}
        >
          {step}
        </Text>
      )
    })}
  </Box>
)