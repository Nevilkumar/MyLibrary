const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index.js');
const authorRouter = require('./routes/author.js');
const bookRouter = require('./routes/books.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mylibrary', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 5000);