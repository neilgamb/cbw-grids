import moment from 'moment'
import { dates } from './dates'

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export function dayOfWeek(date) {
  return daysOfWeek[date.getDay()]
}

export function monthOfYear(date) {
  return monthsOfYear[date.getMonth()].substring(0, 3).toUpperCase()
}

export function getFestDay(date) {
  const { festDays } = dates
  let day
  festDays.map((d) => {
    if (moment(date).isSame(d.date, 'day')) {
      day = d.day
    }
  })
  return day
}

export function autoComplete(input, venueUpdate) {
  const google = window.google

  if (!input) return

  const nolaBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(29.915024, -90.18238),
    new google.maps.LatLng(30.034468, -90.00031)
  )

  const options = {
    bounds: nolaBounds,
    strictBounds: true,
    types: ['establishment']
  }

  const dropdown = new google.maps.places.Autocomplete(input, options)

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace()
    venueUpdate(place)
  })
}
