import {store} from '../../index'
import api from '../../../api'
import {reorderArray} from '../../../utility/Utils'

export default class Actions {

  static async find(params){
    let response = await api.get("pages.json", params)
    if (response.ok) {
      store.dispatch({
        type: "PAGES_INDEX",
        payload: await response.json()
      })
    }
  }
  static async details(id){
    let response = await api.get(`pages/${id}.json`)
    if (response.ok) {
      store.dispatch({
        type: "PAGES_DETAILS",
        payload: await response.json()
      })
    }
  }
  static async clear(id){
      store.dispatch({
        type: "PAGES_DETAILS",
        payload: {}
      })
  }
  static async reorder(params){
    
    store.dispatch({
      type: "PAGES_INDEX",
      payload: reorderArray(params.array, params.order, params.index)
    })
  }
  static async reorder_server(params){
    
    let response = await api.post("pages/reorder.json", params)
    if (response.ok) {
      return 'ok'
    }
  }
  static async create(data){
    let response = await api.post("pages.json", data)
    if (response.ok) {
      Actions.find({lesson: data.lesson})
    }
    return response
  }
  static async edit(data){
    let response = await api.patch(`pages/${data.id}.json`, data)
    if (response.ok) {
      if (data.lesson){
        Actions.find({lesson: data.lesson})
      }
    }
    return response
  }
  static async delete(data){
    let response = await api.delete(`pages/${data.id}.json`, data)
    if (response.ok) {
      Actions.find({lesson: data.lesson})
    }
    return response
  }
}