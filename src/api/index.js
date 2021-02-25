import axios from 'axios'

export default {
  auth: {
    me: () => axios.get('api/me'),
    login: (data) => axios.post('api/login', data),
  }
}
