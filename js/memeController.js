let gElCanvas
let gCtx


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 20

}


function renderMeme(img){
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('shown')
    elGallery.classList.add('hidden')
    const elMeme= document.querySelector('.meme-container')
    elMeme.classList.remove('hidden')
    elMeme.classList.add('shown')

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    drawImg(img)

}

    function drawImg(img) {
    const elImg = new Image()
    img.src = `img/${img.alt}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}