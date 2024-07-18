let word
let guessation
let guessesRemaining = 7
let guessIndex = 0

const fileNames = ["noman", "head", "torso", "leftleg", "rightleg", "leftarm", "rightarm", "dead"]

let excludedLetters = []

fetch("https://random-word.ryanrk.com/api/en/word/random").then(d=>d.json()).then(d=>{
  let regexthing = excludedLetters.length==0?new RegExp("/./g"):new RegExp("/^"+excludedLetters.join("")+"/g")
  word=d[0].toLowerCase()
  guessation = word.replaceAll(regexthing,"_")
  document.querySelector("h1").innerText=guessation
})

let usedKeys = []

window.addEventListener("keypress", (e) => {
  const key = e.key.toLowerCase()
  if (!/^[a-z]+$/.test(key)) return

  if (usedKeys.indexOf(key) != -1) {
    alert(key+" has already been guessed")
    return
  }
  
  usedKeys.push(e.key)
  
  if (word.split("").indexOf(key) != -1) {
    alert(key+" is in the word")
    excludedLetters.push(key)
  } else {
    guessesRemaining--
    guessIndex++
    document.querySelector("img").src="hangman/"+fileNames[guessIndex]+".png"
    alert(key+" is not in the word. "+guessesRemaining+" guesses remaining")
    if (guessesRemaining == 0) {
      alert("You LOST")
    }
  }
})