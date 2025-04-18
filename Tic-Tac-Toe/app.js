let boxes = document.querySelectorAll('.box')
let resetBtn = document.querySelector('#reset-btn')
let newGameBtn = document.querySelector('#new-btn')
let msgContainer  = document.querySelector('.msg-container')
let msg = document.querySelector('#msg')

let turnO = true
let count = 0

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    box.innerText = turnO ? 'O' : 'X'
    turnO = !turnO
    box.disabled = true
    count++
    let isWinner  = checkWinner();
    if (count >=9 && !isWinner) {
      gameDraw()
    }
  })
})

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos0value = boxes[pattern[0]].innerText
    let pos1value = boxes[pattern[1]].innerText
    let pos2value = boxes[pattern[2]].innerText
    if (pos0value != '' && pos1value != '' && pos2value != '') {
      if (pos0value === pos1value && pos1value === pos2value) {
        showWinner(pos0value)
        return true
      }   
    } 
  }
}

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`
  msgContainer.classList.remove('hide')
  disableBoxes()
}

const disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true
  }
}

const enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false
    box.innerText = ""
  }
}

const resetGame = () => {
  turnO = true
  enableBoxes()
  msgContainer.classList.add('hide')
  count = 0
}

newGameBtn.addEventListener('click', resetGame)
resetBtn.addEventListener('click', resetGame)