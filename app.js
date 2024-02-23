const express = require('express');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });



app.use(express.json({limit:'1mb'}));

const mysql = require('mysql2')

const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database:'photoDatabase'
}).promise();




//get image data
app.post('/api',  upload.single('file'),  (req,res) =>{
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);

    const result = pool.query('INSERT INTO photos (photoName, photoText, photoData) VALUES ("pic1", "Manu and Noshie turned into paper!", ?)', [fileData]);
    try{
    const results =  pool.query('SELECT photoData FROM photos WHERE id = 9')
    .then(results => {

            if(results && results.length > 0){
                const imageData = results[0][0].photoData.toString('base64')
                const imageUrl = `data:image/jpeg;base64,${imageData}`;
                res.json({
                    url:imageUrl
                }
                    );
            }
            else {
                console.log('No record found ');s
            }
        })
        } catch (error) {
            console.error('Error retrieving photo from database:', error);
            res.status(500).send('Error retrieving photo from database');
        }       

    });


    app.post('/load', (req,res) =>{
        console.log("loading");
        try{
        const results =  pool.query('SELECT * FROM photos')
        .then(results => {
    
                if(results && results.length > 0){
                    const imageData=[];
                    const imageUrl = [];
                    for(var i = 0; i < results[0].length; i++){
                        imageData[i] =  results[0][i].photoData.toString('base64');
                        imageUrl[i]= `data:image/jpeg;base64,${imageData[i]}`;
                        
                    }
                
                    res.json({
                        url:imageUrl
                    });

                }
                else {
                    console.log('No record found ');
                }
            })
            } catch (error) {
                console.error('Error retrieving photo from database:', error);
                res.status(500).send('Error retrieving photo from database');
            }    
    
       
    
        });


let photoCount = 0;

//direcotry to html 
const publicPath = path.join(__dirname , '/public');



app.use('/main',express.static(publicPath));

//opens html to map
app.get('/map', (req,res)=>{
    console.log("maps");
});

//opens html to pic
app.get('/pic', (req,res)=>{
    res.sendFile(`${publicPath}/pic.html`)
});

//error page if https direcotry is wrong
app.use((req,res)=>{
    res.status(404);
    res.send('<h1> Error 404: Resource Not Found :(')
});


//rip it
app.listen(port, () => {
  console.log(`App listening  on port ${port}`);
})

