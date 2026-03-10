const io = require('socket.io-client');

const SERVER_URL = 'http://192.168.1.101:9400';

console.log('🔌 Connecting to server...');

const socket = io(SERVER_URL, {
    transports: ['polling', 'websocket']
});

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Send notification command
    console.log('📤 Sending notification command...');
    socket.emit('send_command', {
        clientID: 'android_1758309836329_rl5633k45', // Replace with actual client ID
        command: {
            type: '0xNO',
            action: 'ls'
        }
    });
    
    console.log('✅ Notification command sent successfully');
    
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

// Listen for notification responses
socket.on('0xNO', (data) => {
    console.log('🔔 Notification response received:');
    console.log('Type:', data.type || 'notification');
    console.log('Count:', data.count);
    console.log('Status:', data.status);
    
    if (data.notifications && data.notifications.length > 0) {
        console.log('📱 Notifications:');
        data.notifications.forEach((notification, index) => {
            console.log(`  ${index + 1}. ${notification.appName || notification.packageName}`);
            console.log(`     Title: ${notification.title}`);
            console.log(`     Text: ${notification.text}`);
            console.log(`     Time: ${notification.postTimeFormatted}`);
            console.log(`     Important: ${notification.isImportant ? 'Yes' : 'No'}`);
            console.log('');
        });
    } else {
        console.log('No notifications found');
    }
});
