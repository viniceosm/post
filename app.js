const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const PORT = 3000;

server.listen(PORT, function() {
	console.log(`Server rodando na porta ${PORT}!`);
});

app.set('view engine', 'ejs');
app.set('views', './views');
// app.set('view options', { layout: false });
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.use('/js', express.static(__dirname + '/public/js'));
// app.use('/js', express.static(__dirname + '/bower_components'));
// app.use('/css', express.static(__dirname + '/public/css'));
// app.use('/font', express.static(__dirname + '/public/font'));
// app.use('/img', express.static(__dirname + '/public/img'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routesIndex = require('./routes/index');
// const produtosRouter = require('./routes/produtos');

app.use('/', routesIndex.router);
// app.use('/produtos', produtosRouter);
app.get('*', function (req, res) {
	res.render('notFound');
});

// Middleware para o socket ter o request
/*io.use(function (socket, next) {
	routesIndex.sessionMiddleware(socket.request, socket.request.res, next);
});

io.sockets.on('connection', function (socket) {
});*/

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
	  error: {
		message: error.message
	  }
	});
});

// require('./socket')(io);
