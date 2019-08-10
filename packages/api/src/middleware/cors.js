import cors from 'cors'


let whitelist = [
  'https://divvy.jaredlunde.com',
  'https://staging-divvy.jaredlunde.com'
]

export const config = {
  origin: (origin, callback) => {
    if (process.env.STAGE === 'development' || origin === void 0 || whitelist.indexOf(origin) !== -1)
      callback(null, true)
    else
      callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  maxAge: 604800,
  optionsSuccessStatus: 200,  // change this to 200 if one desires support for IE11
  credentials: true,
}

export default cors(config)
