import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet-async'
import useReactRouter from 'use-react-router'
import {TransitionDrop} from '@jaredlunde/curls-addons'
import {Input} from '@stellar-apps/forms'
import {Box, Text} from 'curls'
import {Formik} from 'formik'
import * as yup from 'yup'
import {Hero, Steps, StatusButton, InputError, Error, ArrowRight} from '../components'
import * as urls from '../urls'
import {connectCompany} from '../state/containers'


// This is the form validation schema
const OnboardingSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .min(1, 'Required')
    .max(600, 'Company name is too long')
    .required('Required'),
  authorizedShares: yup.number()
    .min(1, 'You must issue at least 1 share')
    .required('Required'),
})

// Connects onboarding to company in state because we'll want to
// skip to the dashboard any time there is an active company with
// a 'done' status
const Onboarding = connectCompany(({company, addCompany}) => {
  const
    steps = 2,
    [step, setStep] = useState(1),
    {history} = useReactRouter(),
    {id, status, error} = company

  // Redirects to the dashboard after the company has been created
  useEffect(() => {status === 'done' && history.replace(urls.shareholders(id))}, [status])

  return (
    <>
      <Helmet>
        <title>Create a Cap Table // Divvy</title>
      </Helmet>

      <Hero>
        <Box
          flex
          column
          w='100%'
          justify='center'
          align='center'
          p='t5 b4'
        >
          <TransitionDrop fromTop={-8} easing='swiftMove'>
            {({css}) => (
              <Text kind='hero' center='@phone @desktop' m='b5@tablet b4@phone' css={css}>
                Tell us about<br/>
                your company
              </Text>
            )}
          </TransitionDrop>

          {/* Displays any error messages */}
          <Error message={error} maxW='480'/>

          {/* This is the onboarding form */}
          <Formik
            initialValues={{name: '', authorizedShares: 50000000}}
            validationSchema={OnboardingSchema}
            onSubmit={(values, formik) => {
              if (step === steps)
                addCompany(values)
              else
                setStep(step + 1)
            }}
            render={props => (
              <Box kind='form' m='b5@tablet b4@phone' onSubmit={props.handleSubmit}>
                {/* These fields will be focused and displayed in steps */}
                <Text kind='label' m='b3' d={step !== 1 ? 'none' : 'block'}>
                  Company name
                  <Input
                    name='name'
                    placeholder='Acme Corp'
                    renderError={InputError}
                    autoFocus={step === 1}
                  />
                </Text>

                <Text kind='label' m='b3' d={step !== 2 ? 'none' : 'block'}>
                  Authorized shares
                  <Input
                    name='authorizedShares'
                    type='number'
                    autoFocus={step === 2}
                    renderError={InputError}
                  />
                </Text>

                <Box kind='row' justify='end'>
                  <StatusButton connect='company'>
                    {step === steps ? 'Create' : 'Next'} <ArrowRight/>
                  </StatusButton>
                </Box>
              </Box>
            )}
          />

          {/* Step counter/navigation */}
          <Steps current={step} count={steps} set={setStep}/>
        </Box>
      </Hero>
    </>
  )
})

export default Onboarding
