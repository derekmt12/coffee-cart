var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// app.use('/', index);
app.use('/users', users);

let id = 0;
let orders = {};

var router = express.Router();
router.get('/', function(req, res, next) {
    res.json(Object.keys(orders).map(key => orders[key]));
});
router.get('/:id', function(req, res, next) {
    const id = +req.params.id;
    res.json(orders[id]);
});
router.get('/next/:id', function(req, res, next) {
    const id = +req.params.id;
    const nextId = id + 1;
    res.json(orders[nextId]);
});
app.use('/api/orders', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', client => {
    client.on('order', (order, onComplete) => {
        order.id = id++;
        orders[order.id] = order;
        onComplete(order);

        client.broadcast.emit('orders', orders);
    });

    client.on('order:update', order => {
        orders[order.id] = order;
        client.broadcast.emit(`order:${order.id}`, order);
    });
});
io.listen(8000);
console.log('io listening on port 8000');

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
