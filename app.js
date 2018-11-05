const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express()
const config = require('./config/config.json');
const allCrossDomain = require('./lib/middleware/allowCrossDomain');
var favicon = require('serve-favicon');
var compression = require('compression');

// 关卡数据
const star_mission_data = require('./public/star-mission-data.json');
// https证书
const privateKey = fs.readFileSync(path.join(__dirname, config.key), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, config.cer), 'utf8');
const svrOpts = {
    key: privateKey,
    cert: certificate
}
// 启动服务器
const httpServer = http.createServer(app);
const httpsServer = https.createServer(svrOpts, app);
httpServer.listen(config.httpPort, () => console.log(`HTTP Server running on port ${config.httpPort}!`))
httpsServer.listen(config.httpsPort, () => console.log(`HTTPS Server running on port ${config.httpsPort}!`))

/** 中间件 */
app.use(allCrossDomain); // 允许跨域访问
app.use(favicon('res/favicon.ico')); 
app.use(compression()); // 开启Gzip压缩
app.use(function (req, res, next) {  // 记录请求时间
    const start = req.query.startTime;
    const end = new Date().getTime() / 1000;
    const del = (end - start).toFixed(2);
    console.log(`${req.protocol} : ${req.url} | endTime=${end} | delTime=${del}`);
    next();
});

// 测试路径
app.get('/test', (req, res) => res.send('恭喜你，找到了后门！'));
// 关卡数据请求地址
app.get('/star-mission-data.json', (req, res) => {
    res.send(JSON.stringify(star_mission_data));
})
