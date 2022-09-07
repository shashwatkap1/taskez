import success from "./assets/audio/confirm.mp3"
export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

export const playSuccessSound = (audioData = success) => {
  const audio = new Audio(audioData)
  const promise = audio.play()
  if (promise !== undefined) {
    // On older browsers play() does not return anything, so the value would be undefined.
    promise
      .then(() => {
        // Audio is playing.
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
