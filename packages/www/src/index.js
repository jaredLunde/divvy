import React from 'react'
import {Provider as BrokerProvider} from 'react-broker'
import {Helmet, HelmetProvider} from 'react-helmet-async'
import {Provider as ReduxProvider} from 'react-redux'
import {css, ThemeProvider, browserResets, prettyText} from 'curls'
import {Route, Switch} from 'react-router-dom'
import {store} from './state'
import * as theme from './theme'
import {Header, Footer} from './components'
import * as pages from './pages'


const globalStyles = [
  browserResets,
  prettyText,
  css`
    body {
      background: url(${require('./public/images/bg.png').src}) 0% 0% / 6px 6px repeat;
      color: ${theme.colors.primaryText};
      font-family: ${theme.text.families.brand};
      font-size: ${theme.text.scale.sm}rem;
    }
    
    a {
      font-weight: 700;
      color: ${theme.colors.primaryText};
      padding-bottom: 0.1em;
      border-bottom: 1px solid currentColor;
    }
    
    [role=button] {
      cursor: pointer;
      user-select: none;
    }
    
    @font-face {
      font-family: "Brand";
      font-style: normal;
      font-weight: 700;
      src: url(${require('./public/fonts/TTNorms-Bold.woff2')}) format("woff2"),
           url(${require('./public/fonts/TTNorms-Bold.woff')}) format("woff");
    }
    
    @font-face {
      font-family: "Brand";
      font-style: normal;
      font-weight: 300;
      src: url(${require('./public/fonts/TTNorms-Regular.woff2')}) format("woff2"),
           url(${require('./public/fonts/TTNorms-Regular.woff')}) format("woff");
    }
  `
]

const Document = ({location}) => (
  <>
    <Helmet>
      <html lang="en"/>
      <meta charset="utf-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black"
      />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=yes, initial-scale=1.0"
      />
      <meta name="theme-color" content={theme.colors.primary}/>
      {process.env.PUBLIC_PATH.startsWith('http') &&
      <link rel="dns-prefetch preconnect" href={process.env.PUBLIC_PATH} crossOrigin/>}
    </Helmet>

    <Header/>

    <main>
      <Switch location={location}>
        {Object.values(pages)}
      </Switch>
    </main>

    <Footer/>

    <div id='portals'/>
  </>
)

export default ({helmetContext = {}, chunkCache}) => (
  <HelmetProvider context={helmetContext}>
    <ThemeProvider theme={theme} globalStyles={globalStyles}>
      <BrokerProvider chunkCache={chunkCache}>
        <ReduxProvider store={store}>
          <Route children={({location}) => {
            if (typeof window !== 'undefined') window.scrollTo(0, 0)
            return <Document location={location}/>
          }}/>
        </ReduxProvider>
      </BrokerProvider>
    </ThemeProvider>
  </HelmetProvider>
)