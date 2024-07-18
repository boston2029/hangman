let word
let guessation
let guessesRemaining = 7
let guessIndex = 0

const fileNames = ["noman", "head", "torso", "leftleg", "rightleg", "leftarm", "rightarm", "dead"]

let excludedLetters = []

function revealpartofword() {
  let newWord = word
  newWord.split("").forEach(letter => {
    if (!excludedLetters.includes(letter)) {
      newWord=newWord.replaceAll(letter, "_")
    }
  })

  guessation=newWord.split("").join(" ")

  document.querySelector("h1").innerText=guessation
}

word=atob(location.href.split("?")[1])
revealpartofword()

let usedKeys = []

window.addEventListener("keypress", (e) => {
  const key = e.key.toLowerCase()
  if (!/^[a-z]+$/.test(key)) return

  if (usedKeys.indexOf(key) != -1) {
    document.querySelector("img").src="hangman/"+fileNames[guessIndex]+".png"
    document.querySelector("p").innerText=key+" has already been guessed"
    document.querySelector("p").style.color='black'
    document.querySelector("p").style.display='block'
    setTimeout(function(){
      document.querySelector("p").style.display='none'
    }, 1000)
    return
  }

  usedKeys.push(e.key)

  if (word.split("").indexOf(key) != -1) {
    document.querySelector("p").innerText=key+" is in the word"
    document.querySelector("p").style.color='limegreen'
    document.querySelector("p").style.display='block'
    setTimeout(function(){
      document.querySelector("p").style.display='none'
    }, 1000)
    excludedLetters.push(key)
  } else {
    guessesRemaining--
    guessIndex++
    document.querySelector("img").src="hangman/"+fileNames[guessIndex]+".png"
    document.querySelector("p").innerText=key+" is not in the word. "+guessesRemaining+" guesses remaining"
    document.querySelector("p").style.color='rgb(255,83,83)'
    document.querySelector("p").style.display='block'
    setTimeout(function(){
      document.querySelector("p").style.display='none'
    }, 1000)
    if (guessesRemaining == 0) {
      location.href="lose.html?"+word
    }
  }

  revealpartofword()
  if (guessation.split(" ").join("")==word) {
    location.href="win.html?"+word
  }
})