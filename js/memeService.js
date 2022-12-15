var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gSearchKeys = ''
var gCanvasHeight
var gCanvasWidth

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['view'] },
    { id: 2, url: 'img/2.jpg', keywords: ['books', 'sky'] },
    { id: 3, url: 'img/3.jpg', keywords: ['view', 'sky'] },
    { id: 4, url: 'img/4.jpg', keywords: ['books', 'sky'] },
    { id: 5, url: 'img/5.jpg', keywords: ['view', 'sky'] },
]

var gMeme = {
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
            posX: 150,
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
            posX: 150,
            posY: 350,
            initial: true,
            isDrag: false,
            isHighlighted: false,
        },
    ]
}

function setCanvasHeight() {
    gCanvasHeight = getCanvasHeight()
}
function setCanvasWidth() {
    gCanvasWidth = getCanvasWidth()
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setMeme(meme) {
    console.log(meme);
    gMeme = meme
}

function getMeme() {
    return gMeme
}

function setSearchKeys(txt) {
    if (txt === 'Backspace') gSearchKeys = gSearchKeys.substring(0, gSearchKeys.length - 1)
    else gSearchKeys += txt
}

function getgImgs() {
    if (!gSearchKeys) return gImgs
    else {
        var filterImgs = gImgs.filter(img => {
            const keysList = img.keywords
            console.log(keysList)
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
    console.log(gMeme.lines[line].txt)
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
        posX: gCanvasWidth / 2 - 55,
        posY: gCanvasHeight / 2,
        initial: true,
        isDrag: false,
        isHighlighted: false
    }
    gMeme.lines.push(newLine)
}

function setTextDrag(line, txt) {
    console.log(gMeme.lines[line].isDrag)
    gMeme.lines[line].isDrag = txt
    console.log(gMeme.lines[line].isDrag)
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
    gMeme.lines[line].align = 'right'
}

function alignCenter(line) {
    gMeme.lines[line].align = 'center'
}

function alignLeft(line) {
    gMeme.lines[line].align = 'left'
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
                posX: 150,
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
                posX: 150,
                posY: 350,
                initial: true,
                isDrag: false,
                isHighlighted: false,
            },
        ]
    }
}