const STORAGE_KEY = 'MemeDB'
const KEYWORDS_KEY = 'KeywordsDB'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gElCanvas
let gCtx
let gCurrMeme
let gCurrLine = 0
let gStartPos
var gMemes = []


function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    addListeners()
    renderKeyWords()
}

function toggleShown(tab) {
    const elShown = document.querySelector(`.${tab.id}`)
    const elGallery = document.querySelector('.gallery')
    const elSaved = document.querySelector('.saved')
    const elMeme = document.querySelector('.meme-container')

    if (elShown.innerText === elGallery.innerText) {
        elGallery.classList.remove('hidden')
        elGallery.classList.add('shown')
        elMeme.classList.remove('shown')
        elMeme.classList.add('hidden')
        elSaved.classList.remove('shown')
        elSaved.classList.add('hidden')
        resetSearchKeys()
        renderGallery()
    }
    if (elShown.innerText === elSaved.innerText) {
        elSaved.classList.remove('hidden')
        elSaved.classList.add('shown')
        elMeme.classList.remove('shown')
        elMeme.classList.add('hidden')
        elGallery.classList.remove('shown')
        elGallery.classList.add('hidden')
        renderSavedMeme()
    }

    if (elShown.innerText === elMeme.innerText) {
        elMeme.classList.remove('hidden')
        elMeme.classList.add('shown')
        elSaved.classList.remove('shown')
        elSaved.classList.add('hidden')
        elGallery.classList.remove('shown')
        elGallery.classList.add('hidden')
    }
}

// OPEN MEME //

function openMeme() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('shown')
    elGallery.classList.add('hidden')
    const elMeme = document.querySelector('.meme-container')
    elMeme.classList.remove('hidden')
    elMeme.classList.add('shown')
    const elSaved = document.querySelector('.saved')
    elSaved.classList.remove('shown')
    elSaved.classList.add('hidden')
}

function onImgSelect(img) {
    resetMeme()
    const imgId = img.alt
    setImg(imgId)
    gCurrMeme = getMeme()
    renderMeme()
}

function renderMeme() {
    openMeme()
    drawImg()
}

function drawImg() {
    const elImg = new Image()
    elImg.src = `img/${gCurrMeme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const MemeLines = gCurrMeme.lines
        MemeLines.forEach((line, idx) => {
            drawText(line.txt, line.posX, line.posY, idx)
        })

    }
}

function drawText(txt, x, y, idx) {
    const font = gCurrMeme.lines[idx].size + 'px' + ' ' + gCurrMeme.lines[idx].font
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gCurrMeme.lines[idx].strokeColor
    gCtx.fillStyle = gCurrMeme.lines[idx].fillerColor
    gCtx.font = font
    gCtx.textAlign = gCurrMeme.lines[idx].align
    gCtx.textBaseline = 'middle'
    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)
}

// ADDLISTENERS //

function addListeners() {
    document.getElementById('strokeColor').addEventListener('input', strokeColorPicker)
    document.getElementById('fillerColor').addEventListener('input', fillerColorPicker)
    addMouseListeners()
    addTouchListeners()
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
        document.getElementById('enter-text').value = getMeme().lines[gCurrLine].txt
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
    gElCanvas.style.cursor = 'grab'
    document.body.style.cursor = 'auto'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
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
    const clickedText = gMeme.lines.findIndex(line => {
        return (
            x >= line.posX && x <= line.posX + gCtx.measureText(line.txt).width &&
            y >= line.posY && y <= line.posY + line.size
        )
    })
    return clickedText
}

// SET CHANGES //

function strokeColorPicker(ev) {
    const strokeColor = ev.target.value
    setStrokeColor(strokeColor, gCurrLine)
    renderMeme(gCurrMeme)
}

function fillerColorPicker(ev) {
    const fillerColor = ev.target.value
    setFillerColor(fillerColor, gCurrLine)
    renderMeme(gCurrMeme)
}

function watchTextInput(ev) {
    const characters = [...Array(95).keys()].map(i => String.fromCharCode(i + 32))
    if (characters.includes(ev.key) || ev.key === 'Backspace') {
        userText = ev.key
        setLineTxt(userText, gCurrLine)
        renderMeme(gCurrMeme)
    }
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
    addTextLine('Your Text')
    gCurrLine++
    document.getElementById('enter-text').value = ''
    renderMeme(gCurrMeme)
}

function onSwitchLines() {
    gCurrLine++
    document.getElementById('enter-text').value = ''
    if (gCurrMeme.lines.length === gCurrLine) gCurrLine = 0

}

function onTrashLine() {
    trashLine(gCurrLine)
    renderMeme(gCurrMeme)
}

function onAlignRight() {
    alignRight(gCurrLine)
    renderMeme(gCurrMeme)
}

function onAlignCenter() {
    alignCenter(gCurrLine)
    renderMeme(gCurrMeme)
}

function onAlignLeft() {
    alignLeft(gCurrLine)
    renderMeme(gCurrMeme)
}

function onSetFont(ev) {
    font = ev.value
    setFont(font, gCurrLine)
    renderMeme(gCurrMeme)
}

function searchTextInput(ev) {
    const characters = [...Array(95).keys()].map(i => String.fromCharCode(i + 32))
    if (characters.includes(ev.key) || ev.key === 'Backspace') {
        searchText = ev.key
        setSearchKeys(searchText)
        renderGallery()
    }
}

function addSticker(ev) {
    const sticker = ev.id
    addTextLine(ev.id)
    gCurrLine++
    renderMeme(gCurrMeme)
}

function saveMeme() {
    if (loadFromStorage(STORAGE_KEY)) gMemes = loadFromStorage(STORAGE_KEY)
    const memeId = gMemes.findIndex(object => {
        return object.selectedImgId === gCurrMeme.selectedImgId
    })
    if (memeId === -1) gMemes.push(gCurrMeme)
    else {
        gMemes.splice(memeId, 1)
        gMemes.push(gCurrMeme)
    }
    saveToStorage(STORAGE_KEY, gMemes)
}

function setSavedMeme(id) {
    const savedMeme = loadFromStorage(STORAGE_KEY)
    const memeId = savedMeme.find(meme => id === +meme.selectedImgId)
    gCurrMeme = memeId
    setMeme(memeId)
    renderMeme()
}


//KEYWORDS//


function renderKeyWords(){
    const keyWords= getKeyWords()
    saveToStorage(KEYWORDS_KEY,keyWords)
    const arrKeyWords= Object.keys(keyWords).map(function(key){
        let currElement = [key, keyWords[key]];
        return currElement
    })
    const strHtml = arrKeyWords.map(keyWord=>{
        const fontSize = 13+keyWord[1]+'px'
        return `<a href="#" style="font-size:${fontSize}" onclick="OnKeyWordFilter(this)" id="${keyWord[0]}">${keyWord[0]}</a>`
    })
    elKeyWord= document.querySelector('.KeyWords')
    elKeyWord.innerHTML = strHtml.join(' ')
}

function OnKeyWordFilter(keyWord){
    increaseKeyWordSize(keyWord.id)
    resetSearchKeys()
    setSearchKeys(keyWord.id)
    renderGallery()
    renderKeyWords()
}

