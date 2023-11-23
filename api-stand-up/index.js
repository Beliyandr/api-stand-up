import http from "node:http";
import fs from "node:fs/promises";

const PORT = 8080;
const COMEDIANS = "./comedians.json";
const CLIENTS = "./clients.json";

const checkFiles = async () => {
  try {
    await fs.access(COMEDIANS);
  } catch (error) {
    console.error(`файл ${COMEDIANS} не найден`);

    return false;
  }

  try {
    await fs.access(CLIENTS);
  } catch (error) {
    await fs.writeFile(CLIENTS, JSON.stringify([]));
    console.log(`файл ${CLIENTS} был создан`);

    return false;
  }

  return true;
};

const sendData = (res, data) => {
  res.writeHead(200, {
    "Content-type": "text/json; charset=utf8",
  });
  res.end(data);
};

const sendError = (res, statusCode, errMessage) => {
  res.writeHead(statusCode, {
    "Content-type": "text/plains; charset=utf8",
  });
  res.end(errMessage);
};

const startServer = async () => {
  if (!(await checkFiles())) {
    return;
  }
  http
    .createServer(async (req, res) => {
      try {
        res.setHeader("Access-Control-Allow-Origin", "*");

        const segments = req.url.split("/").filter(Boolean);

        if (req.method === "GET" && segments[0] === "comedians") {
          const data = await fs.readFile(COMEDIANS, "utf-8");
          // res.writeHead(200, {
          //   "Content-type": "text/json; charset=utf8",
          // });
          if (segments.length === 2) {
            const comedian = JSON.parse(data).find((c) => c.id === segments[1]);

            if (!comedian) {
              sendError(res, 404, "Stand up комик не найден");
            }
            sendData(res, JSON.stringify(comedian));
            return;
          }
          sendData(res, data);
          return;
        }
        if (req.method === "POST" && segments[0] === "clients") {
          // POST // clients
          //Добавление клиента
        }
        if (
          req.method === "GET" &&
          segments[0] === "clients" &&
          segments.length == 2
        ) {
          // GET // clients /:ticket
          // Получение клиента по номеру билета
        }

        if (
          req.method === "PATCH" &&
          segments[0] === "clients" &&
          segments.length == 2
        ) {
          // PATCH / clients /:ticket
          // Обновление  клиента по номеру билета
        }
        sendError(res, 404, "Not found");
      } catch (error) {
        sendError(res, 500, `Ошибка сервера: ${error}`);
      }
    })
    .listen(8080);
  console.log(`Сервер запущен на http://localhost:${PORT}`);
};

startServer();
