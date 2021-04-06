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

function getCss() {
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
        border: solid 40px transparent;
        border-image: url("https://www.infocrest.co.jp/ykxbdgs5qgq3/uploads/2019/10/blog_m02_2.jpg");
        border-image-slice: 1;
        border-image-repeat: stretch;
        height: 90vh;
        color:black;
        margin:0px
    }
    .img{
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
    }
    .name{
        font-size:60px;
        font-weight: bold;
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
        margin-right:50px
        padding:50px
    }
    .flex{
        margin-top:350px;
        display:flex;
        padding:50px
    }
    .logo{
        font-size:60px;
        font-weight: bold;
        color:orange;
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
        margin-right: auto;
        margin-left:50px
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

    
    .heading {
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
        font-size: 125px;
        font-style: normal;
        font-weight: bold;
        color: black;
        padding:50px;
        margin-left:20px
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div>
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
            <div class="flex">
                <div class="logo">Cloud Circle</div>
                <div class="name">海斗</div>
            </div>
        </div>
    </body>
</html>`;
}
