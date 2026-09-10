const products = [
    {
        id: 1,
        name: 'Hikvision 4MP IR Bullet Camera',
        category: 'cctv',
        price: 12500,
        image: 'images/cctv.webp',
        desc: 'High-definition 4MP resolution with infrared night vision for 24/7 security.',
        specs: { 'Resolution': '4MP', 'Night Vision': '30m', 'Weatherproof': 'IP67' }
    },
    {
        id: 2,
        name: 'Dahua Smart Dome Camera',
        category: 'cctv',
        price: 18000,
        image: 'images/cctvoffer.jpg',
        desc: '360-degree coverage with AI human detection and auto-tracking.',
        specs: { 'Resolution': '5MP', 'PTZ': 'Yes', 'Zoom': '4x' }
    },
    {
        id: 3,
        name: 'Cisco Business 250 Series Switch',
        category: 'switch',
        price: 45000,
        image: 'images/cisco1.png',
        desc: 'Professional grade 24-port Gigabit switch for reliable business connectivity.',
        specs: { 'Ports': '24 Gigabit', 'Managed': 'Yes', 'PoE': 'Supported' }
    },
    {
        id: 4,
        name: 'D-Link Managed Switch',
        category: 'switch',
        price: 32000,
        image: 'images/dlink.png',
        desc: 'Efficient networking with advanced traffic management and security.',
        specs: { 'Ports': '16 Gigabit', 'L2 Managed': 'Yes', 'Uplink': 'SFP' }
    },
    {
        id: 5,
        name: 'QNAP NAS Storage System',
        category: 'it',
        price: 75000,
        image: 'images/qnap1.png',
        desc: 'Centralized data storage and backup for your business files.',
        specs: { 'Bays': '4-Bay', 'RAID': '0,1,5,10', 'CPU': 'Quad-Core' }
    },
    {
        id: 6,
        name: 'HP ProDesk 600 G6',
        category: 'it',
        price: 85000,
        image: 'images/hp1.png',
        desc: 'Powerful and compact desktop PC designed for business productivity.',
        specs: { 'CPU': 'Intel Core i5', 'RAM': '8GB', 'SSD': '256GB' }
    },
    {
        id: 7,
        name: 'Dell OptiPlex Micro',
        category: 'it',
        price: 92000,
        image: 'images/dell1.png',
        desc: 'Ultra-compact form factor with enterprise-level performance.',
        specs: { 'CPU': 'Intel Core i7', 'RAM': '16GB', 'SSD': '512GB' }
    },
    {
        id: 8,
        name: 'APC Smart-UPS 1500VA',
        category: 'ups',
        price: 55000,
        image: 'images/UPS.webp',
        desc: 'Ensure zero downtime with pure sine wave battery backup.',
        specs: { 'Capacity': '1500VA', 'Topology': 'Line-Interactive', 'Waveform': 'Sine' }
    },
    {
        id: 9,
        name: 'Smart Home Hub Pro',
        category: 'smarthome',
        price: 15000,
        image: 'images/smart-home.png',
        desc: 'Integrate all your smart devices into one easy-to-use interface.',
        specs: { 'Protocol': 'Zigbee/Z-Wave', 'Voice Control': 'Yes', 'App': 'iOS/Android' }
    },
    {
        id: 10,
        name: 'Campus AI Management System',
        category: 'smartcampus',
        price: 250000,
        image: 'images/smart-campus.jpg',
        desc: 'Comprehensive IoT infrastructure for modern educational institutions.',
        specs: { 'Scale': 'Enterprise', 'AI Integration': 'Yes', 'Support': '24/7' }
    },
    {
        id: 11,
        name: 'Samsung 55" 4K UHD Panel',
        category: 'tv',
        price: 65000,
        image: 'images/4.jpg',
        desc: 'Crystal clear 4K display for professional presentations and signage.',
        specs: { 'Resolution': '3840x2160', 'Panel': 'LED', 'HDMI': '3 Ports' }
    },
    {
        id: 12,
        name: 'Sony Professional Audio System',
        category: 'audio',
        price: 42000,
        image: 'images/5.jpg',
        desc: 'High-fidelity sound systems for conference rooms and auditoriums.',
        specs: { 'Output': '500W', 'Wireless': 'Bluetooth', 'Channels': '2.1' }
    }
];
