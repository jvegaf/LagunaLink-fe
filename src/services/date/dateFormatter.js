/* eslint-disable prefer-const */
/* eslint-disable one-var */
export const dateFormatter = date => {
  // yyyy-mm-dd
  const year = date.substr(0, 4)
  const month = date.substr(5, 2)
  const day = date.substr(8, 2)

  return `${day}/${month}/${year}`
}

export const yearMonthFormatter = date => {
  // yyyy-mm
  const year = date.substr(0, 4)
  const month = date.substr(5, 2)

  return `${month}-${year}`
}

export function dateToISOString(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
