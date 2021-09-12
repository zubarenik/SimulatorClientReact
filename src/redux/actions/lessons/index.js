import {store} from '../../index'
import api from '../../../api'
import {reorderArray} from '../../../utility/Utils'

export default class Actions {

  static async find(params){
    let response = await api.get("lessons.json", params)
    if (response.ok) {
      store.dispatch({
        type: "LESSONS_INDEX",
        payload: await response.json()
      })
    }
  }
  static async reorder(params){
    
    store.dispatch({
      type: "LESSONS_INDEX",
      payload: reorderArray(params.array, params.order, params.index)
    })
  }
  static async reorder_server(params){
    
    let response = await api.post("lessons/reorder.json", params)
    if (response.ok) {
      return 'ok'
    }
  }
  static async create(data){
    const formData = new FormData()
    for (let i in data){
      formData.append(i, data[i])
    }
    let response = await api.post("lessons.json", formData)
    if (response.ok) {
      Actions.find({simulator: data.simulator})
    }
    return response
  }
  static async edit(data){
    if(data.newpicture)
    {
      data.picture = data.newpicture
      delete data['newpicture']
      const formData = new FormData()
      for (let i in data){
        formData.append(i, data[i])
      }
      let response = await api.patch(`lessons/${data.id}.json`, formData)
      if (response.ok) {
        Actions.find({simulator: data.simulator})
      }
      return response
    }
    else
    {
      delete data['picture']
      let response = await api.patch(`lessons/${data.id}.json`, data)
      if (response.ok) {
        Actions.find({simulator: data.simulator})
      }
      return response
    }
    
  }
  static async delete(data){
    let response = await api.delete(`lessons/${data.id}.json`, data)
    if (response.ok) {
      Actions.find({simulator: data.simulator})
    }
    return response
  }
}