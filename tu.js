var request = require("request");
// var superagent = require("superagent");
var cheerio = require("cheerio");
// var eventproxy = require("eventproxy");
var fs = require("fs");
var file = "g://urls.txt";
var allSorts = new Array();
 
var baseUrl = "http://category.dangdang.com/";
 
//图书一级分类名单  地址
var mainSorts = function(callback) {
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

// 去一级分类下的每一页拿到二级分类链接
var secondSorts = function(url,callback){
	var sendSortsUrl = new Array();
	request(baseUrl + url,function(error,response,body){
		 var $ = cheerio.load(body);
		 var SecondSort = $(".max span a");
		 var len = SecondSort.length;
		  for (var i = 0; i < len; i++) {
            sendSortsUrl.push(SecondSort[i].attribs.href);
        }
        callback(sendSortsUrl);


	})

}


var allpages = function(url) {
    request(baseUrl+url, function(error, response, body) {
        var $ = cheerio.load(body);
       // 总页数
         // console.log(url)
        var allPages = $(".page_input span").text();
         console.log( allPages);
        // for (var i = 2; i < allPages; i++) {
        //     main_sorts.push(sorts[i].attribs.href);
        // }
    //      callback(main_sorts);

    })
   

}



var writeUrls = function(urls){
	for(var i=0,len=urls.length;i<len;i++){
	allpages(urls[i]);
		fs.appendFile(file,urls[i] + "\n",function(err){

		});
	}
}
// mainSorts(function(data){
// 	for(var i=0,len=data.length;i<len;i++){

// 		secondSorts(data[i],function(urls){

// 			writeUrls(urls);
// 		});
// 	}
// });
var testPages = "http://category.dangdang.com///cp01.26.24.00.00.00.html#ddclick?act=clickcat&pos=0_0_0_p&cat=01.26.00.00.00.00&key=&qinfo=&pinfo=163661_1_60&minfo=&ninfo=&custid=&permid=&ref=&rcount=&type=&t=1458218365000&sell_run=0&searchapi_version=test_new";
allpages(testPages)