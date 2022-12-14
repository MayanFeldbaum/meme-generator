function init() {
    renderGallery()
    // resizeCanvas()
}

function toggleShown(tab) {
    const elShown = document.querySelector(`.${tab.id}`)
    const elGallery = document.querySelector('.gallery')
    const elSaved = document.querySelector('.saved')
    const elAbout = document.querySelector('.about')
    const elMeme = document.querySelector('.meme-container')
    if (elShown.classList.contains('shown')) return
else{

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
