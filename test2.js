var http = require('http'),
    querystring = require('querystring');
// 这就是post发送的数据
var request = require("request");
var cheerio = require("cheerio");
var iconv = require("iconv-lite");

var logUrl = "http://202.203.222.202/cas/login?service=http://202.203.222.202/myspace/reader/index";
var spaceURL = "http://202.203.222.202/myspace/reader/book/historyBorrow?pageSize=300&pageNo=1";

request("http://202.203.222.202/cas/login", function(error, response, body) {

    var $ = cheerio.load(body);
    var lt = $("input[name=lt]")[0].attribs.value;
    // var script = $("script")[0].attribs.src;
    // console.log(script);
    var contents = querystring.stringify({
        username: "20141120226",
        password: "41120226",
        lt: lt,
        execution: 'e1s1',
        _eventId: "submit",
        submit: "登录",

    });

    // var contents = querystring.stringify({
    //     uid: "XXXX",
    //     pwd: "XXXX"
    // });
    // 通过querystring.stringify处理过的数据基本就是这个格式:
    // uid=XXXX&pwd=XXXX 很熟悉对吧...
    // 创建http请求的配置参数, 下面的请求地址都是我自己YY的, 基本都是这个格式
    var options = {
        host: '202.203.222.202', // 这个不用说了, 请求地址
        path: '/cas/login', // 具体路径, 必须以'/'开头, 是相对于host而言的
        method: 'post', // 请求方式, 这里以post为例
        headers: { // 必选信息, 如果不知道哪些信息是必须的, 建议用抓包工具看一下, 都写上也无妨...
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.8",
            "Cache-Control": "max-age=0",
            Connection: "keep-alive",
            // "Content-Length": 138,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            Host: "202.203.222.202",
            Origin: "http://202.203.222.202",
            Referer: "http://202.203.222.202/cas/login?service=http://202.203.222.202/myspace/reader/index",
            "Upgrade-Insecure-Requests": 1,
            "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36",
            // "Cookie":"some cookie message"
        }
    };
    // 接下来就是创建http请求
    var req = http.request(options, function(res) {
        res.setEncoding("utf8"); // 设置编码, 如果目标网址的编码是gbk/gbk2312神码的, 就别设置了, 下面就专门讲解
        var result = "",
            resData = "",
            headers = res.headers, // 像上面所说的, 获取响应的头信息
            cookies = headers["set-cookie"]; // 获得服务器返回的cookie信息, 以后某些功能或许会需要将这些信息一起发送, 因此最好保存下来
        cookies.forEach(function(cookie) {
            result += cookie.replace(/path=\//g, '');
        });
        // 比如把cookie写入文件等, 具体怎么写我就不讲啦...
        // 数据很多的情况下, 并非一次发送完毕. 因此需要记录下整个过程中发送的数据
        res.on("data", function(data) {
            resData += data;
        });
        // 在数据发送完毕后触发
        res.on("end", function() {
                    request(spaceURL, //请求的URL
                  function(err,res,body){
                    // console.log(res.body.toString('UTF8'));
                    console.log(body);
                    // console.log(res)

                  });



        });
    });
    req.write(contents); // xhr.send(). 感觉跟这个差不多
    req.end(); // 这个必须有, 不然就一直等待结束
});
