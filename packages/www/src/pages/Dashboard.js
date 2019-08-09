import React, {useState, useEffect} from 'react'
import {compose} from 'redux'
import {Helmet} from 'react-helmet-async'
import {Switch, Route} from 'react-router-dom'
import useToggle from '@react-hook/toggle'
import {Spinner, Icon} from '@jaredlunde/curls-addons'
import {Box, Text, Button, Link, Grid, GridItem} from 'curls'
import {Input} from '@stellar-apps/forms'
import {Formik} from 'formik'
import {VictoryPie, VictoryTooltip} from 'victory'
import * as yup from 'yup'
import * as theme from '../theme'
import {Hero, InputError, StatusButton} from '../components'
import * as urls from '../urls'
import {
  connectCompany,
  connectShareholders,
  connectShares,
  connectAggregateShares,
} from '../state/containers'
import {Api} from '../state'
import {formatDate, foreign, formatCurrency, formatNumber, pct} from '../utils'


const maybeDisplaySpinner = status => status === Api.LOADING && <Spinner/>
const pieStyle = {
  labels: {
    fill: theme.colors.primaryText,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: theme.text.families.brand,
  },
}

const OwnershipPie = props => <VictoryPie
  colorScale='cool'
  innerRadius={96}
  style={pieStyle}
  labelComponent={<VictoryTooltip/>}
  {...props}
/>

const PieGroup = ({component = OwnershipPie, title, data}) => (
  <Box flluid>
    <Text center kind='subheading' p='x4'>
      {title}
    </Text>
    {React.createElement(component, {data})}
  </Box>
)

const Overview = compose(
  connectCompany,
  connectShares,
  connectShareholders,
  connectAggregateShares,
)(
  ({company, shareholders, shares, aggregateShares, getShares, getShareholders}) => {
    const [isByRole, toggleByRole] = useToggle()

    useEffect(
      () => {
        if (!shareholders.status) getShareholders(company.id)
        if (!shares.status) getShares(company.id)
      },
      [shareholders.status, shares.status],
    )

    return (
      <Box>
        <Text kind='heading'>
          {company.name}
        </Text>
        <Text kind='subheading' m='b4'>
          Overview
        </Text>

        {shareholders.status !== Api.DONE || shares.status !== Api.DONE && <Spinner/>}

        {!aggregateShares
          ? <EmptyOverview/>
          : <Box
            kind='table'
            as='div'
            flex
            row='@desktop'
            column='@phone'
            p='y4'
            m='b4'
            align='center@phone start@desktop'
            justify='center@phone start@desktop'
            ov='xAuto'
            children={
              <>
                <PieGroup
                  title='Equity share'
                  data={aggregateShares.owners.map(owner => ({
                    x: `${owner.firstName} ${owner.lastName} `
                      + pct(owner.shares, aggregateShares.totalIssued),
                    y: owner.pct,
                  }))}
                />

                <Box>
                  <Box as='table' m='b3'>
                    <thead>
                    <Box kind='tableRow'>
                      <Text kind='tableHeading'>
                        Name
                      </Text>
                      <Text kind='tableHeading'>
                        Shares
                      </Text>
                      <Text kind='tableHeading'>
                        Contribution
                      </Text>
                    </Box>
                    </thead>
                    <tbody>
                      {aggregateShares.owners.map(owner => (
                        <Box kind='tableRow' key={owner.id}>
                          <Text kind='tableCell'>
                            {owner.firstName} {owner.lastName}
                          </Text>
                          <Text kind='tableCell'>
                            {formatNumber(owner.shares)}
                          </Text>
                          <Text kind='tableCell'>
                            {formatCurrency(owner.contribution)}
                          </Text>
                          <Text bold kind='tableCell'>
                            {pct(owner.shares, aggregateShares.totalIssued)}
                          </Text>
                        </Box>
                      ))}
                    </tbody>
                  </Box>

                  <Box flex justify='center@phone start@desktop'>
                    <Text bold center='@phone' left='@desktop' size='md' m='r3 l4@desktop l3@phone'>
                      Total issued
                      <Text light d='block'>
                        {formatNumber(aggregateShares.totalIssued)}
                      </Text>
                    </Text>
                    <Text bold center='@phone' left='@desktop' size='md' m='l3 r4@desktop r3@phone'>
                      Total authorized
                      <Text light d='block'>
                        {formatNumber(aggregateShares.totalAuthorized)}
                      </Text>
                    </Text>
                  </Box>
                </Box>
              </>
            }/>}

        {!!aggregateShares && <Box
            kind='table'
            as='div'
            flex
            row='@desktop'
            column='@phone'
            p='y4'
            align='center@phone start@desktop'
            justify='center@phone start@desktop'
            ov='xAuto'
            children={
              <>
                <PieGroup
                  title='Equity share by role'
                  data={aggregateShares.ownersByRole.map(owner => ({
                    x: `${owner.role} ${pct(owner.shares, aggregateShares.totalIssued)}`,
                    y: owner.pct,
                  }))}
                />
                <Box>
                  <Box as='table' m='b3'>
                    <thead>
                    <Box kind='tableRow'>
                      <Text kind='tableHeading'>
                        Role
                      </Text>
                      <Text kind='tableHeading'>
                        Shares
                      </Text>
                      <Text kind='tableHeading'>
                        Contribution
                      </Text>
                    </Box>
                    </thead>
                    <tbody>
                      {aggregateShares.ownersByRole.map(owner => (
                        <Box kind='tableRow' key={owner.role}>
                          <Text kind='tableCell'>
                            {owner.role}
                          </Text>
                          <Text kind='tableCell'>
                            {formatNumber(owner.shares)}
                          </Text>
                          <Text kind='tableCell'>
                            {formatCurrency(owner.contribution)}
                          </Text>
                          <Text bold kind='tableCell'>
                            {pct(owner.shares, aggregateShares.totalIssued)}
                          </Text>
                        </Box>
                      ))}
                    </tbody>
                  </Box>
                </Box>
              </>
            }/>}
      </Box>
    )
  },
)

const Empty = props => (
  <Box kind='tableRow'>
    <Text kind='tableCell' center colSpan={props.colSpan} p='y5'>
      <Box as='span' flex column align='center'>
        <Icon name='hero' size='196' m='b3'/>
        <b>
          {props.children}
        </b>
      </Box>
    </Text>
  </Box>
)

const EmptyShareholders = props => <Empty colSpan={4}>You haven't added any shareholders
  yet</Empty>
const EmptyShares = props => <Empty colSpan={5}>You haven't granted any shares yet</Empty>
const EmptyOverview = connectCompany(props => (
  <Text flex center p='y5@phone y6@desktop' w='100%' justify='center'>
    <Box as='span' flex column align='center' maxW='320'>
      <Icon name='hero' size='196' m='b3'/>
      <b>
        You don't have any equity information yet. Add {' '}
        <Link to={urls.shareholders(props.company.id)}>shareholders</Link> and {' '}
        <Link to={urls.shares(props.company.id)}>shares</Link>{' '}
        to display information here.
      </b>
    </Box>
  </Text>
))

// This is the form validation schema for Shareholders
const ShareholderSchema = yup.object().shape({
  firstName: yup.string()
    .trim()
    .min(1, 'Required')
    .required('Required'),
  lastName: yup.string()
    .trim(),
  company: yup.number()
    .required('Required'),
  type: yup.string()
    .oneOf(['individual', 'organization'])
    .trim()
    .required('Required'),
  role: yup.string()
    .oneOf(['founder', 'investor', 'employee'])
    .required('Required'),
})

const ShareholderForm = connectShareholders(
  ({
    editExisting,
    initialValues,
    addShareholder,
    editShareholder,
    deleteShareholder,
    onDone,
  }) => (
    <Formik
      initialValues={initialValues}
      validationSchema={ShareholderSchema}
      onSubmit={values => {
        (
          editExisting ? editShareholder : addShareholder
        )(values).then(onDone)
      }}
      render={formik => (
        <Box kind='form' m='b5@tablet b4@phone' onSubmit={formik.handleSubmit}>
          <Text kind='label' m='b3'>
            First name
            <Input name='firstName' placeholder='John' renderError={InputError}
                   autoFocus/>
          </Text>

          <Text kind='label' m='b3'>
            Last name
            <Input name='lastName' placeholder='Smith' renderError={InputError}/>
          </Text>

          <Text kind='label' m='b3' flex align='center'>
            Type
            <Text
              as='select'
              size='md'
              grow
              m='l3'
              name='type'
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="individual" label="Individual"/>
              <option value="organization" label="Organization"/>
            </Text>
          </Text>

          <Text kind='label' m='b3' flex align='center'>
            Role

            <Text
              as='select'
              size='md'
              grow
              m='l3'
              name='role'
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="founder" label="Founder"/>
              <option value="investor" label="Investor"/>
              <option value="employee" label="Employee"/>
            </Text>
          </Text>

          <Box kind='row' justify='between'>
            <StatusButton connect='shareholder'>
              {editExisting ? 'Save' : 'Add +'}
            </StatusButton>

            {editExisting && (
              <StatusButton
                connect='shareholder'
                kind=''
                type='button'
                onClick={() => {
                  deleteShareholder(initialValues.id)
                  onDone()
                }}
              >
                Delete
              </StatusButton>
            )}
          </Box>
        </Box>
      )}
    />
  ),
)

const Shareholders = compose(connectCompany, connectShareholders)(
  ({company, shareholders, addShareholder, getShareholders}) => {
    const [isAddView, toggleAddView] = useToggle()
    const [isEditView, toggleEditView] = useToggle()
    const [editing, setEditing] = useState(null)

    useEffect(
      () => {
        if (!shareholders.status) getShareholders(company.id)
      },
      [shareholders.status],
    )

    return (
      <Box>
        <Box flex justify='between' align='center' m='b4'>
          <Box grow>
            <Text kind='heading'>
              {company.name}
            </Text>
            <Text kind='subheading'>
              Shareholders
            </Text>
          </Box>
          <Box>
            <Button kind='tableAction' onClick={toggleAddView}>
              {isAddView ? 'Cancel' : 'Add+'}
            </Button>
          </Box>
        </Box>

        {maybeDisplaySpinner(shareholders.status)}

        {isAddView && <ShareholderForm
          initialValues={{
            firstName: '',
            lastName: '',
            company: company.id,
            type: 'individual',
            role: 'founder',
          }}
          onDone={toggleAddView}
        />}

        {isEditView && <ShareholderForm
          editExisting
          initialValues={{
            id: editing.id,
            firstName: editing.firstName,
            lastName: editing.lastName,
            company: company.id,
            type: editing.type,
            role: editing.role,
          }}
          onDone={toggleEditView}
        />}

        {!isAddView && !isEditView && (
          <Box kind='table'>
            <thead>
            <Box kind='tableRow'>
              <Text kind='tableHeading'>
                Name
              </Text>
              <Text kind='tableHeading'>
                Type
              </Text>
              <Text kind='tableHeading'>
                Role
              </Text>
              <Text kind='tableHeading'>
                Created at
              </Text>
            </Box>
            </thead>
            <tbody>
            {shareholders.status !== Api.DONE || (
              shareholders.members || []
            ).length === 0
              ? <EmptyShareholders/>
              : shareholders.members.map(member => (
                <Box kind='tableRow' key={member.id}>
                  <Text kind='tableCell'>
                    <Text
                      onClick={() => {
                        toggleEditView()
                        setEditing(member)
                      }}
                      role='button'
                      m='r1'
                    >
                      <Icon name='pencil' size='16'/>
                    </Text>
                    {member.firstName} {member.lastName}
                  </Text>
                  <Text kind='tableCell'>
                    {member.type}
                  </Text>
                  <Text kind='tableCell'>
                    {member.role}
                  </Text>
                  <Text kind='tableCell'>
                    {formatDate(member.createdAt)}
                  </Text>
                </Box>
              ))}
            </tbody>
          </Box>
        )}
      </Box>
    )
  },
)

// This is the form validation schema for Shareholders
const ShareSchema = yup.object().shape({
  company: yup.number()
    .required('Required'),
  shareholder: yup.number()
    .required('Required'),
  price: yup.number()
    .min(0)
    .required('Required'),
  count: yup.number()
    .min(1)
    .required('Required'),
})

const ShareForm = compose(connectShareholders, connectShares)(
  ({
    shareholders,
    editExisting,
    initialValues,
    addShare,
    editShare,
    deleteShare,
    onDone,
  }) => (
    <Formik
      initialValues={initialValues}
      validationSchema={ShareSchema}
      onSubmit={values => {
        (
          editExisting ? editShare : addShare
        )(values).then(onDone)
      }}
      render={formik => (
        <Box kind='form' m='b5@tablet b4@phone' onSubmit={formik.handleSubmit}>
          <Text kind='label' m='b3'>
            Shareholder
            <Text
              as='select'
              size='md'
              grow
              m='l3'
              name='shareholder'
              value={formik.values.shareholder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option label=''/>
              {shareholders.members.map(member => (
                <option
                  key={member.id}
                  value={member.id}
                  label={`${member.firstName} ${member.lastName}`}
                />
              ))}
            </Text>
          </Text>

          <Text kind='label' m='b3'>
            Price
            <Input name='price' type='number' step='0.001' min='0' renderError={InputError}/>
          </Text>

          <Text kind='label' m='b3'>
            Count
            <Input name='count' type='number' step='1' min='0' renderError={InputError}/>
          </Text>

          <Box kind='row' justify='between'>
            <StatusButton connect='share'>
              {editExisting ? 'Save' : 'Add +'}
            </StatusButton>

            {editExisting && (
              <StatusButton
                connect='share'
                kind=''
                type='button'
                onClick={() => {
                  deleteShare(initialValues.id)
                  onDone()
                }}
              >
                Delete
              </StatusButton>
            )}
          </Box>
        </Box>
      )}
    />
  ),
)

const Shares = compose(connectCompany, connectShares, connectShareholders)(
  ({company, shareholders, getShareholders, shares, getShares}) => {
    const [isAddView, toggleAddView] = useToggle()
    const [isEditView, toggleEditView] = useToggle()
    const [editing, setEditing] = useState(null)

    useEffect(
      () => {
        if (!shareholders.status) getShareholders(company.id)
        if (!shares.status) getShares(company.id)
      },
      [shareholders.status, shares.status],
    )

    return (
      <Box>
        <Box flex justify='between' align='center' m='b4'>
          <Box grow>
            <Text kind='heading'>
              {company.name}
            </Text>
            <Text kind='subheading'>
              Shares
            </Text>
          </Box>
          <Box>
            <Button kind='tableAction' onClick={toggleAddView}>
              Grant +
            </Button>
          </Box>
        </Box>

        {maybeDisplaySpinner(shareholders.status)}

        {isAddView && <ShareForm
          initialValues={{shareholder: void 0, company: company.id, price: 0, count: 0}}
          onDone={toggleAddView}
        />}

        {isEditView && <ShareForm
          editExisting
          initialValues={{
            id: editing.id,
            company: company.id,
            shareholder: editing.shareholder,
            price: editing.price,
            count: editing.count,
          }}
          onDone={toggleEditView}
        />}

        {!isAddView && !isEditView && (
          <Box kind='table'>
            <thead>
            <Box kind='tableRow'>
              <Text kind='tableHeading'>
                Shareholder
              </Text>
              <Text kind='tableHeading'>
                Price
              </Text>
              <Text kind='tableHeading'>
                Count
              </Text>
              <Text kind='tableHeading'>
                Contribution
              </Text>
              <Text kind='tableHeading'>
                Issued
              </Text>
            </Box>
            </thead>
            <tbody>
            {shares.status !== Api.DONE || shareholders.status !== Api.DONE || (
              shares.members || []
            ).length === 0
              ? <EmptyShares/>
              : shares.members.map(member => (
                <Box kind='tableRow' key={member.id}>
                  <Text kind='tableCell'>
                    <Text
                      onClick={() => {
                        toggleEditView()
                        setEditing(member)
                      }}
                      role='button'
                      m='r1'
                    >
                      <Icon name='pencil' size='16'/>
                    </Text>

                    {foreign(shareholders.members, member.shareholder).firstName}{' '}
                    {foreign(shareholders.members, member.shareholder).lastName}
                  </Text>
                  <Text kind='tableCell'>
                    {member.price}
                  </Text>
                  <Text kind='tableCell'>
                    {formatNumber(member.count)}
                  </Text>
                  <Text kind='tableCell'>
                    {formatCurrency(member.count * member.price)}
                  </Text>
                  <Text kind='tableCell'>
                    {formatDate(member.createdAt)}
                  </Text>
                </Box>
              ))}
            </tbody>
          </Box>
        )}
      </Box>
    )
  },
)

export const Sidebar = connectCompany(({company}) => (
  <Box as='ul' flex column bg='primary' w='100%' h='100%' p='y3' bw='b1' bc='translucentLight'>
    <Box as='li'>
      <Link kind='sidebar' to={urls.dashboard(company.id)}>
        Overview
      </Link>
    </Box>
    <Box as='li'>
      <Link kind='sidebar' to={urls.shareholders(company.id)}>
        Shareholders
      </Link>
    </Box>
    <Box as='li'>
      <Link kind='sidebar' to={urls.shares(company.id)}>
        Shares
      </Link>
    </Box>
  </Box>
))

const Dashboard = connectCompany(({company, getCompany, match: {params: {id, pageType}}}) => {
  useEffect(
    () => {
      if (!company.status) {
        getCompany(id)
      }
    },
    [company.status, id],
  )

  return (
    <Hero minW='100%' p='0'>
      <Helmet>
        <title>{company?.name || 'Dashboard'} // Divvy</title>
      </Helmet>

      <Grid
        w='100%'
        h='100%'
        cols={`
          minmax(0,1fr)@phone 
          [212px minmax(0,1fr)]@tablet
        `}
        areas={`
          ["content"]@phone 
          ["sidebar content"]@tablet
        `}
      >
        <GridItem area='sidebar' d='none@phone flex@tablet'>
          <Sidebar/>
        </GridItem>

        <GridItem area='content' bw='t1' bc='primary' p='4@phone 5@desktop'>
          {company?.status !== Api.DONE
            ? <Hero align='center' justify='center'><Spinner size='32'/></Hero>
            : (
              <Switch>
                <Route path={urls.dashboard(id)} exact component={Overview}/>
                <Route path={urls.shareholders(id)} exact component={Shareholders}/>
                <Route path={urls.shares(id)} exact component={Shares}/>
              </Switch>
            )}
        </GridItem>
      </Grid>
    </Hero>
  )
})

/*
 <Box w='300' h='300' css={css`margin: auto;`}>
 <VictoryPie
 innerRadius={128}
 data={[
 { x: "Cats", y: 35 },
 { x: "Dogs", y: 40 },
 { x: "Birds", y: 55 }
 ]}
 style={{ labels: { fill: theme.colors.primaryText, fontSize: 20, fontWeight: "bold", fontFamily: theme.text.families.brand}}}
 />
 </Box>
 */

export default Dashboard
