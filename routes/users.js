var express = require('express');
var user_controller = require('../controllers/users_controller')
const {auth} = require('../middlewares/authentication')

var router = express.Router();

router.put('/photo', auth, user_controller.upload_profile_pic)
router.get('/', auth , user_controller.get_user)
router.put('/',auth, user_controller.update_user) // update user on profile page of user

module.exports = router;
