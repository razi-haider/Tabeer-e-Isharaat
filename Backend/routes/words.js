const express = require('express')
const { 
    getWords, 
    getWordsByCategory, 
    getWordsByCourse,
    getWord, 
    createWord, 
    deleteWord, 
    updateWord } = require('../controllers/wordController');

const router = express.Router()

//GET ALL WORDS
router.get('/', getWords);


router.get('/getWordsByCategory/:course/:category', getWordsByCategory);

router.get('/getWordsByCourse', getWordsByCourse);

// GET 1 WORD
router.get('/getWord/:course/:id', getWord);

// POST A NEW WORD
router.post('/createWord/:course', createWord); // course name comes from the frontend - checkbox buttons of 'Dataset Update' screen

// DELETE A WORD
router.delete('/deleteWord/:course/:name', deleteWord);

// UPDATE A WORD
router.patch('/updateWord/:id', updateWord);

module.exports = router