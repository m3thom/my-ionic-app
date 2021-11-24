import superagent from 'superagent'
import prefix from 'superagent-prefix'

const agent = superagent.agent()

// ===== Create helper method for attaching Access Tokens =====
superagent.Request.prototype.authentication = function (accessToken) {
  if (accessToken) {
    return this.auth(accessToken, { type: 'bearer' })
  }
  else {
    return this
  }
}

// ===== Create helper method for setting locale =====
superagent.Request.prototype.locale = function (locale) {
  return this.query({ locale })
}

export default agent
  .use(prefix(process.env.REACT_APP_BASE_API))
  .on('error', error => console.warn(error))
