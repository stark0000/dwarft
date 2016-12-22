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
    console.log(name)
      const options = {
          method: 'POST',
          body: JSON.stringify({ name })
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