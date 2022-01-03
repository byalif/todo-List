const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const url = "mongodb+srv://byalif:Cunyfirst2022@cluster0.pfou5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dataBase = require('./models/todo')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs');
app.use(bodyParser.json())
const ejs = require('ejs');

app.set('json spaces', 2);
app.use('/', express.static(path.join(__dirname, 'public')));

const con = mongoose.connection

con.on('open', () => {
    console.log('http://localhost:3000');
})



mongoose.connect(url, {
        useNewUrlParser: true
    })
    .then((client) => {
        console.log("connected to db");
    })
    .catch((error) => console.log(error))


app.post('/', (req, res) => {
    const post = new dataBase({
        todo: req.body.todoVal,
    })
    post.save()
        .then((result) => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/list', (req, res) => {
    dataBase.find({}).exec((err, docs) => {
        if (err) {
            res.send('oops')
        } else {
            res.json(docs);
        }

    })
});



app.get('/', (req, res) => {
    dataBase.find({}, (err, f) => {
        res.render('list', {
            toDo: f
        });
    })
});




app.post('/delete', (req, res) => {
    dataBase.findByIdAndDelete({
        _id: req.body.checkbox
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Succesfully deleted');
            res.redirect('/')
        }
    })
});


app.post('/update/:id', (req, res) => {

    dataBase.updateOne({
        _id: req.params.id
    }, {
        $set: {
            todo: req.body.text,
            _id: req.params.id
        },
    }, function(err, obj) {
        if (!err) {
            console.log(req.body.text)
            res.redirect('/')
        } else {
            console.log(err)
            res.redirect('/')
        }
    });


})


app.listen(3000, () => {
    console.log('Server is up and running');
})