import HttpRequest from ".";

const BASE_URL =
  process.env.NODE_ENV == 'development' ? 'http://php-template.test/api' : ''

const TIMEOUT = 2000
const HEADERS = {
  Authorization: localStorage.getItem('token') || '',
  'Content-Type': 'application/json;charset=UTF-8;',
  'X-Requested-With': 'XMLHttpRequest'
}

const http = new HttpRequest({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: HEADERS
})

export default http
