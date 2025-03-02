import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const { md } = query || {};

  const arr = (pathname || "/").slice(1).split(".");

  let text = "";
  let id = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length > 1) {
    text = arr[0];
    id = arr[1];
  } else {
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: "jpeg",
    text: decodeURIComponent(text),
    md: md === "1" || md === "true",
    id,
  };

  return parsedRequest;
}
