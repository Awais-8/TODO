const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = {
    name: String
};

const Item = mongoose.model('Item', itemsSchema);

app.get('/', (req, res) => {
    Item.find({}, (err, foundItems) => {
        res.render('index', { items: foundItems });
    });
});

app.post('/', (req, res) => {
    const itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    });

    item.save();
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, (err) => {
        if (!err) {
            console.log('Item deleted');
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});