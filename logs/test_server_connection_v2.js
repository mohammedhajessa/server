const io = require('socket.io-client');

const SERVER_URL = 'http://192.168.1.101:9400';

console.log('Testing connection to server with Socket.IO v2.x:', SERVER_URL);

const socket = io(SERVER_URL, {
    transports: ['websocket', 'polling'],
    timeout: 10000,
    forceNew: true
});

socket.on('connect', () => {
    console.log('✅ Connected to server successfully!');
    console.log('Socket ID:', socket.id);
    
    // Send test client info like the Android app would
    const clientInfo = {
        id: 'test_android_client_' + Date.now(),
        model: 'Test Device',
        manf: 'Test Manufacturer', 
        release: 'Android 10'
    };
    
    socket.emit('register', clientInfo);
    console.log('📤 Sent client info:', clientInfo);
});

socket.on('welcome', () => {
    console.log('👋 Received welcome from server');
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.log('❌ Connection error:', error.message);
});

// Test location data
setTimeout(() => {
    if (socket.connected) {
        const locationData = {
            latitude: 40.7128,
            longitude: -74.0060,
            altitude: 10.5,
            accuracy: 5.0,
            speed: 0.0,
            enabled: true
        };
        
        socket.emit('0xLO', locationData);
        console.log('📍 Sent test location data:', locationData);
    }
}, 2000);

// Close connection after 10 seconds
setTimeout(() => {
    console.log('🔌 Closing connection...');
    socket.close();
    process.exit(0);
}, 10000);
