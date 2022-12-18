function renderSavedMeme(){
    const savedMeme = loadFromStorage(STORAGE_KEY)
    const strHtml = savedMeme.map(meme=>{
        const id = meme.selectedImgId
        return `<img src="./img/${id}.jpg" onClick="setSavedMeme(${id})" alt="${id}">`
    })
    elGalleryContainer= document.querySelector('.savedMeme-container')
    elGalleryContainer.innerHTML = strHtml.join('')
}