const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');
const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


// Routes
//ici '/' pour /api/articles/ 
router.get('/', auth, articleCtrl.findAllArticle);
router.get('/:id', articleCtrl.findOneArticle); 
router.post('/', multer, articleCtrl.createArticle);
router.put('/:id', multer, articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);

router.get('/:id/comments', commentCtrl.findCommentsByArticleId);

module.exports = router;


//api/articles/
//api/articles/:id
//api/articles/:id/comments

