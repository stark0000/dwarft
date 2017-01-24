import { HttpService } from './HttpService'

const url = 'http://localhost:3001/universes'
class Service {

  getUniverses() {
    return HttpService.fetch(url)
  }

  getUniverse(id) {
    return HttpService.fetch(`${url}/${id}`)
  }

  postUniverse(name) {
    var o = {"name":name, "id":name, "children":[]}
    var b = JSON.stringify(o)
    console.log(name)
      const options = {
          method: 'POST',
          body: b
      }
      return HttpService.fetch(url, options)
  }

  deleteUniverse(id) {
      const options = {
          method: 'DELETE',
      }
      return HttpService.fetch(`${url}/${id}`, options)
  }

}

export const UniverseService = new Service()