
//拿到每个图书商品的详情页url
var request = require("request");
// var superagent = require("superagent");
var cheerio = require("cheerio");
// var eventproxy = require("eventproxy");
var fs = require("fs");
var file = "g://urls.txt";
var allSorts = new Array();
 
var baseUrl = "http://category.dangdang.com/";

// 读取urls.txt文件   得到每个小类的url

//得到每个小类下的 各页
var allpages = function(callback) {
    request("http://category.dangdang.com/cp01.00.00.00.00.00.html", function(error, response, body) {
        var $ = cheerio.load(body);
        var sorts = $(".sort_box li a");
        var main_sorts = new Array();
        var len = sorts.length;
        for (var i = 0; i < len; i++) {
            main_sorts.push(sorts[i].attribs.href);
        }
         callback(main_sorts);

    })

}
