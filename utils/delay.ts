const delay = (timeout: number) => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  })
}

export default delay;