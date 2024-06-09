const { LitWord, MathWord } = require('../models/wordModel'); // get the Word Schema
const mongoose = require('mongoose');


// get all words (both literacy and maths)
const getWords = async (req, res) => {
    const literacy = await LitWord.find({}).sort();
    const maths = await MathWord.find({}).sort();
    const words = [...literacy, ...maths];
    res.status(200).json(words);
}

// Function to retrieve all words in either course
const getWordsByCourse = async (req, res) => {
    const { course } = req.body;
    // if invalid course given in URL, pop error and exit
    if (course != 'Mathematics' && course != 'Literacy') {
        return res.status(404).json({ error: "No such course exists" });
    }

    try {

        let words;
        if(course == 'Mathematics') {
            words = await MathWord.find(); 

            if (words.length === 0) {
                return res.status(400).json("No words found in Mathematics Collection!");
            }
        }
        else if (course == 'Literacy') {
            words = await LitWord.find();

            if (words.length === 0) {
                return res.status(400).json("No words found in Literacy Collection!");
            }
        }
        
        res.status(200).json(words);
    }
    
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Function to retrieve words in a specified category on input words screen
const getWordsByCategory = async (req, res) => {
    const { course, category } = req.params;
    // if invalid course given in body, pop error and exit
    if (course != 'Mathematics' && course != 'Literacy') {
        return res.status(404).json({ error: "No such course exists" });
    }

    try {
        let foundWords;
        if(course == 'Mathematics') {
            foundWords = await MathWord.find({category: category});

            if (foundWords.length === 0) {
                return res.status(400).json("No words found in the specified category!");
            }
        }
        else if (course == 'Literacy') {
            foundWords = await LitWord.find({category: category});

            if (foundWords.length === 0) {
                return res.status(400).json("No words found in the specified category!");
            }
        }
       
        const words = foundWords.map(wordDoc => wordDoc.name);
        
        return res.status(200).json(words);
    } 
    catch(error) {
        res.status(400).json({error: error.message});
    }
}


// get a single word from either course
const getWord = async (req, res) => {
    const { course, id } = req.params; // get word name from URL
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "invalid id"});
    }

    // if invalid course given in URL, pop error and exit
    if (course != 'Mathematics' && course != 'Literacy') {
        return res.status(404).json({ error: "No such course exists" });
    }

    try {
        let word;
        if(course == 'Mathematics') {
            word = await MathWord.find({_id : id});

            if (word.length == 0) {
                return res.status(404).json({error : "No word matched the provided ID!"});
            }
        }
        else if (course == 'Literacy') {
            word = await LitWord.find({_id : id});

            if (word.length == 0) {
                return res.status(404).json({error : "No word matched the provided ID!"});
            }
        }
        
        res.status(200).json(word); // send a json response
    } 
    catch(error) {
        res.status(400).json({error: error.message});
    }
}

// create a new word in either course
const createWord =  async (req, res) => {
    const { course } = req.params; // get course name from URL
    const { name, image, signvideo, gallaudetfont, category } = req.body; // get all information of the word to be created from the request body

    // if invalid course given in URL, pop error and exit
    if (course != 'Mathematics' && course != 'Literacy') {
        return res.status(404).json({ error: "No such course exists" });
    }
    
    try {
        let word;
        if(course == 'Mathematics') {
            word = await MathWord.create({name, image, signvideo, gallaudetfont, category});
        }
        else if (course == 'Literacy') {
            word = await LitWord.create({name, image, signvideo, gallaudetfont, category});
        }
        
        res.status(200).json(word); // send a json response
    } 
    catch(error) {
        res.status(400).json({error: error.message});
    }
}

// delete a word based on course and name coming from URL
const deleteWord = async (req, res) => {
    const { course, name } = req.params; // Get word and course name from URL

    // if invalid course given in URL, pop error and exit
    if (course != 'Mathematics' && course != 'Literacy') {
        return res.status(404).json({ error: "No such course exists" });
    }

    // Check if a word with the given name exists in the maths collection
    const mathword = await MathWord.findOne({ name });
    // Check if a word with the given name exists in the literacy collection
    const literacyword = await LitWord.findOne({ name });

    // if no such math word or literacy word in database, pop error
    if (!mathword && !literacyword) {
        return res.status(404).json({ error: "No such word exists" });
    }

    let deletedWord;
    if(course == 'Mathematics' && mathword) {
        deletedWord = await MathWord.findOneAndDelete({ name }); // delete the word
    }
    else if (course == 'Literacy' && literacyword) {
        deletedWord = await LitWord.findOneAndDelete({ name });
    }

    res.status(200).json(deletedWord);
}

// update a word
const updateWord = async (req, res) => {
    try {
        const {id} = req.params;
        const {_id, name, image} = req.body;
        let updatedWord;
        console.log(word);

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "no such id" });
        }

        if(word.image.includes('Literacy')) {
            console.log('true')
            const updatedWord = await LitWord.findOneAndUpdate({_id: id}, {...req.body});
            return res.status(200).json(updatedWord);
        } else if (word.image.includes('Mathematics')) {
            updatedWord = await MathWord.findOneAndUpdate({_id: id}, {...req.body});
        }
       
        // return res.status(200).json(updatedWord);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


// export all functions to routes/words.js
module.exports = {
    getWords,
    getWordsByCategory,
    getWordsByCourse,
    getWord,
    createWord,
    deleteWord,
    updateWord
}