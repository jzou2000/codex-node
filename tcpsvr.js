const net = require('net');
const express = require('express')


const server = net.createServer()
.on('error', (err)=> {
    console.log('server error: %s', err.toString());
    process.exit(-1);
})
.listen(8600, () => {
    console.log(server.address());
    console.log('server listens on %s', server.address().port);
})
.on('close', () =>{
    console.log('server closed');
    process.exit(0);
})
.on('connection', (client) => {
    // connection listener can be set as createServer() param, too
    console.log('client connected from %s:%s', client.remoteAddress, client.remotePort);

    client.on('end', () => {
        // when FIN is recved, i.e. client sends FIN by calling end()
        console.log('client disconnected');
    })
    .on('close', ()=>{
        console.log('client closed');
    })
    .on('data', (chunk)=>{
        s = chunk.toString();
        if (s == 'shutdown') {
            console.log('shutdown');
            server.close();
        } else {
            console.log('recv [%s]', chunk.toString());
            client.write(chunk.toString().toUpperCase());
        }
    })
    .on('error', (err)=>{
        console.log('client error: %s', err.toString());
        client.destroy();
    })
});


var app = express();
app.get('/', (req, res) => {
    res.send('Hello, world');
});

app.listen(8660, () => {
    console.log('Web server listens at port 8660');
});
