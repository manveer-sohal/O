const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql2')
const sharp = require('sharp'); // Import the sharp library
const cors = require('cors');

const app = express();
const port = 3001;

const upload = multer({ storage: multer.memoryStorage() });
app.use(express.json({limit:'1mb'}));


app.get('/check', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
  
    const test = [
        {
            chat: "whats upf",
        },
        {
            chat: "nothing much u?",

        },
        {
            chat: "fuck u",

        }
    ]
    // Send the JSON response
    res.json(test);
});


//creats the pool connection to mysql databas
const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database:'photoDatabase'
}).promise();




//fetches image file url from pic.html, and puts the binary into database
app.post('/api', upload.single('file'), async(req,res) =>{


    const fileData = req.file.buffer;
    const fileText = req.body.text;

   
//compresses image to a lower quality   
    const compressedImageData = await sharp(fileData)
        .resize({ width: 400 }) // Resize the image if necessary
        .jpeg({ quality: 40 }) // Set JPEG quality to 50%
        .toBuffer();

         //inserts the edited photo into the database
         await pool.query('INSERT INTO photos (photoName, photoText, photoData) VALUES ("pic1", ?, ?)', [fileText, compressedImageData]);

        // Convert compressed image data to base64
        const compressedImageBase64 = compressedImageData.toString('base64');

        // Construct the data URL with the compressed image data
        const imageUrl = `data:image/jpeg;base64,${compressedImageBase64}`;
                res.json({
                    url:imageUrl,
                    text:fileText
                }
                    );
            


   
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



//direcotry to react file
const reactPath = path.join(__dirname, 'client', 'build');


app.use(express.static(reactPath));


//opens html to map
app.get('/map', (req,res)=>{
    console.log("maps");
});

//Defines a route for GET requests to the '/pic' endpoint
app.get('/pic', (req,res)=>{
    //send the 'pic.html' file
    res.sendFile(`${publicPath}/pic.html`)
});


// Middleware for handling requests to resources that are not found
app.use((req,res)=>{
        // Set the HTTP status code to 404 (Not Found) and  simple HTML error message
    res.status(404).send('<h1> Error 404: Resource Not Found :(')
});


//rip it
app.listen(port, () => {
  console.log(`App listening  on port ${port}`);
})

