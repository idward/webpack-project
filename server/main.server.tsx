import fs from "fs";
import path from "path";
import express, { Request, Response, Express } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/components/App";

const app: Express = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get("*", (req: Request, res: Response) => {
  const indexHtml = fs.readFileSync(
    path.resolve(__dirname, "../dist/page1.html"),
    { encoding: "utf-8" }
  );

  const content = renderToString(<App />);
  // const content = renderToString(<div>Hello</div>);

  const finalHtml = indexHtml.replace(
    '<div id="app"></div>',
    `<div id="app">${content}</div>`
  );

  res.send(finalHtml);
});

app.listen("8080", () => {
  console.log("Server is listening on port 8080");
});
