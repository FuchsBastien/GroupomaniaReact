const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');

// Routes
//ici '/' pour /api/comments/
router.get('/', commentCtrl.findAllComment);
router.get('/:id', commentCtrl.findOneComment); 
router.post('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;


//api/comments/:id


