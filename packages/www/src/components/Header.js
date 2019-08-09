import React from 'react'
import {Box, Text, Link, useTransitionable} from 'curls'
import {Route} from 'react-router-dom'
import useWindowScroll from '@react-hook/window-scroll'
import * as urls from '../urls'


const transitionProps = {
  property: 'background-color,box-shadow',
  easing: 'swiftMove',
  duration: 'slow'
}

const Header = () => {
  const scrollY = useWindowScroll(12),
    pastThreshold = scrollY > 3,
    {css: transition} = useTransitionable(transitionProps)

  return (
    <Box
      flex
      pos='sticky'
      align='center'
      justify='center'
      w='100%'
      h='64'
      bg={pastThreshold && 'white'}
      sh={pastThreshold && 16}
      z='1000'
      css={transition}
    >
      <Link to={urls.home()} flex align='center' bw='0' p='x4' size='md' h='100%'>
        <Text aria-hidden='true' m='r1'>◴</Text>
        divvy
      </Link>

      {/* This will only display on the home page */}
      <Route exact path={urls.home()} component={props => (
        <Box flex grow p='x4' h='100%' align='center' justify='end'>
          <Link to={urls.start()}>
            Get started
          </Link>
        </Box>
      )}/>
    </Box>
  )
}

export default Header