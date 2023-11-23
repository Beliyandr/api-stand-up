import fs from "node:fs/promises";
import { sendData, sendError } from "./send.js";

export const handleComediansRequest = async (req, res, comedians, segments) => {
  // res.writeHead(200, {
  //   "Content-type": "text/json; charset=utf8",
  // });
  if (segments.length === 2) {
    const comedian = comedians.find((c) => c.id === segments[1]);

    if (!comedian) {
      sendError(res, 404, "Stand up комик не найден");
    }
    sendData(res, comedian);
    return;
  }
  sendData(res, comedians);
};
