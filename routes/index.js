const express =require('express');
const path = require('path');
const router = express.Router();

//conroller import
const fileController = require('../controllers/file_controller');

//create multer for file upload
const multer = require('multer');

const multStorage = multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,path.join(__dirname+"uploads"));
}});

//filter for only csv file upload
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "csv") {
      cb(null, true);
    } else {
      cb(new Error("Not a CSV File!!"), false);
    }
  };

const upload = multer({
    storage:multStorage,
    fileFilter:multerFilter
})

router.get('/',fileController.home);

router.post('/upload',upload.single('file'), fileController.upload );

router.get('/file/view/:id',fileController.view);





module.exports = router;



