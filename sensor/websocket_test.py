from blynkapi import Blynk

#Sensor number 4 with DHT22
token = '073b5fb0e0854d09b13e3ce7537dd82b'

sensor_reading = Blynk(token, pin="v1", server="blynk.bitville.com", port="8080")

result = sensor_reading.get_val()

print result
