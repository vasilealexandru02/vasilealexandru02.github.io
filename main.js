var generatedNumber
var letters = ['X', '0']
var letterSelected
var gameboard
var attempts

function playGame () {
  var gameBoardCell = document.getElementsByClassName('gameboard')
  for (let index = 0; index < gameBoardCell.length; index++) {
    gameBoardCell[index].disabled = false // Set the disabled attribute to true
    gameBoardCell[index].style.opacity = '1' // For visual indication (optional)
    gameBoardCell[index].style.pointerEvents = 'auto' // Disable pointer events (op
  }

  attempts = 0
  gameboard = [
    ['Z', 'Z', 'Z'],
    ['Z', 'Z', 'Z'],
    ['Z', 'Z', 'Z']
  ]
  var gameboards = document.getElementsByClassName('gameboard')
  for (var i = 0; i < gameboards.length; i++) {
    gameboards[i].innerHTML = ''
  }
  generateLetter()
  document.getElementById(
    'gameText'
  ).innerHTML = `${letterSelected} is starting!`
}

function generateLetter () {
  let generatedNumber = Math.floor(Math.random() * 2)
  letterSelected = letters[generatedNumber]
}

function switchLetter () {
  if (letterSelected == letters[0]) {
    letterSelected = letters[1]
  } else {
    letterSelected = letters[0]
  }
  document.getElementById(
    'gameText'
  ).innerHTML = `<b>${letterSelected}</b> player turn!`
}

function clickedSquare (e) {
  if (attempts != undefined) {
    attempts++
    let clickedSquare = document.getElementById(e.target.id)

    if (clickedSquare.innerHTML == '') {
      if (letterSelected != undefined) {
        clickedSquare.innerHTML = `<p class="text-center fs-1 align-middle"  id="${e.target.id}}-text">${letterSelected}</p>`
        clickedSquare.disabled = true // Set the disabled attribute to true
        clickedSquare.style.opacity = '0.7' // For visual indication (optional)
        clickedSquare.style.pointerEvents = 'none' // Disable pointer events (op
        let clickedSquareId = e.target.id
        insertIntoGameboard(clickedSquareId)
        checkBoard()
      }
      console.log(gameboard)
      switchLetter()
    }
    if (attempts == 9) {
      displayEndGame()
    }
  }
}

function insertIntoGameboard (position) {
  switch (position) {
    case '0':
      gameboard[0][0] = letterSelected
      break
    case '1':
      gameboard[0][1] = letterSelected
      break
    case '2':
      gameboard[0][2] = letterSelected
      break
    case '3':
      gameboard[1][0] = letterSelected
      break
    case '4':
      gameboard[1][1] = letterSelected
      break
    case '5':
      gameboard[1][2] = letterSelected
      break
    case '6':
      gameboard[2][0] = letterSelected
      break
    case '7':
      gameboard[2][1] = letterSelected
      break
    case '8':
      gameboard[2][2] = letterSelected
      break
  }
}

function checkBoard () {
  // Obtener el número de filas y columnas
  const filas = gameboard.length
  const columnas = gameboard[0].length
  // First iteration over the rows
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (
        gameboard[i][j] == letterSelected &&
        gameboard[i][j + 1] == letterSelected &&
        gameboard[i][j + 2] == letterSelected
      ) {
        document.getElementById(
          'modalBody'
        ).innerHTML = `${letterSelected} player won ✌!`
        document.getElementById(
          'staticBackdropLabel'
        ).innerHTML = `${letterSelected} won!`
        document.getElementById('backdropbutton').click()
      }
      j = 3
    }
  }
  // Second iteration over the columns
  for (let j = 0; j < columnas; j++) {
    for (let i = 0; i < filas; i++) {
      if (
        gameboard[i][j] == letterSelected &&
        gameboard[i + 1][j] == letterSelected &&
        gameboard[i + 2][j] == letterSelected
      ) {
        document.getElementById(
          'modalBody'
        ).innerHTML = `${letterSelected} player won ✌!`
        document.getElementById(
          'staticBackdropLabel'
        ).innerHTML = `${letterSelected} won!`
        document.getElementById('backdropbutton').click()
      }
      i = 3
    }
  }
  // Iteration over diagonals
  // Right to left diagonal
  console.log('Diagonal derecha a izquierda')
  for (let k = 0; k < filas + columnas - 1; k++) {
    let inicioFila = Math.max(0, k - columnas + 1)
    let inicioColumna = Math.min(k, columnas - 1)
    for (let i = inicioFila, j = inicioColumna; i < filas && j >= 0; i++, j--) {
      if (k == 2) {
        if (
          gameboard[i][j] == letterSelected &&
          gameboard[i + 1][j - 1] == letterSelected &&
          gameboard[i + 2][j - 2] == letterSelected
        ) {
          document.getElementById(
            'modalBody'
          ).innerHTML = `${letterSelected} player won ✌!`
          document.getElementById(
            'staticBackdropLabel'
          ).innerHTML = `${letterSelected} won!`
          document.getElementById('backdropbutton').click()
        }
        i = 3
        j = 0
      }
    }
  }

  console.log('Diagonal izquierda derecha')
  // Left to right diagonal
  for (let k = 0; k < filas + columnas - 1; k++) {
    let inicioFila = Math.max(0, k - columnas + 1)
    let inicioColumna = Math.min(k, columnas - 1)
    for (let i = inicioFila, j = inicioColumna; i < filas && j >= 0; i++, j--) {
      if (k == 2) {
        if (
          gameboard[i][columnas - 1 - j] == letterSelected &&
          gameboard[i + 1][columnas - 1 - j + 1] == letterSelected &&
          gameboard[i + 2][columnas - 1 - j + 2] == letterSelected
        ) {
          document.getElementById(
            'modalBody'
          ).innerHTML = `${letterSelected} player won ✌!`
          document.getElementById(
            'staticBackdropLabel'
          ).innerHTML = `${letterSelected} won!`
          document.getElementById('backdropbutton').click()
        }
        i = 3
        j = 0
      }
    }
  }
}

function displayEndGame () {
  document.getElementById('modalBody').innerHTML = 'Maximum number of attempts!'
  document.getElementById('staticBackdropLabel').innerHTML = 'Nobody won ❗'
  document.getElementById('backdropbutton').click()
}
