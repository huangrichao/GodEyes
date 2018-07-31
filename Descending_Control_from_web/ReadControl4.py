from socket import *
import time
import json

def load():
    with open('C:\\Users\\A\\Desktop\\Aliyun-godEyes\\linkdevelop-webapp-rgblight\\control1.json')as json_file:
        data = json.load(json_file)
        return data

port = 10041
host  = '192.168.0.155' # 这是客户端的电脑的ip
bufsize = 102400  #定义缓冲大小
addr = (host,port) # 元祖形式
udpClient = socket(AF_INET,SOCK_DGRAM)#创建客户端

#data,addr = udpClient.recvfrom(bufsize) #接收数据和返回地址
#data = data.decode(encoding = 'utf-8')
while True:
    send = str(load()['Angle'])
    print('发送指令：',send)
    send = send.encode(encoding = "utf-8")
    udpClient.sendto(send, addr)
    time.sleep(1)
    #data,addr = udpClient.recvfrom(bufsize) #接收数据和返回地址
    #data = data.decode(encoding = 'utf-8')


    
    
