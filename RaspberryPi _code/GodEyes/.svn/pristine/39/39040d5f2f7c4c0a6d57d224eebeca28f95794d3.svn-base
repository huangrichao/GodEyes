#encoding = utf-8
import cv2
import numpy as np
from socket import *
import time
import json


def hello():
    '''作者黄日超。初始化，取str型坐标，接收当前占空比i，追踪算法()'''

def store(data):
    with open('识别记录.json', 'a') as json_file:
        json_file.write(json.dumps(data))
        line = '\n'
        json_file.write(line)
def load():
    with open('识别记录.json') as json_file:
        data = json.load(json_file)
        return data
def Initial(num):
    Window = "tianyan_"+num
    port = 13141 + int(num)*1000
    cap=cv2.VideoCapture(int(num)) #num号本地摄像机
    cap.set(3,640) #设置分辨率
    cap.set(4,480)
    fps =cap.get(cv2.CAP_PROP_FPS) #获取视频帧数
    return (Window,port,cap,fps)

def Cycle(times):
    Time = time.time()*100%10
    Time = int(Time)
    return Time%times
def Process(frame,cap,classfier):
    size=frame.shape[:2]
    image=np.zeros(size,dtype=np.float16)
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    cv2.equalizeHist(image, image)
    divisor=8
    h, w = size
    minSize =(w//divisor, h//divisor)
    faceRects = classfier.detectMultiScale(image, 1.2, 2,cv2.CASCADE_SCALE_IMAGE,minSize)
    return faceRects
def Coordinate(faceRect,frame,color):
    x, y, w, h = faceRect
    cv2.rectangle(frame, (x, y), (x+w, y+h), color,3)   
    x=str(x)
    #print("current x:",x)
    return x
def PrintReceive(bufsize,udpClient):
    data,addr = udpClient.recvfrom(bufsize) #接收数据和返回地址
    data = data.decode(encoding = 'utf-8')
    data  =float(data)
    return data
def TurnLandR(tab,addr,udpClient,bufsize): #tab是标号，800表示左转，900表示右转
    x =str(tab)
    x = x.encode(encoding="utf-8")
    print("code to right:",x)
    udpClient.sendto(x,addr)
    data = PrintReceive(bufsize,udpClient)
    print('current Cuty:{0:.1f}'.format(data))
def TurnBack(udpClient,addr):
    x =str(1000)0
    x = x.encode(encoding="utf-8")
    print("ReturnBack:",x)
    udpClient.sendto(x,addr)
    data = PrintReceive(bufsize)
    #print('current Cuty:{0:.1f}'.format(data))
def QuitCheck():
    key=cv2.waitKey(10)
    c = chr(key & 255)
    if c in ['q', 'Q', chr(27)]:
        return True
def AutoTurn(count,x_str,addr,udpClient,bufsize):
    x_int = int(x_str)
    if(count>30 and count<60):
        if(x_int>240):
            TurnLandR(800,addr,udpClient,bufsize)
        
        if(x_int<240):
            TurnLandR(900,addr,udpClient,bufsize)
    if(count>=120):#3秒复位
        TurnBack(udpClient,addr)

