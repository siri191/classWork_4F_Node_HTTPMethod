const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Get Method is processed</h1>');
        
        URL: "http://localhost:3000/?username=bhavana&age=21"
        const parsedURL = url.parse(req.url, true);
        const { username, age, branch } = parsedURL.query;
        res.write(<h3>Username: ${username}</h3>);
        res.write(<h3>Age: ${age}</h3>);
        res.write(<h3>Branch: ${branch}</h3>);
        res.end();
    } else if (req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Post Method is processed</h1>');

        let inputs = '';

        req.on('data', (chunk) => {
            inputs += chunk.toString();  // Accumulate chunks into 'inputs'
        });

        req.on('end', () => {
            console.log(inputs);  // Log the raw form data
            const parsedData = querystring.parse(inputs);  // Parse URL-encoded data
            
            // Extracting values from the form data
            const { name, email, password, branch } = parsedData;  // Update with form field names
            res.write(<h3>Full Name: ${name}</h3>);
            res.write(<h3>Email: ${email}</h3>);
            res.write(<h3>Password: ${password}</h3>);  // Be cautious with displaying passwords
            res.write(<h3>Branch: ${branch}</h3>);
            res.end();
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.write('<center>Method not Found</center>');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running @ http://localhost:3000');
});