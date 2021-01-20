const express= require('express');
const router=express.Router();
const middlewares=require('../middlewares/cache');

const Controller= require('../controllers/controller');

// checking in cache if tranlated text already exists
router.post('/translate',middlewares.cache,Controller.translateText);

module.exports=router;