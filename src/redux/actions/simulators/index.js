import {store} from '../../index'
import api from '../../../api'

export default class Actions {

  static async find(params){
    let response = await api.get("simulators.json", params)
    if (response.ok) {
      store.dispatch({
        type: "SIMULATORS_INDEX",
        payload: await response.json()
      })
    }
  }
  static async onboarding(id){
    let response = await api.get(`simulators/${id}/onboarding.json`)
    if (response.ok) {
      store.dispatch({
        type: "SIMULATORS_ONBOARDING",
        payload: await response.json()
      })
    }
  }
  
  static async details(id){
    let response = await api.get(`simulators/${id}.json`)
    if (response.ok) {
      store.dispatch({
        type: "SIMULATORS_DETAILS",
        payload: await response.json()
      })
    }
  }
  static async create(data){
    const formData = new FormData()
    for (let i in data){
      formData.append(i, data[i])
    }
    let response = await api.post("simulators.json", formData, undefined)
    if (response.ok) {
      Actions.find({group: data.group})
    }
    return response
  }

  static async delete(data){
    let response = await api.delete(`simulators/${data.id}.json`)
    if (response.ok) {
      Actions.find({group: data.group})
    }
    return response
  }

  static async edit(data){
    console.log(data)
    const formData = new FormData()
    for (let i in data){
      if (data[i] !== null && !['css', 'logo', 'favicon', 'picture', 'welcome_message_author_img'].includes(i)){
        formData.append(i, data[i])
      }
      if (['css', 'logo', 'favicon', 'picture', 'welcome_message_author_img'].includes(i) && typeof data[i] !== 'string' && data[i] !== null){
        formData.append(i, data[i])
      }
    }
    let response = await api.patch(`simulators/${data.id}.json`, formData)
    if (response.ok) {
      Actions.details(data.id)
    }
    return response
  }

}