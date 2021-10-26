const chalk = require('chalk')
const fs = require('fs')

const addNote =  (title, body) => {
    const notes = loadNodes()
    //const duplicateNotes = notes.filter( note => note.title === title)
    const duplicateNote = notes.find(note => note.title === title)

    if (duplicateNote === undefined){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote =  (title) => {
    const notes = loadNodes()
    const notesToKeep = notes.filter( note => note.title !== title)
    saveNotes(notesToKeep)
    if ( notes.length > notesToKeep.length){
        console.log(chalk.bgGreen('Note removed'))
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

const listNotes =  () => {
    const notes = loadNodes()
    console.log(chalk.bold.blue.underline('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNodes()
    const requiredNote = notes.find(note => note.title === title)
    if(!requiredNote){
        console.log(chalk.red('No note found?'))
    } else {
        console.log(chalk.bold.underline(requiredNote.title))
        console.log((requiredNote.body))
    }
}

const saveNotes =  (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson) 
}

const loadNodes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}
 

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}