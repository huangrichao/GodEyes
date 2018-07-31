#!/usr/bin/env python  

from socket import *
from time import ctime
import RPi.GPIO as GPIO  
import time  
import signal  
import atexit

def Cycle(times):
    Time = int(time.time()*times%10)
    return Time

atexit.register(GPIO.cleanup)
servopin =  21
GPIO.setmode(GPIO.BCM)  
GPIO.setup(servopin, GPIO.OUT, initial=False)  
p = GPIO.PWM(servopin,50) #50HZ  
p.start(0)  
p.ChangeDutyCycle(7.5) #设置转动角度
time.sleep(0.1)                      #等该20ms周期结束 ,转动时间 
p.ChangeDutyCycle(0)                  #归零信号  
time.sleep(0.02)

host = '' #监听所有的ip
port = 10041#接口必 须一致
bufsize = 102400
addr = (host,port) 

udpServer = socket(AF_INET,SOCK_DGRAM)
udpServer.bind(addr) #开始监听
#data,addr= udpServer.recvfrom(bufsize)  #接收数据和返回地址
    #处理数据
#data = data.decode(encoding="utf-8")  
#udpServer.sendto(data.encode(encoding='utf-8'),addr)
    #发送数据
#data = int(data)
#print(''data)
#if data==0:
    #status = "欢迎光临，按1左30，按2右30，按3左60，按4右60，按5左90，按6右90，按7复位，按8退出"+'0'
    #udpServer.sendto(status.encode(encoding='utf-8'),addr)

while True:
    if Cycle(100)<=8: 
                        #转动间隔
        data,addr= udpServer.recvfrom(bufsize)  #接收数据和返回地址
            #处理数据
        data = data.decode(encoding="utf-8")
            #发送数据
        data = int(data)
        #print('收到指令：',data)
        #curdata.append(data)
        #lastdata.append(data)
        #last+=1
        #deltdata = lastdata[last] - curdata[last]
        if(data==7):
            i = 7.5
        elif(data==1):
            i = 9.2
        elif(data==2):
            i = 5.8
        elif(data==3): #当物体偏左，应当向左转
            i=10.6
        elif(data==4 ):
            i=4.1
        elif(data==5):
            i=12.4
        elif(data==6):
            i=2.6
        p.ChangeDutyCycle(i) #设置转动角度  
        time.sleep(0.5)                      #等该20ms周期结束 ,转动时间 
        p.ChangeDutyCycle(0)                  #归零信号  
        time.sleep(0.02)
        
udpServer.close()



