  var request = require("request");
  var cheerio = require("cheerio");
  var iconv = require("iconv-lite");


  var bookhistory = "http://202.203.222.202/myspace/reader/book/historyBorrow?pageSize=200&pageNo=1"

  request("http://202.203.222.202/cas/login", function(error, response, body) {

      var $ = cheerio.load(body);
      var lt = $("input[name=lt]")[0].attribs.value;
      var script = $("script")[0].attribs.src;
      var SessionCode = script.slice(script.length - 32, script.length);
      var data = {
          username: "20131120221",
          password: "31120221",
          lt: lt,
          execution: 'e1s1',
          _eventId: "submit",
          submit: "登录",

      }

      var targetPost = 'http://202.203.222.202/cas/login;jsessionid=' + SessionCode + '?service=http%3A%2F%2F202.203.222.202%2Fmyspace%2Freader%2Findex';


      var headers = response.rawHeaders.toString()
      var start = headers.indexOf("JSESSIONID");
      var setCookie = headers.slice(start, start + 43) + "; checkCookies=1; userNo=v930892";
      var historyCookie = headers.slice(start, start + 43);
      console.log(historyCookie)
      request({
              url: targetPost,
              method: 'POST',
              headers: {
                  Host: "202.203.222.202",
                  Origin: "http://202.203.222.202",
                  Referer: "http://202.203.222.202/cas/login?service=http://202.203.222.202/myspace/reader/index",

                  "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36",
              },
              form: data
          },
          function(err, res, body) { //接收回调
              // console.log(body)
              request({
                      url: bookhistory,
                      method: 'get',
                      headers: {
                          Host: "202.203.222.202",
                          Origin: "http://202.203.222.202",
                          Referer: "http://202.203.222.202/cas/login?service=http://202.203.222.202/myspace/reader/index",
                          "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36",
                      },
                      form: data
                  },
                  function(err, res, body) { //接收回调
                      console.log(body)


                  });

          });



  });
