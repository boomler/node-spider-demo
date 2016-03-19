 #coding:utf-8
 #!/usr/bin/python 
  
import HTMLParser 
import urlparse 
import urllib 
import urllib2 
import cookielib 
import string 
import re
import sys
import time
reload(sys)
sys.setdefaultencoding('utf-8')

COOKIE_FLAG = True  # true使用这次cookie  false使用上次cookie

hosturl = "http://202.203.222.202/cas/login"
history = "http://202.203.222.202/myspace/reader/book/historyBorrow?pageSize=200&pageNo=1"

cj = cookielib.LWPCookieJar() 
cookie_support = urllib2.HTTPCookieProcessor(cj) 
opener = urllib2.build_opener(cookie_support, urllib2.HTTPHandler) 
urllib2.install_opener(opener) 
#获取 lt
def getHTML(stdNum):
	cookie = cookielib.CookieJar()
	handler=urllib2.HTTPCookieProcessor(cookie)
	opener = urllib2.build_opener(handler)
	response = opener.open(hosturl)
	for item in cookie:
		if item.name == "JSESSIONID":
			jsessionId = item.value

	loginHTML = response.read()
	searchString = 'name="lt" value='
	try:
		index = loginHTML.index(searchString)
	except Exception as err:
		print "err:\t" + err
		return False
	lt = loginHTML[index +17:index +56]
	# print "lt:\t" + lt
	print "JD:   "+jsessionId
	targetPost = 'http://202.203.222.202/cas/login;jsessionid='+ jsessionId + '?service=http%3A%2F%2F202.203.222.202%2Fmyspace%2Freader%2Findex'
	headers = {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:14.0) Gecko/20100101 Firefox/14.0.1', 
			"Host": "202.203.222.202",
			"Origin": "http://202.203.222.202",
			"Referer": "http://202.203.222.202/cas/login?service=http://202.203.222.202/myspace/reader/index",
			"Upgrade-Insecure-Requests": 1,
	      } 
	postData = {
			"username":stdNum,
			"password":stdNum[3:],
			"lt": lt,
			"execution": 'e1s1',
			"_eventId": "submit",
			"submit": "登录",
	      }
	postData = urllib.urlencode(postData)
	request = urllib2.Request(targetPost, postData, headers)
	logResult =  urllib2.urlopen(request).read().decode("utf8")

	if "登录系统" in logResult:
		print "失败啦！"
		return "login failed "
	historyBorrowPage = urllib2.urlopen(history) 
	historyHTML = historyBorrowPage.read().decode('utf8')

	if "登录系统" in historyHTML:
		return False
	else:
		logout = "http://202.203.222.202/myspace/reader/logout"
		logoutYa = urllib2.Request(logout)
		logoutPage = urllib2.urlopen(logoutYa)
		return historyHTML

def writeHTML(stdNum):
	Page = getHTML(stdNum)
	if len(Page)<20:
		print Page
		f=file("G:\\CHUANG\\" + stdNum + ".txt","a+")
		f.write(Page)
		f.close()

for x in xrange(30,128):
	if not (x in [8,15,22]):
		x = str(x)
		if len(x)<3:
			x=x.rjust(3,"0")
			print x
		writeHTML("20131120" + x)

