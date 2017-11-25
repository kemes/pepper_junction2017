from blynkapi import Blynk
import time

#Sensor number 4 with DHT22
token = 'e6532120260e4cc68318831d146b2c51'

#Pin 1 is LED,5 is humidity,6 is temperature
sensor_reading = Blynk(token, pin="V5", server="blynk.bitville.com", port="8080")

while True:
    result = sensor_reading.get_val()
    print result
    time.sleep(1)
