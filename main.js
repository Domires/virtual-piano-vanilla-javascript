const keys = document.querySelectorAll('.key')
const noteDisplayed = document.querySelector('#note-displayed')

function playNote(event) {
    let audioKeyCode = getKeyCode(event)
    
    const key = document.querySelector(`.key[data-key='${audioKeyCode}']`)

    const cantFoundAnyKey = !key
    
    if(cantFoundAnyKey) return

    addPlayingClass(key)

    displayNote(key)

    playAudio(audioKeyCode)
}

function displayNote(key) {
    const note = key.dataset.note

    noteDisplayed.innerText = `Nota: ${note}`
}

function removeDisplayedNote() {
    noteDisplayed.innerText = `Nota: ♫`
}

function addPlayingClass(key) {
    const [...classes] = key.classList

    classes.includes('white') ? key.classList.add('white-active') : key.classList.add('black-active')

    key.classList.add('playing')
}

function removePlayingClass(event) {
    event.target.classList.remove('playing', 'black-active')
    setTimeout(_ => event.target.classList.remove('white-active'), 100)
}

function getKeyCode(event) {
    let keyCode

    const isKeyboard = event.type === 'keydown'

    isKeyboard ? keyCode = event.keyCode : keyCode = event.target.dataset.key

    return keyCode
}

function playAudio(audioKeyCode) {
    const audio = document.querySelector(`audio[data-key='${audioKeyCode}']`)
    audio.currentTime = 0
    audio.play()
}

function mousePressed(event) {
    keys.forEach(key => key.addEventListener('mouseover', playNote))
    playNote(event)
}

function mouseNotPressed() {
    keys.forEach(key => key.removeEventListener('mouseover', playNote))
    removeDisplayedNote()
}

function registerEvents() {
    keys.forEach(key => {
        key.addEventListener('mousedown', mousePressed)
        key.addEventListener('mouseup', mouseNotPressed)
        key.addEventListener('transitionend', removePlayingClass)
    })

    window.addEventListener('keydown', playNote)
    window.addEventListener('keyup', removeDisplayedNote)
}

window.addEventListener('load', registerEvents)