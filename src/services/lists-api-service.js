import config from '../config'
import TokenService from './token-service'

const ListsApiService = {
    getLists(){
        return fetch(`${config.API_ENDPOINT}/lists`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )     
    },
    getUsersLists(){
     return fetch(`${config.API_ENDPOINT}/lists/user`, {
          method: 'GET',
          headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
          }
      })
      .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
      )     
  },
    getListsByCity(city_name){
      return fetch(`${config.API_ENDPOINT}/lists/${city_name}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )     
    },
    getSpotsById(id){
        return fetch(`${config.API_ENDPOINT}/lists/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )     
    },
    postLists(list) {
        return fetch(`${config.API_ENDPOINT}/lists`, {
            method: 'POST',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify(list),
        })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    deleteLists(id){
      console.log('api', id)
        return fetch(`${config.API_ENDPOINT}/lists/${id}`,{
            method: 'DELETE',
            headers: {
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : null
            )
    },
    updateLists(id){
        return fetch(`${config.API_ENDPOINT}/lists/${id}`,{
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
              id: id
            })
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : null
            )
    },

}

export default ListsApiService;