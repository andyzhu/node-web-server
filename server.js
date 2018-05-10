const express2 = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express2();
var port = process.env.PORT || 3000

hbs.registerPartials(__dirname + '/Partials');

app.set('view engine','hbs');


app.use ((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    fs.appendFile ('server.log', log + '\n', (err) => {
        if (err)
        {
            console.log ('cannot append to the server log');
        }
    });
    console.log (log);

    next();
});

app.use ((req,res,next) => {
    res.render('maintenance.hbs');
});

app.use(express2.static(__dirname = '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req,res) => {
    res.render('index.hbs',{
        pageTitle: 'Home Page',
        Person: {
            Name: 'Andy',
                Hobbies: [
                     'reading',
                     'movie watch'
                 ]
        }
    })
    // res.send({
    //     Name: 'Andy',
    //     Hobbies: [
    //         'reading',
    //         'movie watch'
    //     ]
    // });
});

app.get ('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page'        
    });

});

app.get ('/bad', (req,res) => {
    res.send({
        errorMessage: 'Somethign went wrong'
    });
});


app.listen (port, () => {
    console.log (`server is up on port ${port}`);
});