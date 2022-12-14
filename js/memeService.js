var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Your Text',
            size: 30,
            align: 'left',
            color: 'red',
            posX: 200,
            posY: 200,
            initial: true,
        },
        {
            txt: 'Your Text',
            size: 30,
            align: 'left',
            color: 'red',
            posX: 250,
            posY: 250,
            initial: true,
        },
    ]
}


function getMeme() {
    return gMeme
}

function getgImgs() {
    return gImgs
}

function updateMemeColor(color, line) {
    gMeme.lines[line].color = color
}

function setLineTxt(text, line) {
    if (gMeme.lines[line].initial) {
        gMeme.lines[line].txt = ''
        gMeme.lines[line].initial = false
    }
    gMeme.lines[line].txt += text
}

function increaseFont(line) {
    if (gMeme.lines[line].size < 200) gMeme.lines[line].size = gMeme.lines[line].size + 1
}

function decreaseFont(line) {
    if (gMeme.lines[line].size > 20) {
        gMeme.lines[line].size = gMeme.lines[0].size - 1
    }
}

function addTextLine(){
    const newLine = {
        txt: 'Your Text',
        size: 30,
        align: 'left',
        color: 'red',
        posX: 100,
        posY: 100,
        initial: true,
    }

    gMeme.lines.push(newLine)  
}