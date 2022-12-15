let gElCanvas
let gCtx
let gCurrMeme
let gCurrImg
let gstrokeStyleColor
let gCurrLine = 0
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gStartPos

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    // resizeCanvas()
    addListeners()
}

function toggleShown(tab) {
    const elShown = document.querySelector(`.${tab.id}`)
    const elGallery = document.querySelector('.gallery')
    const elSaved = document.querySelector('.saved')
    const elAbout = document.querySelector('.about')
    const elMeme = document.querySelector('.meme-container')
    if (elShown.classList.contains('shown')) return
    else {

        if (elShown.innerText !== elGallery.innerText) {
            elGallery.classList.remove('shown')
            elGallery.classList.add('hidden')
        }
        if (elShown.innerText !== elSaved.innerText) {
            elSaved.classList.remove('shown')
            elSaved.classList.add('hidden')
        }

        if (elShown.innerText !== elAbout.innerText) {
            elAbout.classList.remove('shown')
            elAbout.classList.add('hidden')
        }

        if (elShown.innerText !== elMeme.innerText) {
            elMeme.classList.remove('shown')
            elMeme.classList.add('hidden')
        }
        elShown.classList.remove('hidden')
        elShown.classList.add('shown')
    }

}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container1')
//     gElCanvas.width = elContainer.offsetWidth - 20
// }

function openMeme() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('shown')
    elGallery.classList.add('hidden')
    const elMeme = document.querySelector('.meme-container')
    elMeme.classList.remove('hidden')
    elMeme.classList.add('shown')
}

function onImgSelect(img) {
    const imgId = img.alt
    setImg(imgId)
    renderMeme()
}

function renderMeme() {
    openMeme()
    // gElCanvas = document.getElementById('my-canvas')
    // gCtx = gElCanvas.getContext('2d')
    gCurrMeme = getMeme()
    drawImg()
}

function drawImg() {
    const elImg = new Image()
    elImg.src = `img/${gCurrMeme.selectedImgId}.jpg`
    console.log(elImg.src);
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const MemeLines = gCurrMeme.lines
        MemeLines.forEach((line, idx) => {
            drawText(line.txt, line.posX, line.posY, idx)
        })

    }
}

function drawText(text, x, y, idx) {
    const font = gCurrMeme.lines[idx].size + 'px' + ' ' + gCurrMeme.lines[idx].font
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gCurrMeme.lines[idx].color
    gCtx.font = font
    gCtx.textAlign = gCurrMeme.lines[idx].align
    gCtx.textBaseline = 'middle'
    gCtx.strokeText(text, x, y)
}
// ADDLISTENERS //

function addListeners() {
    document.getElementById('color').addEventListener('input', watchColorPicker)
    addMouseListeners()
    addTouchListeners()
    // Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (isTextClicked(pos) >= 0) {
        gCurrLine = isTextClicked(pos)
        setTextDrag(gCurrLine, true)
        //Save the pos we start from
        gStartPos = pos
        gElCanvas.style.cursor = 'grabbing'
    }
}

function onMove(ev) {
    const { isDrag } = getText(gCurrLine)
    if (!isDrag) return
    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(gCurrLine, dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}

function onUp() {
    setTextDrag(gCurrLine, false)
    gElCanvas.style.cursor ='grab'
    document.body.style.cursor = 'auto'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    console.log('ev:', ev)
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function isTextClicked(ev) {
    // ev.stopPropagation()
    const { x, y } = ev
    // var fontHeight = parseInt(gCtx.font) * 1.2
    // console.log(fontHeight);
    const clickedText = gMeme.lines.findIndex(line => {
        return (
            // console.log( 'offsetX, offsetY',  x, y, ',posy:',line.posY,'txtwheight:', parseInt(gCtx.font) * 1.2)
            x >= line.posX && x <= line.posX + gCtx.measureText(line.txt).width &&
            y >= line.posY && y <= line.posY + line.size
        )
    })
    return clickedText
}


// SET CHANGES //

function watchColorPicker(ev) {
    userColor = ev.target.value
    updateMemeColor(userColor, gCurrLine)
    renderMeme(gCurrMeme)
}

function watchTextInput(ev) {
    if (ev.key === 'Enter') return
    userText = ev.key
    setLineTxt(userText, gCurrLine)
    renderMeme(gCurrMeme)
}

function onIncreaseFont() {
    increaseFont(gCurrLine)
    renderMeme(gCurrMeme)
}

function onDecreaseFont() {
    decreaseFont(gCurrLine)
    renderMeme(gCurrMeme)
}

function onAddTextLine() {
    addTextLine()
    gCurrLine++
    renderMeme(gCurrMeme)
}

function onSwitchLines() {
    gCurrLine++
    if (gCurrMeme.lines.length === gCurrLine) gCurrLine = 0
}

function onTrashLine(){
    trashLine(gCurrLine)
    renderMeme(gCurrMeme)
}

function onAlignRight(){
    alignRight(gCurrLine)
    renderMeme(gCurrMeme)
}

function onAlignCenter(){
    alignCenter(gCurrLine)
    renderMeme(gCurrMeme)
}

function onAlignLeft(){
    alignLeft(gCurrLine)
    renderMeme(gCurrMeme)
}

function onSetFont(ev){
    font = ev.value
    setFont(font, gCurrLine)
    renderMeme(gCurrMeme)  
}

function searchTextInput(ev){
    if (ev.key === 'Enter') return
    searchText = ev.key
    setSearchKeys(searchText)
    renderGallery()
}