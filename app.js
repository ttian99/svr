const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express')
const app = express()
const config = require('./config/config.json');
const allCrossDomain = require('./lib/middleware/allowCrossDomain');

// 跨域问题解决
app.use(allCrossDomain);
// 启用静态文件服务
app.use(express.static(config.staticRoot));
app.get('/', (req, res) => res.send('Hello World!'))

// 证书 Certificate
const privateKey = fs.readFileSync('./certificate/private.pem', 'utf8');
const certificate = fs.readFileSync('./certificate/ca.cer', 'utf8');
const svrOpts = {
    key: privateKey,
    cert: certificate
}
// 服务器创建
const httpServer = http.createServer(app);
const httpsServer = https.createServer(svrOpts, app);
httpServer.listen(config.httpPort, () => console.log(`HTTP Server running on port ${config.httpPort}!, url: http://127.0.0.1:${config.httpPort} `))
httpsServer.listen(config.httpsPort, () => console.log(`HTTPS Server running on port ${config.httpsPort}!, url: https://127.0.0.1:${config.httpsPort} `))