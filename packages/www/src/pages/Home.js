import React from 'react'
import {Helmet} from 'react-helmet-async'
import {Box, Text} from 'curls'
import {Icon, TransitionDrop} from '@jaredlunde/curls-addons'
import {Hero, LinkButton, ArrowRight} from '../components'
import * as urls from '../urls'

const Home = props => (
  <>
    <Helmet>
      <title>Divvy // robust cap table management for startups</title>
    </Helmet>

    <Hero>
      <Box
        flex
        column='@phone'
        row='@desktop'
        w='100%'
        justify='between@desktop'
        align='center@phone end@desktop'
      >
        <Box flex column maxW='720' p='[t5 b4]@phone 0@desktop'>
          {/* Heading */}
          <TransitionDrop fromTop={-8} easing='swiftMove'>
            {({css}) => (
              <Text kind='hero' m='b4' css={css}>
                Keep that napkin<br/>
                off your cap table
              </Text>
            )}
          </TransitionDrop>

          {/* Subheading */}
          <TransitionDrop fromTop={-8} delay={240} easing='swiftMove'>
            {({css}) => (
              <Text kind='p' size='md@tablet sm@phone' center='@phone' left='@desktop' css={css}>
                When it comes to your startup's equity, don't settle for
                antiquated "back of the napkin" solutions. <b>At Divvy, your records scale
                with you.</b> We focus on accuracy and helping you plan your next round, so
                you can focus on what matters instead of a spreadsheet.
              </Text>
            )}
          </TransitionDrop>

          {/* CTA */}
          <TransitionDrop fromTop={-8} delay={320} easing='swiftMove'>
            {({css}) => (
              <Box flex justify='center@phone start@desktop' css={css}>
                <LinkButton kind='solid' size='md' to={urls.start()}>
                  Create a table <ArrowRight/>
                </LinkButton>
              </Box>
            )}
          </TransitionDrop>
        </Box>

        {/* Table illustration */}
        <Icon name='hero' size='300@phone 360@tablet 420@desktop' m='t4@phone 0@desktop'/>
      </Box>
    </Hero>
  </>
)

export default Home
