import { HttpService } from './HttpService'

const url = 'http://localhost:3001'
const parent = "/universes"
class Service {

  getObjects(id) {
    return HttpService.fetch(`${url}${parent}/${id}`)
  }

  parseGetChild(o, name) {
    var children = o.children
    for (var child in children) {
      if (children[child].name === name) return children[child]
    }
    //FOREACH
    /*
    children.forEach((child) => {
      if (child.name === name) {
        console.log("pgc: " + JSON.stringify(child))
        return child
      }
    })
    */
    return false
  }


  getObject(tree, o) {
    var obj = o;
    if (!tree) return o;
    var chain = tree.split("/")

    for (var i = 0; i < chain.length; i++) {
      if (!obj.children) return false
      var child = this.parseGetChild(obj, chain[i])
      if (!child) return false
      obj = child
      if (i === chain.length - 1) return obj
    }
  }

  patchObject(o, id) {
    var b = JSON.stringify(o)
    const options = {
      method: 'PUT',
      body: b
    }
    return HttpService.fetch(url + parent + "/" + id, options)
  }

  postObject(tree, o) {
    console.log(name)
    const options = {
      method: 'POST',
      body: JSON.stringify({ name })
    }
    return HttpService.fetch(url, options)
  }

  deleteObject(tree, id) {
    const options = {
      method: 'DELETE',
    }
    return HttpService.fetch(`${url}${tree}/${id}`, options)
  }

}

export const ObjectsService = new Service()