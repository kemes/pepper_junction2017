class MyClass(GeneratedClass):
    def __init__(self):
        GeneratedClass.__init__(self)

    def onLoad(self):
        self.frameManager = ALProxy('ALFrameManager')
        pass

    def onUnload(self):
        self.frameManager = None
        pass

    def onInput_onStart(self):
        import os
        import requests

        self.logger.info('Loading static image file...')

        #imageFile = "center.jpg"
        #imageFolder = os.path.join(self.frameManager.getBehaviorPath(self.behaviorId), '../images')
        #imagePath = os.path.join(imageFolder, imageFile)

        image_path = '/home/nao/recordings/cameras/some_image.jpg'
        self.logger.info('Connecting...')
        url = 'http://192.168.4.109:3000'
        try:
            self.logger.info('sock.connected')
            files = {'file': ('regulator.jpg', open(image_path, 'rb'), 'image/jpeg', {'Expires': '0'})}
            response = requests.post(url, files=files)
            self.logger.info(response.status_code)


            #answer = sock.recv(4096)
            #if answer == '#complete' :
            #    sock.sendall("#end ")
        except (TypeError):
            self.logger.info('Houston, a problem...')

        self.logger.info('done')

        self.onStopped() #activate the output of the box
        pass

    def onInput_onStop(self):
        #self.onUnload() #it is recommended to reuse the clean-up as the box is stopped
        self.onStopped() #activate the output of the box