import godEye
import cv2
import numpy as np
from socket import *
import time

num = '1'
multi = godEye.initial(num)
Window = multi[0]
port = multi[1]
cap = multi[2]
fps = multi[3]

success, frame = cap.read()
color = (255,200,0)
classfier=cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')
host  = '192.168.0.155' # 这是客户端的电脑的ip
bufsize = 1024000  #定义缓冲大小
addr = (host,port) # 元祖形式
udpClient = socket(AF_INET,SOCK_DGRAM)#创建客户端

print("摄像机编号:",num)
count = 0 #初始化计时器
x_str = 0 #全局化str型坐标变量
face = 0 #全局化识别记录变量face
#创建识别文档字典
#data = {}
#flag = 0

while success:
    count +=1
    success, frame = cap.read()
    faceRects = godEye.Process(frame,cap,classfier)
    if(len(faceRects)>0 and godEye.Cycle(10)>5):
        #flag+=1
        #data["Isrecognize"]=flag,'person','found at East of classroom'
        #data['Time'] = time.ctime()
        #TianYan.store(data)
        for faceRect in faceRects[:1]:
            x_str=godEye.Coordinate(faceRect,frame,color)
            x = x_str.encode(encoding="utf-8")
                
            udpClient.sendto(x,addr)
        data_f = godEye.PrintReceive(bufsize,udpClient)
        #print('current Cuty:{0:.1f}'.format(data_f))
        face +=1
        count = 0

    elif(face>0 and godEye.Cycle(10)>5):
        godEye.AutoTurn(count,x_str,addr,udpClient,bufsize)
                
    cv2.imshow(Window, frame)

    if godEye.QuitCheck():
        break
        
cap.release
cv2.destroyWindow(Window)
udpClient.close()
