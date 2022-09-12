const net = require('net');

const logOut = (...args) => console.log('[client]', ...args)
const logErr = (...args) => console.error('[client]', ...args) 

const socket = net.Socket();
socket.on('connect', () => {
    logOut(`Connection est with '${host}:${port}'!`);
    socket.write('Welcome to my site you guys!');
    logOut('Sent');
    socket.destroy();
}).on('close', () => {
    logOut('whoosh');
});
const host = 'localhost';
const port = 8080;
socket.connect(port, host);