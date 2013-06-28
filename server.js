// builtin
var path = require('path');
var fs = require('fs');

// vendor
var express = require('express');

// local
var router = require('./router');


var base = __dirname;

var app = express();

app.set('views', base + '/views');
app.set('view engine', 'hbs');

app.use(express.favicon());
app.use(express.static(base + '/static'));
app.use(express.logger('dev'));
app.use(app.router);

app.use(function(err, req, res, next) {
    // Sometimes err is a String
    // Someone, somewhere emits strings **cough** browserify **cough**
    if (typeof err === "string") {
        err = new Error(err)
    }

    res.json({
        message: err.message,
        stack: err.stack
     });
});

router(app);

var server = app.listen(process.env.PORT || 8000, function() {
    console.log('listening on port', server.address().port);
});

