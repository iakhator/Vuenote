import moment from 'moment'

export default (value) => {
  if (value) {
    return moment(String(value)).startOf('min').fromNow()
  }
}
