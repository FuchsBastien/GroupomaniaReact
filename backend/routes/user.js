const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const articleCtrl = require('../controllers/article');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


// Routes
//ici '/' pour /api/users/ 
router.get('/', userCtrl.findAllUser);
router.get('/:id', userCtrl.findOneUser);
router.get('/selection/:lastname/:firstname', userCtrl.findOneUserByFirstname);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

router.get('/:id/articles', articleCtrl.findArticlesByUserId);

module.exports = router;


//api/users/
//api/users/:id
//api/users/:id/articles