const http = require("http");
const fs = require("fs");

const htmlTemplate = fs.readFileSync("./HTML_Template.html");

http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(htmlTemplate);
        // response.end(" abcde\n");
      });
  })
  .listen(8088);

console.log("server started");
