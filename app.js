const express = require('express');
const app = express();
const adopt = require('./routes/users');
const connectDB = require('./db/connect');
const port = process.env.PORT || 5000

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/adopt', adopt);
app.use(notFound);
app.use(errorHandlerMiddleware);

//sign in/up
app.get('/', (req,res) => {
    res.send('hello')
})

const serverInit = async () => {
    try{
        await connectDB();
        app.listen(3000, () => console.log(`listening on http:/${port}`))
    }catch(error){
        console.error('Error starting server:', error)
    }   
}
serverInit();