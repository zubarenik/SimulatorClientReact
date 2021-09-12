import {store} from '../../index'
import api from '../../../api'

export default class Actions {

  static async find(params){
    let response = await api.get("theory_chapters.json/?simulator="+params.simulator)
    if (response.ok) {
      store.dispatch({
        type: "CHAPTERS_INDEX",
        payload: await response.json()
      })
    }
  }
  static async create(data){
    let response = await api.post("theory_chapters.json", data)
    if (response.ok) {
      Actions.find({simulator: data.simulator})
    }
    return response
  }
  static async edit(data){
    let response = await api.patch(`theory_chapters/${data.id}.json`, data)
    if (response.ok) {
      Actions.find({simulator: data.simulator})
    }
    return response
  }
  static async delete(data){
    let response = await api.delete(`theory_chapters/${data.id}.json`, data)
    if (response.ok) {
      Actions.find({simulator: data.simulator})
    }
    return response
  }
}