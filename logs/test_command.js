const io = require('socket.io-client');

// Connect to server
const socket = io('http://192.168.1.101:9400');

socket.on('connect', () => {
    console.log('Connected to server');
    
    // Wait a bit then send a test command
    setTimeout(() => {
        console.log('Sending test command...');
        
        // Get the first connected client
        socket.emit('get_clients', (clients) => {
            console.log('Available clients:', clients);
            
            if (clients && clients.length > 0) {
                const clientId = clients[0].clientID;
                console.log('Sending command to client:', clientId);
                
                // Send a simple location command
                socket.emit('send_command', {
                    clientID: clientId,
                    command: {
                        type: '0xLO', // Location command
                        uid: 'test_' + Date.now()
                    }
                });
            }
        });
    }, 2000);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

// Keep alive
setInterval(() => {
    if (socket.connected) {
        console.log('Connection alive');
    }
}, 5000);
