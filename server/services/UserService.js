import axios from 'axios'

const url = 'users/'

class UserService {
  static getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(user => ({
            ...user,
            createdAt: new Date(user.createdAt)
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  static insertUser(text) {
    return axios.post(url, { text })
  }

  static deleteUser(id) {
    return axios.delete(`${url}${id}`)
  }

  static updateUser(id, text) {
    return axios.put(`${url}${id}`, { text })
  }
}

export default UserService
