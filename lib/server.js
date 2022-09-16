import chalk from 'chalk';
import { get } from 'http';
 import net from 'net';
 
 const logOut = (...args) => {
   // Don't log in tests because Jest doesn't like that and will fail your tests.
   if(process.env['NODE_ENV'] !== 'test') {
     console.log(chalk.cyan('[server]'), ...args);
   }
 }
 const logErr = (...args) => {
   // Don't log in tests because Jest doesn't like that and will fail your tests.
   if(process.env['NODE_ENV'] !== 'test') {
     console.error(chalk.cyan('[server]'), ...args);
   }
 }
 export const serve = (host, port) => {
   const server = net.createServer((socket) => {
     logOut(`Got a connection!`);
     socket.on('data', (data) => {
        const dataString = data.toString()
       logOut('Got data', data.toString());
       const lines = dataString.split('/n')
       const startline = lines[0];
       const [ method, path ] = startline.split(' ');
       if(method == 'GET' && path == '/') {
        const body = `<html>
        <main>
           <h1> Hi! Im Amanda! </h1>
           <article>
           <h2>Im a Computer Engineer</h2>
           <p> I have lots of pets!</p>
           </article>
        </main>
        </html>`;
        socket.write(`HTTP/1.1 200 Ok
Content-Length: ${body.length}

${body}`)
    }  else if(method == 'GET' && path == '/posts') {
        const object = {
            name: 'Amanda',
            location: 'Colorado',
        }
        socket.write(`HTTP/1.1 200 Ok
Content-Length: ${JSON.stringify(object).length}
Content-Type: application/json

${JSON.stringify(object)}`)
    } else if(method == 'POST' && path == '/mail') {
        socket.write(`HTTP/1.1 204 not found
Content-Length: 0
Content-Type: application/json

`)
    } else {
        const nope = `<html><h2>NO ACCESS</h2></html>`
        socket.write(`HTTP/1.1 404 NO ACCESS
Content-Length: ${nope.length}
Accept: application/json, text/html

${nope}
`)
    }
    
     });
     socket.on('error', (err) => {
       logErr('Error with socket', err);
     });
     socket.on('close', () => {
       logOut('Connection was dropped.');
     });
   });
   server.listen(port, host, () => {
     logOut(`Established server on ${host}:${port}!`);
   });
   logOut(`Listening to ${host}:${port}...`)
   return server;
 }