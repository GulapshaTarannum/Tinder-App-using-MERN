import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './dbCards.js';

//app config
const app = express();
const port = process.env.PORT || 7000;

dotenv.config();
const x = process.env.X;
const y = process.env.Y;

const connection_url = `mongodb+srv://${x}:${y}@tinder.unfpns1.mongodb.net/tinderdb?retryWrites=true&w=majority`;


//middleware
app.use(express.json());
app.use(Cors());



//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//API Endpoints
app.get('/', (req, res) => res.status(200).send("hello world"));
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })

});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})


//Listener
app.listen(port, () =>
    console.log(`server is running on port ${port}`)
);