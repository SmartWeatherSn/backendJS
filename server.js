const { createServer } = require('http');
const app = require('./app');
const config = require('./src/utilities/config/env.config')
const jwt = require('jsonwebtoken');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const server = createServer(app);

const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETEs'],
        credentials: true
    }
});

io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      socket.userId = payload.userId;
      next();
    } catch (err) {}
  });

io.on('connection', socket => {

    console.log("Connected: " + socket.userId);
    /* console.log(socket); */
    socket.on('disconnect', () => {
        console.log("Disconnected: " + socket.userId);
    });

    socket.on("joinRoom", ({
        roomId
    }) => {
        socket.join(roomId);
        console.log("A user joined chatroom: " + roomId);
    });

    socket.on("leaveRoom", ({
        roomId
    }) => {
        socket.leave(roomId);
        console.log("A user left chatroom: " + roomId);
    });
});

app.set("io", io);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);