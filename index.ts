import http from "node:http";

const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req, res) => {
  if (req.url==="/test" && req.method==="POST") {
    res.statusCode=200;
    let body="";
    req.on("data",(chunk)=>{
      console.log(chunk.toString())
      body+=chunk.toString();
    }).on("end",()=>{
      res.end("The request text is "+body)
    })
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});