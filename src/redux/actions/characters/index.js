import {store} from '../../index'
import api from '../../../api'
import {reorderArray} from '../../../utility/Utils'

export default class Actions {

  static async find(params){
    let response = await api.get("characters.json", params)
    if (response.ok) {
      store.dispatch({
        type: "CHARACTERS_INDEX",
        payload: await response.json()
      })
    }
  }
  static async create(data){
    const formData = new FormData()
    for (let i in data){
      formData.append(i, data[i])
    }
    let response = await api.post("characters.json", formData, undefined)
    if (response.ok) {
      Actions.find({simulator: data.simulator})
    }
    return response
  }
  static async edit(data){
    console.log(data)
    if(data.newAvatar)
    {
      data.avatar = data.newAvatar
      delete data['newAvatar']
      const formData = new FormData()
      for (let i in data){
        formData.append(i, data[i])
      }
      let response = await api.patch(`characters/${data.id}.json`, formData)
      if (response.ok) {
        Actions.find({simulator: data.simulator})
      }
      return response
    }
    else
    {
      delete data['picture']
      let response = await api.patch(`characters/${data.id}.json`, data)
      if (response.ok) {
        Actions.find({simulator: data.simulator})
      }
      return response
    }
  }
  static async delete(data){
    let response = await api.delete(`characters/${data.id}.json`, data)
    if (response.ok) {
      Actions.find({simulator: data.simulator})
    }
    return response
  }
}