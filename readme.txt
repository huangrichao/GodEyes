#制作：浙江工业大学“天眼”团队
#2018.7.25
#实验室环境下，四个摄像头置于中央处，分别对准实验室的四个角落，在云端抽象好每个摄像头对应的方向。实现识别的同时，能判断出来向与去向。

1.Bone-web webApp
	We can input ''bone start'' to run the Web in command-window. Welcome to watch ./Bone-web/app/pages/home/index.js.
2.Descending_Control_from_web 
	Python reads the meassage of JSON files and send them to RaspberryPi by socket protocol.
3.godEyeTest_OpenCamera
	Python starts the easy-recognition program on local for testing.
4.linkdevelop-webapp-device
	Sending the camera-device message to clouds based on node.js SDk.
5.RaspberryPi _code
	Python receives the coordinate of the object which has been recognized and controls several steering engines named Sg90 to track.
6.Recogniton_code
	The main program of recognition based on tensorflow_modules through Python.