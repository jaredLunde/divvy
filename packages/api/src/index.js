import express from 'express'
import cookies from 'cookie-parser'
import http from 'serverless-http'
import * as yup from 'yup'
import * as middleware from '~/middleware'

// initializes express
const app = express()
// disables x-powered-by: express header for security reasons
app.disable('x-powered-by')
// applies standard middleware
app.use(
  // parses JSON bodies
  express.json(),
  // cookie parser enabler
  cookies(),
  // applies user-defined middleware
  ...Object.values(middleware).filter(mw => typeof mw === 'function')
)
// creates the default routes for the api
app.get('/ping/:pong', (req, res, next) => res.status(200).send(
  JSON.stringify({
    status: res.statusCode,
    data: req.params.pong
  })
))
// app.get('/csrf', (req, res, next) => res.status(200).json({data: '🤙'}))

//
// Mock DB
const DB = new Map([
  ['companies', new Map()],
  ['shareholders', new Map()],
  ['shares', new Map()]
])

//
// DB API
let id = 0
let add = (table, data, schema) => {
  data = schema.validateSync({...data, createdAt: Date.now(), id: id++})
  DB.get(table).set(data.id, data)
  return data
}
let edit = (table, data, schema) => {
  const current = get(table, data.id)
  const value = schema.validateSync({...current, ...data})
  DB.get(table).set(data.id, value)
  return value
}
let get = (table, id) => {
  const value = DB.get(table)?.get(Number(id))
  if (value === void 0)
    throw {message: `ID "${id}" not found in "${table}"`, status: 404}
  return value
}
let del = (table, id) => {
  const value = get(table, id)
  DB.get(table).delete(id)
  return value
}
let filter = (table, filters) => Array.from(DB.get(table).values()).filter(record => {
  for (let key in filters)
    if (filters.hasOwnProperty(key) && record[key] !== filters[key])
      return false
  return true
})

//
// Schemas
let companySchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  authorizedShares: yup.number().required(),
  createdAt: yup.number().required()
})
let shareholderSchema = yup.object().shape({
  id: yup.number().required(),
  company: yup.number().required(),
  firstName: yup.string().required(),
  lastName: yup.string(),
  type: yup.string().oneOf(['individual', 'organization']).required(),
  role: yup.string().oneOf(['founder', 'investor', 'employee']).required(),
  createdAt: yup.number().required()
})
let shareSchema = yup.object().shape({
  id: yup.number().required(),
  company: yup.number().required(),
  shareholder: yup.number().required(),
  price: yup.number().required(),
  count: yup.number().required(),
  createdAt: yup.number().required()
})

//
// API handler
app.post('/v1.0', async (req, res) => {
  try {
    const action = req.body
    let status = 200, data, error
    let company
    // just modelling this in a way familiar to the frontend
    switch (action.type.toLowerCase()) {
      //
      // Company
      case 'add_company':
        data = {company: add('companies', action.company, companySchema)}
        break

      case 'get_company':
        data = {company: get('companies', action.id)}
        break

      case 'edit_company':
        data = {
          company: edit('companies', action.company, companySchema)
        }
        break
      
      case 'delete_company':
        company = del('companies', action.id)
        data = {company}
        break

      case 'get_companies':
        data = {companies: filter('companies', action.filters)}
        break

      //
      // Shareholder
      case 'add_shareholder':
        get('companies', action.shareholder.company)
        data = {shareholder: add('shareholders', action.shareholder, shareholderSchema)}
        break

      case 'get_shareholder':
        data = {shareholder: get('shareholders', action.id)}
        break

      case 'edit_shareholder':
        data = {
          shareholder: edit('shareholders', action.shareholder, shareholderSchema)
        }
        break

      case 'delete_shareholder':
        data = {shareholder: del('shareholders', action.id)}
        for (let share of filter('shares', {shareholder: action.id}))
          del('shares', share.id)
        break

      case 'get_shareholders':
        data = {shareholders: filter('shareholders', action.filters)}
        break

      //
      // Share
      case 'add_share':
        get('shareholders', action.share.shareholder)
        data = {share: add('shares', action.share, shareSchema)}
        break

      case 'get_share':
        data = {share: get('shares', action.id)}
        break

      case 'edit_share':
        data = {share: edit('shares', action.share, shareSchema)}
        break

      case 'delete_share':
        data = {share: del('shares', action.id)}
        break

      case 'get_shares':
        data = {shares: filter('shares', action.filters)}
        break

      //
      // Unrecognized
      default:
        status = 400
        error = `Unrecognized action: "${action.type}"`
    }

    res.status(status).send(JSON.stringify({status, data, error}))
  }
  catch (error) {
    res.status(500).send(
      JSON.stringify({
        status: error.status || 500,
        error: error.message ? error.message : 'Internal server error'
      })
    )
  }
})
// wraps the app in a WSGI handler
const wsgi = http(app)
// exports the serverless function
export const main = function (event, context) {
  // keeps the lambda function warm
  if (event.source === 'serverless-plugin-lambda-warmup') {
    return
  }
  // provides the request to express via a WSGI higher order function
  return wsgi(event, context)
}
