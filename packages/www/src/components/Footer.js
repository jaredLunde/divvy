import React from 'react'
import {Box, Text, Link} from 'curls'
import {Route} from 'react-router-dom'
import * as urls from '../urls'


const Footer = props => (
  <Box flex w='100%' p='4' bg='primary' justify='end'>
    {/* This will only display on the home page */}
    <Route exact path={urls.home()} component={props => (
      <Box grow>
        <Link to={urls.start()} color='secondaryLink'>
          Really, get started!
        </Link>
      </Box>
    )}/>

    <Text bold color='secondaryText'>
      &copy; {(new Date()).getFullYear()} Divvy
    </Text>
  </Box>
)

export default Footer