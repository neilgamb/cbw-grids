import axios from 'axios'

const url = 'events/'

class EventService {
  static getEvents() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(event => ({
            ...event,
            createdAt: new Date(event.createdAt)
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  static insertEvent(text) {
    return axios.post(url, { text })
  }

  static deleteEvent(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default EventService
