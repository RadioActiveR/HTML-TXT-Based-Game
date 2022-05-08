const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Welcome to Living in The Aftermath!',
    options: [
      {
        text: 'Activate OP',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Next',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: '"You\'re a dissapointment.", says the Goose.',
    options: [
      {
        text: 'Reply: "Ok"',
        nextText: 3
      },
      {
        text: 'Strangle the Goose',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'The Goose dies and drops *PorkChop*.',
    options: [
      {
        text: 'Say Bruh',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: 'Now let us begin the real game.',
    options: [
      {
        text: 'Next',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'To Be Continued --->',
    options: [
      {
        text: 'RESTART',
        nextText: -1
      }
    ]
  }
]

startGame()