import http,{IncomingMessage} from "node:http";

const hostname = 'localhost';
const port = 3000;
class Route{
  private method='';
  private path='';
  constructor(res:IncomingMessage){
    if (res.method) {
      this.method=res.method
    }
    if (res.url) {
      this.path=res.url
    }
  }
  post(path:string,cb:()=>void){
    if (this.path!==path||this.method!=="POST") {
      throw new Error("path or method is incorrect")
    }
    cb();
  }
}
const server = http.createServer((req, res) => {
  const route=new Route(req);
  route.post("/test",()=>{
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
  })

});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});