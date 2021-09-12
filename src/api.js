import { AuthAction } from './redux/actions'
import { toast } from 'react-toastify'

const queryString = require('query-string')
// const DEFAULT_URL = 'https://newapi.mysimulator.ru/api_admin'
const DEFAULT_URL = 'http://127.0.0.1:8000/api_admin'
class Api {

  get(path, params, signal) {
    path = params ? `${DEFAULT_URL}/${path}?${queryString.stringify(params, { arrayFormat: 'comma' })}` : `${DEFAULT_URL}/${path}`
    return this.handleResponse(
      fetch(path, {
        headers: this.headers()
      })
    )
  }

  request(path, body = {}, method, signal) {
    return this.handleResponse(this.fetch(path, body, method, signal))
  }

  fetch(path, body = {}, method, signal) {
    let headers = this.headers()
    if (body instanceof FormData){
      body = body
      delete headers["Content-Type"]
    }else{
      body = JSON.stringify(body)
    }
    return fetch(`${DEFAULT_URL}/${path}`, {
      method: method,
      headers: headers,
      body: body,
      signal: signal
    })
  }

  post(path, body, signal) {

    return this.request(path, body, "POST", signal)
  }

  put(path, body, signal) {
    return this.request(path, body, "PUT", signal)
  }

  patch(path, body, signal) {
    return this.request(path, body, "PATCH", signal)
  }

  delete(path, body, signal) {
    return this.request(path, body, "DELETE", signal)
  }

  headers() {
    let _headers = { "Content-Type": "application/json" }
    if (this.auth.token) _headers["Authorization"] = `Token ${this.auth.token}`
    return _headers
  }

  get auth() {
    if (localStorage.getItem("auth")) {
      return JSON.parse(localStorage.getItem("auth"))
    } else {
      return {}
    }
  }

  async handleResponse(request) {
    let response = await (request)

    if (response.status >= 500) {
      response.json = async () => ({})
      toast.error(`При обращении к серверу произошла ошибка, статус ${response.status}`, { toastId: response.status })
    }

    if (response.status === 401) {
      AuthAction.logout()
      toast.error(`Вам необходимо войти в систему`, { toastId: 'HTTP401' })
    }

    if (response.status === 400) {
      //сделать более детальный вывод ошибки при входе и регистрации
      toast.error(`При выполнении запроса возникли ошибки`)
    }

    if (response.status === 403) {
      let json = await response.json()
      response.json = async () => json
      if (json.alert || json.detail) toast.error(json.alert || json.detail)
    }

    if (response.status === 404) {
      response.json = async () => ({})
      toast.error(`Запрашиваемый с сервера ресурс не найден`)
    }

    if (response.status === 409) {
      let locales = {
        "Table": "Таблице",
        "Service": "Сервисе",
        "Task": "Задаче"
      }
      let json = await response.json()
      response.json = async () => json
      let description = `${locales[json[0].class_name]}[${json[0].pk}]`
      toast.error(`Не удалось удалить запись, т.к. она используется в ${description}`)
    }

    return response
  }

  websocket(path) {
    document.cookie = `token=${this.auth.token};max-age=${60 * 60 * 24};path=/;samesite=Strict`
    let protocol = window.location.protocol.startsWith("https") ? "wss" : "ws"
    return new WebSocket(`${protocol}://${window.location.host}/api/ws/${path}`)
  }


}


export default new Api()
