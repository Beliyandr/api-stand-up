export const sendData = (res, data) => {
  res.writeHead(200, {
    "Content-type": "text/json; charset=utf8",
  });
  res.end(JSON.stringify(data));
};

export const sendError = (res, statusCode, errMessage) => {
  res.writeHead(statusCode, {
    "Content-type": "text/plains; charset=utf8",
  });
  res.end(errMessage);
};
