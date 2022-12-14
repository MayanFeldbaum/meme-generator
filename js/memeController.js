let gElCanvas
let gCtx
let gCurrMeme
let gstrokeStyleColor
let gCurrLine =0


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 20
}

function openMeme() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('shown')
    elGallery.classList.add('hidden')
    const elMeme = document.querySelector('.meme-container')
    elMeme.classList.remove('hidden')
    elMeme.classList.add('shown')

}

function renderMeme(img) {
    openMeme()
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // const imgID= img.alt
    // gCurrMeme = getMeme(imgID)
    gCurrMeme = getMeme()
    drawImg()
}

function drawImg() {
    // const text = gCurrMeme.lines[0].txt
    const elImg = new Image()
    elImg.src = `img/${gCurrMeme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const MemeLines = gCurrMeme.lines
        MemeLines.forEach((line,idx)=>{
            drawText(line.txt, line.posX, line.posY,idx)
        })
        
    }
}

function drawText(text, x, y,idx) {
    const font = gCurrMeme.lines[idx].size + 'px' + ' ' + 'Impact'
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gCurrMeme.lines[idx].color
    gCtx.font = font
    gCtx.textAlign = gCurrMeme.lines[idx].align
    gCtx.textBaseline = 'middle'
    gCtx.strokeText(text, x, y)
}

function addListeners() {
    document.addEventListener("change", watchColorPicker)
    document.getElementById('input').addEventListener("keypress", watchTextInput)
}

// SET COLORS EVENT //

function watchColorPicker(event) {
    userColor = event.target.value
    updateMemeColor(userColor,gCurrLine)
    renderMeme(gCurrMeme)
}

function watchTextInput(ev) {
    userText = ev.key
    setLineTxt(userText,gCurrLine)
    renderMeme(gCurrMeme)
}

function onIncreaseFont(){
    increaseFont(gCurrLine)
    renderMeme(gCurrMeme)
}

function onDecreaseFont(){
    decreaseFont(gCurrLine)
    renderMeme(gCurrMeme)
}

function onAddTextLine(){
addTextLine()
renderMeme(gCurrMeme)
}

function onSwitchLines(){
    gCurrLine++
if(gCurrMeme.lines.length===gCurrLine)gCurrLine=0
}

