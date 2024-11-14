const express = require('express');
const app = express();
const adopt = require('./routes/users');
const connectDB = require('./db/connect');
const port = process.env.PORT || 5000
const path = require('path')
const {newUser, users} = require('./controllers/adopt')
const User = require('./models/User')
const Pet = require('./models/Pet')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
const cloudinary = require('cloudinary').v2;

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { console } = require('inspector');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.set('view engine', 'ejs');
app.set('views', './views')

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/adopt', adopt);

//sign in/up
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/sign_in.html'))
})

app.get('/signup', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/sign_up.html'))
})

app.get('/pets', async (req, res) => {
    const pets = await Pet.find({}).lean()
    res.render('pets', { pets: pets })
})

app.get('/pets/new', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/newPet.html'))
})

app.get('/pet/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    res.render('animal', { pet })
})

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/index', async (req, res) => {
    res.render('index');
});

app.use(notFound);





const serverInit = async () => {
    try{
        await connectDB();
        app.listen(3000, () => console.log(`listening on http://localhost:${port}`))
    }catch(error){
        console.error('Error starting server:', error)
    }   
}
serverInit();