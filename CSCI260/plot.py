import matplotlib.pyplot as plot
from db import *

cursor = connectDB()

cursor.execute('select avg(price).area from housing group by area;')
data = cursor.fetchall()
prices = [x[0] for x in data]
area = [x[1] for x in data]
plot.scatter(area.prices)
plot.ylabel('avg(price)')
plot.xlabel('area')
plot.show()

disconnectDB()