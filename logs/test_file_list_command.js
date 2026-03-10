const io = require('socket.io-client');

const SERVER_URL = 'http://192.168.1.101:9400';

console.log('🔌 Connecting to server...');

const socket = io(SERVER_URL, {
    transports: ['polling', 'websocket']
});

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Send file list command
    console.log('📤 Sending file list command...');
    socket.emit('send_command', {
        clientID: 'android_1758309836329_rl5633k45', // Replace with actual client ID
        command: {
            type: '0xFI',
            action: 'ls'
        }
    });
    
    console.log('✅ File list command sent successfully');
    
    // Wait a bit for response
    setTimeout(() => {
        console.log('⏰ Test completed');
        process.exit(0);
    }, 10000);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.log('❌ Connection error:', error.message);
    process.exit(1);
});

// Listen for file responses
socket.on('0xFI', (data) => {
    console.log('📁 File data received:');
    console.log('Type:', data.type);
    console.log('Count:', data.count);
    console.log('Status:', data.status);
    if (data.list && data.list.length > 0) {
        console.log('Files:');
        data.list.slice(0, 5).forEach((file, index) => {
            console.log(`  ${index + 1}. ${file.name} (${file.sizeFormatted}) - ${file.type}`);
        });
        if (data.list.length > 5) {
            console.log(`  ... and ${data.list.length - 5} more files`);
        }
    }
});
