import urllib2
import json
import sys

def post(url, values):
    headers = {'Content-Type': 'application/json'}
    req = urllib2.Request(url, json.dumps(values), headers)
    rsp = urllib2.urlopen(req)
    mytype = sys.getfilesystemencoding()
    return rsp.read().decode('UTF-8').encode(mytype)

def post_pic(projectId, labelNo, pic, url):
    inputfile = open(pic, "rb")
    values = {
        "projectId": projectId,
        "labelNo": labelNo,
        "data": str(inputfile.read()).encode('base64')
    }
    inputfile.close()
    rsp = post(url, values)
    return rsp

print 'uploading...'
print post_pic(1, 1, './QQ.png', 'http://localhost:3000/image/raw')
print 'done.'

