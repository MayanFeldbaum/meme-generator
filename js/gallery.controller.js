function renderGallery(){
    const images = getgImgs()
    const strHtml = images.map(image=>{
        const id = image.id
        return `<img src="./img/${id}.jpg" onClick="onImgSelect(this)" alt="${id}">`
    })
    elGalleryContainer= document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHtml.join('')
}