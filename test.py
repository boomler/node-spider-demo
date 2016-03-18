 #coding:utf-8
 #!/usr/bin/python 
  
import HTMLParser 
import urlparse 
import urllib 
import urllib2 
import cookielib 
import string 
import re 
hosturl = "http://202.203.222.202/cas/login"
history = "http://202.203.222.202/myspace/reader/book/historyBorrow?pageSize=200&pageNo=1"
cj = cookielib.LWPCookieJar() 
cookie_support = urllib2.HTTPCookieProcessor(cj) 
opener = urllib2.build_opener(cookie_support, urllib2.HTTPHandler) 
urllib2.install_opener(opener) 
h = urllib2.urlopen(hosturl)
#获取 lt
request = urllib2.urlopen(hosturl)
loginHTML = request.read()
searchString = 'name="lt" value='
index = loginHTML.index(searchString)
lt = loginHTML[index +17:index +56]
headers = {
		'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:14.0) Gecko/20100101 Firefox/14.0.1', 
		"Host": "202.203.222.202",
		"Origin": "http://202.203.222.202",
		"Referer": "http://202.203.222.202/cas/login?service=http://202.203.222.202/myspace/reader/index",
		"Upgrade-Insecure-Requests": 1,
      } 
postData = {
      "username": "20141120226",
          "password": "41120226",
          "lt": lt,
          "execution": 'e1s1',
          "_eventId": "submit",
          "submit": "登录",
      } 
postData = urllib.urlencode(postData)
request = urllib2.Request(hosturl, postData, headers) 
response = urllib2.urlopen(request) 
text = response.read() 
print text