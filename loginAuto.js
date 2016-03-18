 var request = require('superagent');
 var cheerio = require("cheerio");
     var logUrl = "http://202.203.222.202/cas/login?service=http://202.203.222.202/myspace/reader/index";
     var spaceURL = "http://202.203.222.202/myspace/reader/index";

 request("http://202.203.222.202/cas/login", function(error, response, body) {

     var $ = cheerio.load(response.text);
     var lt = $("input[name=lt]")[0].attribs.value;
     var data = {
         username: "20141120224",
         password: "41120224",
         lt: lt,
         execution: 'e1s1',
         _eventId: "submit",
         submit: "登录",

     }
     request.post({ url: logUrl, form: data }, function(err, response) {
         // console.log("err: " + err);
         // request.get(spaceURL, function(err, response) {
         //     console.log("err: " + err);
         //     console.log("response: " + response.text.slice(0, 5000));
         // });
     });
 })
