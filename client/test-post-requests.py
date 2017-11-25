import os
import requests

image_path = 'image.jpg'
try:
    url = 'http://localhost:3000'
    files = {'file': ('image.jpg', open(image_path, 'rb'), 'image/jpeg', {'Expires': '0'})}
    response = requests.post(url, files=files)
    print(response.status_code)
except Exception as e:
    print(e)
