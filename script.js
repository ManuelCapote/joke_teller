const audioElement = document.getElementById('audio')
const button = document.getElementById('button')

function test(joke) {
  VoiceRSS.speech({
    key: 'd3c7e2c5b57141448cb4a47b28fd0999',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  })
}

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled
}

// Send the Joke text to the Text-to-Speach API src.
function tellMeJoke(joke) {
  test(joke)
}

// Make the Joke text only one line
// Setup the Jokes Api
// Use the Fetch API to get the Joke data
// Use an Async Func and the Method Try - Catch
async function getJoke() {
  let jokeString = ''
  const jokesUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
  try {
    const response = await fetch(jokesUrl)
    const data = await response.json()
    if (data.setup) {
      joke = `${data.setup} ...  ${data.delivery}`
    } else joke = data.joke
    // Text to Speech
    tellMeJoke(joke)

    // Disable Btn
    toggleButton()
  } catch (error) {
    // Show Error Here
  }
}

button.addEventListener('click', getJoke)
audioElement.addEventListener('ended', toggleButton)
