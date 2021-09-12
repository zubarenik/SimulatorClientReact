import {store} from '../../index'
import api from '../../../api'

export default class Actions {

    static async find(){

        let response = await api.get("simulator_groups.json")
        if (response.ok) {
          store.dispatch({
            type: "SIMULATOR_GROUPS_INDEX",
            payload: await response.json()
          })
        }
    }


}