export class Http {
  static HEADERS = { 'Content-Type': 'application/json' }

  static async get(url) {
    try {
      return await request(url, 'GET')
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  static async post1(url, posts = {}) {
    try {
      return await request(url, 'POST', posts)
    } catch (e) {
      console.log(e)
    }
  }

  static async delete(url) {
    try {
      return await request(url, 'DELETE')
    } catch (e) {
      console.log(e)
    }
  }

  static async patch(url, posts = {}) {
    try {
      return await request(url, 'PATCH', posts)
    } catch (e) {
      console.log(e)
    }
  }
}

async function request(url, method = 'GET', posts) {
  const config = {
    method,
    headers: Http.HEADERS
  }

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(posts)
  }

  const response = await fetch(url, config)
  return await response.json()
}
