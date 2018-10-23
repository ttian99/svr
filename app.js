const express = require('express')
const app = express()
const config = require('./config/config.json');
const cors = require('cors');

// 跨域问题解决
app.use(cors()); 
// 启用静态文件服务
app.use(express.static(config.staticRoot));
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.httpPort, () => console.log('Example app listening on port 9000!, url: http://127.0.0.1:9000 '))