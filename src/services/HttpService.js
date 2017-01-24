class Service {

  fetch(url, options = {}) {
    const surchargedOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json'
      },
    }
    return fetch(url, surchargedOptions)
      .then(function (response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
  }

  
}

export const HttpService = new Service()