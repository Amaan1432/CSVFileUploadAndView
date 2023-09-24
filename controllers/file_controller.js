const CSV = require('../model/csv');
const path = require('path');
const parser = require('csv-parser');
const fs = require('fs');

module.exports.home =async (req,res)=>{
    let files = await CSV.find({});
    return res.render('home',{title:'File Manager',files});
    
}

module.exports.upload = async (req,res)=>{
    try {
        // file is not present
        if(!req.file) {
            res.status(400).send('No files were uploaded.');
            return res.redirect('/');
        }
        let file = await CSV.create(req.file);

        return res.redirect('/');

    } catch (error) {
        console.log('Error in fileController/upload', error);
        res.status(500).send('Internal server error');
        
    }
}

module.exports.view = async (req,res)=>{
    let file = await CSV.findOne({id : req.param.id});
    const results=[];
    const header =[];
    if(!file){
        res.status(400).send('file not found');
    }
    fs.createReadStream(file.path)
    .pipe(parser())
        .on('headers', (headers) => {
            headers.map((head) => {
                header.push(head);
            });
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            res.render("view", {
                title: file.originalname,
                fileName: file.originalname,
                head: header,
                data: results,
                length: results.length
            });
        });
    
}

module.exports.delete = async (req,res)=>{
    let file = await CSV.findById(req.params.id)
    let filename = file.filename;
    console.log('filename',filename);
    if (!filename) {
      return res.status(400).send('Filename not provided.');
    }
  
    const filePath = path.join(__dirname, '../uploads', filename);

    fs.unlink(filePath, function(err) {
        if(err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            CSV.findByIdAndDelete(req.params.id)
            .then(()=>console.log('deleted'))
            .catch(err=>{
                console.error(err);
            })
        }
    });
    // fs.unlinkSync({path:filePath});
    return res.redirect('back');

}
