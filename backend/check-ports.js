const net = require('net');

function checkPort(port, host) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        const timeout = 5000;
        
        socket.setTimeout(timeout);
        socket.once('connect', () => {
            console.log(`Port ${port} is OPEN on ${host}`);
            socket.destroy();
            resolve(true);
        });
        
        socket.once('timeout', () => {
            console.log(`Port ${port} TIMEOUT on ${host}`);
            socket.destroy();
            resolve(false);
        });
        
        socket.once('error', (err) => {
            console.log(`Port ${port} CLOSED on ${host}: ${err.message}`);
            socket.destroy();
            resolve(false);
        });
        
        socket.connect(port, host);
    });
}

async function run() {
    await checkPort(465, 'smtp.gmail.com');
    await checkPort(587, 'smtp.gmail.com');
    await checkPort(25, 'smtp.gmail.com');
}

run();
