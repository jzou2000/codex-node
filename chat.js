//process.stdin.setEncoding('utf8');

const net = require('net');
const client = net.createConnection(
    {host: 'localhost', port: 8600},
    ()=>{
        addr = client.address();
        console.log('connected to server! my address %s:%s',
            addr.address, addr.port);
        process.stdin.on('data', (data)=>{
            var s = data.toString().trim()
            if (s == 'exit') {
                client.end('client is leaving');
            } else if (s == 'shutdown') {
                client.end('shutdown');
            } else {
                client.write(s);
            }
        });
        client.write('hello!');
    });


client.on('data', (data) => {
    console.log('recv [%s]', data.toString());
})
.on('end', () => {
    // FIN recved, no more data from the peer
    console.log('disconnected');
})
.on('close', () => {
    console.log('closed');
    process.exit();
})
.on('error', (err) => {
    console.log(err);
});

