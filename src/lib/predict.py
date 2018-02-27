#!/usr/bin/python

import os
import sys
os.environ['GLOG_minloglevel'] = '2'

import cv2
import caffe
import sys
import copy
import numpy as np
import time

if len(sys.argv) < 4:
  print "usage: ./predict.py {prototxt} {caffemodel} {image}"
  sys.exit()
prototxt_path = sys.argv[1]
caffemodel_path = sys.argv[2]
src_path = sys.argv[3]

img = cv2.imread(src_path, cv2.IMREAD_COLOR)
size = (224, 224)
img = cv2.resize(img, size)
img = img.transpose((2, 0, 1)).reshape((1, 3, 224, 224)).astype(np.float)
img[0, 0] = img[0, 0] - 104
img[0, 1] = img[0, 1] - 117
img[0, 2] = img[0, 2] - 123
caffe.set_mode_cpu()
# caffe.set_device(0)
hero_net = caffe.Net(prototxt_path, caffemodel_path, caffe.TEST)
hero_net.blobs['data'].data[...] = img
hero_net.forward()
pre_vector = copy.deepcopy(hero_net.blobs['prob'].data[0])
pre = int(np.where(pre_vector == pre_vector.max())[0])
print pre
