const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // 定期檢查客戶端是否還活躍
    const interval = setInterval(() => {
        const currentTime = new Date().toISOString(); // 獲取當前的ISO時間
        if (ws.isAlive === false) {
            console.log('Terminating dead connection:', currentTime);
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping(() => {});
        console.log('Checked client at:', currentTime);
        ws.send(`Checked at: ${currentTime}`); // 向客戶端發送檢查的時間
    }, 3000);

    ws.on('pong', () => {
        ws.isAlive = true;
    });

    // 確保清除定時器
    ws.on('close', () => {
        clearInterval(interval);
    });
});

server.listen(4000, () => {
    console.log('Server is listening on port 4000');
});