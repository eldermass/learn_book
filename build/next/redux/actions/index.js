export const actionTypes = {
  COUNT_NUMBER: 'COUNT_NUMBER'
}

export function setCountNumber(number) {
  // console.log(number)
  return {
    type: actionTypes.COUNT_NUMBER,
    payload: number
  }
}