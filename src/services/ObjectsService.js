
class Service {

    rawString(o) {
        console.log(o)
    }

    formatedArray(o, s = [], level=0) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                console.log(key + ": " + o[key]+" - "+level)
                if (typeof o[key] === "object") {
                    s[key]=this.formatedString(o[key], [], level+1)
                } else {
                    s[key]=o[key]
                }
            }
        }
        return s
    }

    formatedString(o, s = {}, level=0) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                console.log(key + ": " + o[key]+" - "+level)
                if (typeof o[key] === "object") {
                    s[key]=this.formatedString(o[key], {}, level+1)
                } else {
                    s[key]=o[key]
                }
            }
        }
        return s
    }

}

export const ObjectsService = new Service()