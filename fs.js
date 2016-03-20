var fs = require("fs");
var cheerio = require("cheerio");
// 加载编码转换模块  
var iconv = require('iconv-lite');

var Finalfile = "G://rawData.txt";
var baseDir = "G://CHUANG";

 fs.readdir(baseDir, function(err, files) {  
        if (err) {  
            console.log('read dir error');  
        } else {  
            files.forEach(function(item) {  
               writeData(baseDir + "/" + item);
            });  
  
        }  
    }); 



function writeData(filename) {
	console.log(filename)
    var stdInfo = {
        stdNum: filename.slice(filename.length - 15 ,filename.length - 4),
        bookInfo: ""
    }
    getBookInfo(filename, function(data) {
        stdInfo.bookInfo = data;
        var RawData = JSON.stringify(stdInfo);
        //console.log("############" + stdInfo.bookInfo)
        fs.appendFile(Finalfile, RawData + "\r\n", function() {

        })
    })


}

 
function getBookInfo(filename, callback) {
 
    fs.readFile(filename, function(err, data) {
        var html = iconv.decode(data, 'utf8');
        // console.log(html)
        var $ = cheerio.load(html);
        var Title = $("a", ".title")
        var Time = $(".loan", ".lendingInfo")
        var Isbn = $("img", "dt")
        console.log(Isbn[0])
        var child = $("span", ".bookInfo") //[0].children;
        var bookInfo = new Array();

        for (var i = 0; i < child.length / 4; i++) {
            var bookItem = {
                    name: "",
                    publisher: "",
                    author: "",
                    time: "",
                    isbn: ""
                }
                //console.log(child[i*4 + 2])
            bookItem["name"] = Title[i].children[0].data.replace(/(\t)|(\s)|(\r)|(\n)/g, "");
            bookItem["author"] = child[i * 4].children[0].data.replace(/(\t)|(\s)|(\r)|(\n)/g, "");
            bookItem["publisher"] = child[i * 4 + 1].children[0].data.replace(/(\t)|(\s)|(\r)|(\n)/g, "");
            bookItem["publisher"] = child[i * 4 + 2].children[0].data.replace(/(\t)|(\s)|(\r)|(\n)/g, "");
            bookItem["time"] = Time[i * 2 + 1].children[1].children[0].data.replace(/(\t)|(\s)|(\r)|(\n)/g, "");
            bookItem["isbn"] = Isbn[i].attribs.isbn.replace(/(\t)|(\s)|(\r)|(\n)/g, "");
            bookInfo.push(bookItem);
        }
        callback(bookInfo);
    })
}


 