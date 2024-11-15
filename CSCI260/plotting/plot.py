import matplotlib.pyplot as plot
from db import *

def new3DData(axs,label,color):
  cursor.execute('select x,y,z from points where label=\'%s\';'%(label))
  data = cursor.fetchall()
  xs = [x[0] for x in data]
  ys = [x[1] for x in data]
  zs = [x[2] for x in data]
  axs.scatter(xs,ys,zs,label=label,color=color)

cursor = connectDB()
fig,axs=plot.subplots(subplot_kw={"projection":"3d"})
axs.set_xlabel('X')
axs.set_ylabel('Y')
axs.set_zlabel('Z')
new3DData(axs,'Red','red')
new3DData(axs,'Blue','blue')
new3DData(axs,'Green','green')
disconnectDB()
plot.show()

#select label,sqrt((x-10)*(x+10)+(y-10)*(y+10)+(z-10)*(z-10)) as d from points order by d limit 20;