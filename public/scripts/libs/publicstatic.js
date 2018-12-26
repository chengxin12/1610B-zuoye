var MIME={
    '.html':"text/html",
    '.css':"text/css",
    '.js':"text/javascript",
    ".png":"image/png",
}
var fs=require('fs');
var path=require("path");
// 根据请求路径，获取到静态资源，如果找到资源，直接读取返回，找不到就继续找
function getStatic(root) {
    return function (req, res, next) {
        // 主逻辑
        var pathname = path.join(root, req.path); // ./pulic/page/a.css
        if (!fs.existsSync(pathname)) {
            next(req,res);
        } else {
            res.setHeader('content-type',MIME[path.extname(pathname)] || 'text/plain');
            res.end(fs.readFileSync(pathname));
        }
    };
}
// 中间件
var middleWare = [getStatic('./public/data_modules'), getStatic('./public/styles'), getStatic('./public/scripts'), getStatic('./public/images'), getStatic('./public/fonts')];
function run(req, res) {
    // 处理请求
    var index = 0;
    var next = function (req, res) {
        index++;
        if (index < middleWare.length) {
            middleWare[index](req, res, next);
        } else {
            res.statusCode=302;
            res.setHeader('Location','/error.html');
            res.end();
        }
    };
    middleWare[0](req, res, next);
}
module.exports=run;