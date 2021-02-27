export function handleResponse (response) {
  return response
}

export function handleError (error) {
  if (error.data) {
    return error.data
  }
  return error
}
