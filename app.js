const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql2')

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });
app.use(express.json({limit:'1mb'}));


//creats the pool connection to mysql databas
const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database:'photoDatabase'
}).promise();




//fetches image file url from pic.html, and puts the binary into database
app.post('/api',  upload.single('file'),  async(req,res) =>{


    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);
    const fileText = req.body.text;
    //puts the photo into database
    await pool.query('INSERT INTO photos (photoName, photoText, photoData) VALUES ("pic1", ?, ?)', [fileText, fileData]);
   
    //gets the data back, temp code
    
    try{
    const results =  pool.query('SELECT * FROM photos WHERE photoText = ?',[fileText])
    .then(results => {
            if(results && results.length > 0){
                const imageData = results[0][0].photoData.toString('base64')
                const imageUrl = `data:image/jpeg;base64,${imageData}`;
                res.json({
                    url:imageUrl,
                    text:fileText
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



    //gets all the data in database, converts the binary into url form and sends it back
    app.post('/load', (req,res) =>{
        console.log("loading");

        try{
        const results =  pool.query('SELECT * FROM photos')
        .then(results => {
            
                if(results && results.length > 0){

                    const imageData=[];
                    const imageUrl = [];
                    const imageText = [];

                    for(var i = 0; i < results[0].length; i++){
                        imageText[i] = results[0][i].photoText;
                        imageData[i] =  results[0][i].photoData.toString('base64');
                        imageUrl[i]= `data:image/jpeg;base64,${imageData[i]}`;
                        
                    }
                
                    res.json(
                    {
                        url:imageUrl,
                        text:imageText
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

