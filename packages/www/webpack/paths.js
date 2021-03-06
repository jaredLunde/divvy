const path = require('path')
const root = path.resolve(path.basename(__filename), '../')
const join = (...p) => path.join(root, ...p)

module.exports = {
  root,
  join,
  src: join('src'),
  dist: join('dist'),
  modules: join('node_modules'),
  inherits: [
  ]
}
