export const dateFormatter = date => {
  // yyyy-mm-dd
  const year = date.substr(0,4)
  const month = date.substr(5,2)
  const day = date.substr(8,2)

  return `${day}/${month}/${year}`
}