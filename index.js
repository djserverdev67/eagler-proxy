const http = require('http');
const httpProxy = require('http-proxy');

// Update TARGET_PORT to match your assigned Falix port from Network/Ports
const TARGET_IP = 'djserver.falixsrv.me';
const TARGET_PORT = 28919; 

const proxy = httpProxy.createProxyServer({
  target: `http://${TARGET_IP}:${TARGET_PORT}`,
  ws: true
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Eaglercraft Proxy Active!');
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Proxy active on port ${PORT}`);
});
