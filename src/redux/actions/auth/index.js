import api from '../../../api'
import {store} from '../../index'
import { GroupAction } from '../../actions';
export default class {

  static async register(data){
    const response = await api.post("admins.json", data);
    return response
  }

  static async login(data){
    const response = await api.post('auth/', data);
    data = await response.json();
    localStorage.setItem("auth", JSON.stringify(data))
    await GroupAction.find()
    store.dispatch({
      type: "LOGIN",
      payload: data
    })
  }

  static logout(){
    localStorage.removeItem("auth")
    store.dispatch({
      type: "LOGOUT"
    })
  }
}
