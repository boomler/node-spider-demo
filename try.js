  var request = require("request");
  var cheerio = require("cheerio");
  var iconv = require("iconv-lite");

  var logUrl = "http://202.203.222.202/cas/login?service=http://202.203.222.202/myspace/reader/index";
  var spaceURL = "http://202.203.222.202/myspace/reader/index";

  request("http://202.203.222.202/cas/login", function(error, response, body) {

      var $ = cheerio.load(body);
      var lt = $("input[name=lt]")[0].attribs.value;
      // var script = $("script")[0].attribs.src;
      // console.log(script);
      var data = {
          username: "20141120226",
          password: "41120226",
          lt: lt,
          execution: 'e1s1',
          _eventId: "submit",
          submit: "登录",

      }



      var headers = response.rawHeaders.toString()
      var start = headers.indexOf("JSESSIONID");
      var setCookie = headers.slice(start, start + 43) + "; checkCookies=1; userNo=v930892";
      // console.log(response.headers["set-cookie"]);
      // console.log(JSON.stringify(response.toJSON())); 
      request({
              url: logUrl, //请求的URL
              method: 'POST', //POST方式请求
              headers: { //请求头的设置
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
              },
              form: data
          },
          function(err, res, body) { //接收回调
              // console.log(err);
              // console.log(res);
              session = res.headers['set-cookie']; //获取set-cookie字段值
              // console.log(res);
              console.log(res.body)
                  // request({
                  //         url: spaceURL, //请求的URL
                  //         method: 'get', //POST方式请求

              //         headers: { //请求头的设置
              //             Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              //             // "Accept-Encoding": "gzip, deflate",
              //              "Content-Type": "text/html;charset=utf-8",
              //             "Accept-Language": "zh-CN,zh;q=0.8",
              //             "Cache-Control": "max-age=0",
              //             // Cookie: setCookie,
              //             "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36",

              //         }
              //     },
              //     function(err,res,body){
              //       // console.log(res.body.toString('UTF8'));
              //       console.log(body);
              //       // console.log(res)

              //     });

          });
  });
