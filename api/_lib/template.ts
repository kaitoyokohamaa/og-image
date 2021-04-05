import { readFileSync } from "fs";
import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  "base64"
);
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
);

function getCss(fontSize: string) {
  return `
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }
    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }
    body {
        background: white;
        border: solid 30px transparent;
        border-image: url("https://www.infocrest.co.jp/ykxbdgs5qgq3/uploads/2019/10/blog_m02_2.jpg");
        border-image-slice: 1;
        border-image-repeat: stretch;
        height: 90vh;
        display: flex;
        color:black;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    .img{
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
    }
    .id{
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
    }
    .flex{
        margin-top:10px;
        display:flex
    }
    .logo{
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
    }
    code {
        color: #D400FF;
        font-family: 'Vera', 'M PLUS 1p';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }
    code:before, code:after {
        content: '\`';
    }

 
    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }
    .spacer {
      margin-top:10px
    }

    
    .heading {
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: 400;
        color: black;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md, fontSize } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
                </div>
            <div class="flex">
            <div>Cloud Circle</div>
            <div>海斗</div>
            </div>
        </div>
    </body>
</html>`;
}
