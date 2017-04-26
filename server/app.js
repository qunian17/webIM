var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
app.all('/', (req, res, next) => {
    console.log( req.query );
     console.log( req.url );
    next();
});
app.get('/', function (req, res) {
    let path = __dirname + '/view/index.html';
    // console.log(path);
    res.sendFile(path);

});
app.get('*', function (req, res) {
    // res.render('/view/404.html', {
    //     title: 'No Found'
    // })
    res.status(404).send('找不到网页!');
});
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        // console.log(data);
    });
});