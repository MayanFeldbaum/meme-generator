var gKeywordSearchCountMap = loadFromStorage(KEYWORDS_KEY)||{'all':9, 'funny': 3, 'cat': 1, 'animal': 2, 'dog': 8, 'tired': 2, 'lazy': 6, 'suprise': 2, 'mood': 3, 'hair': 5, 'food': 3, 'work': 2 }
var gSearchKeys = ''

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'animal'] },
    { id: 2, url: 'img/2.jpg', keywords: ['hair', 'animal'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dog', 'lazy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['lazy', 'funny'] },
    { id: 5, url: 'img/5.jpg', keywords: ['cat', 'tired'] },
    { id: 6, url: 'img/6.jpg', keywords: ['animal', 'food'] },
    { id: 7, url: 'img/7.jpg', keywords: ['cat', 'tired'] },
    { id: 8, url: 'img/8.jpg', keywords: ['dog', 'work'] },
    { id: 9, url: 'img/9.jpg', keywords: ['animal', 'suprise'] },
    { id: 10, url: 'img/10.jpg', keywords: ['dog', 'lazy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['dog', 'mood'] },
    { id: 12, url: 'img/12.jpg', keywords: ['dog', 'food'] },
    { id: 13, url: 'img/13.jpg', keywords: ['dog', 'food'] },
    { id: 14, url: 'img/14.jpg', keywords: ['animal', 'suprise'] },
    { id: 15, url: 'img/15.jpg', keywords: ['dog', 'funny'] },
    { id: 16, url: 'img/16.jpg', keywords: ['animal', 'hair'] },
    { id: 17, url: 'img/17.jpg', keywords: ['dog', 'mood'] },
    { id: 18, url: 'img/18.jpg', keywords: ['animal', 'work'] },
    { id: 19, url: 'img/19.jpg', keywords: ['animal', 'mood'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Your Text',
            size: 30,
            font: 'Impact',
            align: 'center',
            strokeColor: 'pink',
            fillerColor: 'white',
            posX: 120,
            posY: 50,
            initial: true,
            isDrag: false,
            isHighlighted: true,
        },
        {
            txt: 'Your Text',
            size: 30,
            font: 'Impact',
            align: 'center',
            strokeColor: 'black',
            fillerColor: 'white',
            posX: 120,
            posY: 300,
            initial: true,
            isDrag: false,
            isHighlighted: false,
        },
    ]
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setMeme(meme) {
    gMeme = meme
}

function getMeme() {
    return gMeme
}

function setSearchKeys(txt) {
    if (txt === 'Backspace') gSearchKeys = gSearchKeys.substring(0, gSearchKeys.length - 1)
    else gSearchKeys += txt
}

function resetSearchKeys() {
    gSearchKeys = ''
}

function getgImgs() {
    if (!gSearchKeys || gSearchKeys === '' || gSearchKeys === 'all') return gImgs
    else {
        var filterImgs = gImgs.filter(img => {
            const keysList = img.keywords
            if (keysList.includes(gSearchKeys)) return img
        })
    } return filterImgs
}

function updateStrokeColor(color, line) {
    gMeme.lines[line].strokeColor = color
}

function updateFillerColor(color, line) {
    gMeme.lines[line].fillerColor = color
}

function setLineTxt(text, line) {
    if (gMeme.lines[line].initial) {
        gMeme.lines[line].txt = ''
        gMeme.lines[line].initial = false
    }

    if (text === 'Backspace') gMeme.lines[line].txt = gMeme.lines[line].txt.substring(0, gMeme.lines[line].txt.length - 1)
    else gMeme.lines[line].txt += text
}

function increaseFont(line) {
    if (gMeme.lines[line].size < 200) gMeme.lines[line].size = gMeme.lines[line].size + 1
}

function decreaseFont(line) {
    if (gMeme.lines[line].size > 20) {
        gMeme.lines[line].size = gMeme.lines[line].size - 1
    }
}

function addTextLine(text) {
    const newLine = {
        txt: text,
        size: 30,
        font: 'Impact',
        align: 'left',
        strokeColor: 'black',
        fillerColor: 'white',
        posX: 120,
        posY: 175,
        initial: true,
        isDrag: false,
        isHighlighted: false
    }
    gMeme.lines.push(newLine)
}

function setTextDrag(line, txt) {
    gMeme.lines[line].isDrag = txt
}

function moveText(line, dx, dy) {
    gMeme.lines[line].posX += dx
    gMeme.lines[line].posY += dy

}

function getText(line) {
    return gMeme.lines[line]
}

function trashLine(line) {
    gMeme.lines.splice(line, 1)
}

function alignRight(line) {
    gMeme.lines[line].align = 'left'
}

function alignCenter(line) {
    gMeme.lines[line].align = 'center'
}

function alignLeft(line) {
    gMeme.lines[line].align = 'right'
}

function setFont(font, line) {
    gMeme.lines[line].font = font
}

function resetMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Your Text',
                size: 30,
                font: 'Impact',
                align: 'left',
                strokeColor: 'black',
                fillerColor: 'white',
                posX: 120,
                posY: 50,
                initial: true,
                isDrag: false,
                isHighlighted: true,
            },
            {
                txt: 'Your Text',
                size: 30,
                font: 'Impact',
                align: 'left',
                strokeColor: 'black',
                fillerColor: 'white',
                posX: 120,
                posY: 300,
                initial: true,
                isDrag: false,
                isHighlighted: false,
            },
        ]
    }
}

function getKeyWords() {
    return gKeywordSearchCountMap
}

function increaseKeyWordSize(keyWord) {
    Object.keys(gKeywordSearchCountMap).forEach(key => {
        if(key === keyWord) gKeywordSearchCountMap[key]++
        }
    )}