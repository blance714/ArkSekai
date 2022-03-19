const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let data;
  try {
    data = fs.readFileSync('.' + (req.url == '/' ? '/index.html' : req.url));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(data);
  } catch(e) {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(5500, () => {
  console.log(`在 localhost:5500 跑起来啦！`);
});