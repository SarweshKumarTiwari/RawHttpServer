import http from "node:http";

const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req, res) => {
  if (req.url==="/test" && req.method==="POST") {
    res.statusCode=200;
    let body="";
    req.on("data",(chunk)=>{
      body+=chunk.toString();
    }).on("end",()=>{
      res.emit("done")
    });
    res.on("done",()=>{
      res.end("the given data is "+body)
    })
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});