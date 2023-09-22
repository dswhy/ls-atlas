import tunnel from 'tunnel-rat'

export const r3f = tunnel()

export const setGlobalVH = () => {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  document.documentElement.style.setProperty('--variable-vh', `${vh}px`)
}

export const updateGlobalVH = () => {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--variable-vh', `${vh}px`)
}

// Subscribe and publish to events
export function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener)
}

export function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener)
}

export function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(event)
}
