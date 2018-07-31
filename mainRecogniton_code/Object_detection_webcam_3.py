######## Webcam Object Detection Using Tensorflow-trained Classifier #########
#
# Author: Feixinlin
# Date: 7/10/18
# Description: 
# This program uses a TensorFlow-trained classifier to perform object detection:
# It loads the classifier uses it to perform object detection on a webcam feed.
# It draws boxes and scores around the objects of interest in each frame from
# the webcam.
# Import packages
import os
import godEye
import cv2
import numpy as np
import tensorflow as tf
import PIL.ImageDraw as ImageDraw
import PIL.Image as Image
import PIL.ImageStat as ImageStat
import sys
import json


from timeit import timeit
import datetime
import time
# This is needed since the notebook is stored in the object_detection folder.
import time
sys.path.append("..")
# Import utilites
from utils import label_map_util
from utils import visualization_utils as vis_util
# Name of the directory containing the object detection module we're using
MODEL_NAME = 'inference_graph'
# Grab path to current working directory
CWD_PATH = os.getcwd()
# Path to frozen detection graph .pb file, which contains the model that is used
# for object detection.
PATH_TO_CKPT = os.path.join(CWD_PATH,MODEL_NAME,'frozen_inference_graph.pb')
# Path to label map file
PATH_TO_LABELS = os.path.join(CWD_PATH,'training','labelmap.pbtxt')
# Number of classes the object detector can identify
NUM_CLASSES = 8
## Load the label map.
# Label maps map indices to category names, so that when our convolution
# network predicts `5`, we know that this corresponds to `king`.
# Here we use internal utility functions, but anything that returns a
# dictionary mapping integers to appropriate string labels would be fine
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)
# Load the Tensorflow model into memory.
detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.GraphDef()
    with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')
    sess = tf.Session(graph=detection_graph)
# Define input and output tensors (i.e. data) for the object detection classifier
# Input tensor is the image
image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
# Output tensors are the detection boxes, scores, and classes
# Each box represents a part of the image where a particular object was detected
detection_boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
# Each score represents level of confidence for each of the objects.
# The score is shown on the result image, together with the class label.
detection_scores = detection_graph.get_tensor_by_name('detection_scores:0')
detection_classes = detection_graph.get_tensor_by_name('detection_classes:0')
# Number of objects detected
num_detections = detection_graph.get_tensor_by_name('num_detections:0')
# Initialize webcam feed
video = cv2.VideoCapture(0)
ret = video.set(3,1280)
ret = video.set(4,960)
count=0
face=0
data={}
time_come=[]
time_go=[]

while ret:
    # Acquire frame and expand frame dimensions to have shape: [1, None, None, 3]
    # i.e. a single-column array, where each item in the column has the pixel RGB value
    ret,frame=video.read()
    frame_expanded = np.expand_dims(frame, axis=0)
    # Perform the actual detection by running the model with the image as input
    (boxes, scores, classes, num) = sess.run(
        [detection_boxes, detection_scores, detection_classes, num_detections],
        feed_dict={image_tensor: frame_expanded})
    # Draw the results of the detection (aka 'visulaize the results')
    img,x,name,num=vis_util.visualize_boxes_and_labels_on_image_array(
        frame,
        np.squeeze(boxes),
        np.squeeze(classes).astype(np.int32),
        np.squeeze(scores),
        category_index,
        use_normalized_coordinates=True,
        line_thickness=8,
        min_score_thresh=0.85)
    count += 1

    start=0
    end=0
    if x>0  :
        face+=1
        count=0
    elif  count>=10 and face>0:
        print("逗留了",face/3)
        face=0
    frame1 =Image.fromarray(frame).convert('RGB')
    #x1=Image.fromarray(frame).convert('L')
    #x1=ImageStat.Stat(x1)急急急，
    display=0
    disappear=0
    im_width, im_height = frame1.size
    cv2.imshow('Object detector', img)
    distance = int(x * im_width)
    #if distance>
    name=str(name)
    if name[0:6]=='person'or name[0:8]=='Squirrel'or name[0:3]=='gun'or name[0:5]=='panda'or name[0:6]=='monkey':
       display+=1
       data["Timestamp"] = time.ctime()
       data["Cameralocation"] = "SouthWestern"
       data["Itemname"] = {"itemdirection":distance,"itemname":name}
       with open('C:\\Users\\A\\Desktop\\Aliyun-godEyes\\linkdevelop-webapp-device\\camera4.json', "w+", encoding='utf-8') as json_file:
          json_file.write(json.dumps(data, indent=4))
          line = '\n'
          json_file.write(line)
    # print(x1.mean[0])
    # Press 'q' to quit
   # print(int(x*im_width))
    print(name)
    print(distance)
    print(num)
   # print(x1.mean[0])
    if cv2.waitKey(1) == ord('q'):
        break
# Clean up
video.release()
cv2.destroyAllWindows()