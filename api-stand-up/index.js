import http from "node:http";
import fs from "node:fs/promises";
// const https = require("node:http");
const PORT = 8080;




http
  .createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/comedians") {
      try {
        const data = await fs.readFile("comedians.json", "utf-8");
        res.writeHead(200, {
          "Content-type": "text/json; charset=utf8",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(data);
      } catch (error) {
        res.writeHead(500, { "Content-type": "text/plains; charset=utf8" });
        res.end(`Ошибка сервера: ${error}`);
      }
    } else {
      res.writeHead(404, { "Content-type": "text/plains; charset=utf8" });
      res.end("Not found");
    }
  })
  .listen(8080);

console.log(`Сервер запущен на http://localhost:${PORT}`);
