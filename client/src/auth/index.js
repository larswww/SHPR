const API_URL = 'http://localhost:5000/api/'
const LOGIN_URL = API_URL + 'user/login'
const SIGNUP_URL = API_URL + 'user/register'

export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then(data => {
      localStorage.setItem('id_token', data.body.id_token)

      this.user.authenticated = true

      if(redirect) {
        this.$router.go(redirect)
      }

    }).catch((err) => {
      debugger
      context.error = err
    })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if(redirect) {
        this.$router.go(redirect)
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}