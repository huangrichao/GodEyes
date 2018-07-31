#!/usr/bin/env python

import os
import time

def Cycle(times):
    Time = int(time.time()*times%10)
    return Time
if Cycle(100)<=2:    
    os.system('python /home/pi/Desktop/sg90Linkdevelop1.py')
elif Cycle(100)<=4:
    os.system('python /home/pi/Desktop/sg90Linkdevelop2.py')
elif Cycle(100)<=6:
    os.system('python /home/pi/Desktop/sg90Linkdevelop3.py')
elif Cycle(100)<=8:
    os.system('python /home/pi/Desktop/sg90Linkdevelop4.py')
