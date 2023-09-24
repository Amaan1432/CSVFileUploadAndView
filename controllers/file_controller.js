const CSV = require('../config/mongoose');
const path = require('path');
const parser = require('csv-parser');
const fs = require('fs');

module.exports.home =async (req,res)=>{
    let files = await CSV.find({});
    // return res.render('home',files);
    
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
            res.render("file_viewer", {
                title: file.originalname,
                fileName: file.originalname,
                head: header,
                data: results,
                length: results.length
            });
        });
    

}