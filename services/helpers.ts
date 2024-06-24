export async function fakeApiCall<T>(data: { delay?: number; response?: T }): Promise<T> {
  const { delay = 2000, response } = data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, delay)
  })
}
