const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5050; // Port number to listen on

http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'index.html');

    // Read the file asynchronously
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404);
                res.end('File not found!');
            } else {
                // Other server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // File found, serve content
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
