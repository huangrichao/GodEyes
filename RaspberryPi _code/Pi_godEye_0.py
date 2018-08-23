#!/usr/bin/env python  

from socket import *
from time import ctime
import RPi.GPIO as GPIO  
import time  
import signal  
import atexit

num = 0
host = '' #监听所有的ip
port = 13141#接口必 须一致

bufsize = 102400
addr = (host,port) 

udpServer = socket(AF_INET,SOCK_DGRAM)
udpServer.bind(addr) #开始监听
data,addr= udpServer.recvfrom(bufsize)  #接收数据和返回地址
    #处理数据
data = data.decode(encoding="utf-8")  
udpServer.sendto(data.encode(encoding='utf-8'),addr)
    #发送数据

i=7.5

atexit.register(GPIO.cleanup)
servopin = 12
GPIO.setmode(GPIO.BCM)  
GPIO.setup(servopin, GPIO.OUT, initial=False)  
p = GPIO.PWM(servopin,50) #50HZ  
p.start(0)  
p.ChangeDutyCycle(i) #设置转动角度
time.sleep(0.02)                      #等该20ms周期结束 ,转动时间 
p.ChangeDutyCycle(0)                  #归零信号  
time.sleep(0.02)   
#curdata = [240,240]
#cur = 1
#lastdata = [240]
#last = 0

while True:
    while(2<i<12):
                        #转动间隔
        
        data,addr= udpServer.recvfrom(bufsize)  #接收数据和返回地址
        #处理数据
        data = data.decode(encoding="utf-8")  
        #发送数据
        data = int(data)
    #curdata.append(data)
    #lastdata.append(data)
    #last+=1
    #deltdata = lastdata[last] - curdata[last]
        if(data==1000):
        
            i = 7.5
        if(data==900):
            i = i+0.3
        if(data==800):
            i = i-0.3
        if(data<=210): #当物体偏左，应当向左转
            i=i-0.3# 当物体在200到210之间，应当反向旋转消除延迟惯性
            if(data<=200):
                i=i+0.3
            if(data<=80):
                i=i+0.4
        
        elif(data>=290 and data<500):
            i=i+0.3
            if(data>=300):
                i=i-0.3
            if(data>=420):
                i=i-0.4
        else:
            i=i
        if(i<=2):
            i=i+1
            
        elif(i>=12):
            i=i-1
       #print(num,'Position and Duty：{0:>4d}  {1:>.4f}'.format(data,i))
        #data = str(i)
        #udpServer.sendto(data.encode(encoding='utf-8'),addr)
    
        p.ChangeDutyCycle(i) #设置转动角度  
        time.sleep(0.02)                      #等该20ms周期结束 ,转动时间 
        p.ChangeDutyCycle(0)                  #归零信号  
        time.sleep(0.02)
    
udpServer.close()



