
# PostGres Server 
# psql ^    ^
#           | 
# psycopg2 +
# python3

from db import *

def ShowStr():
    cursor=connectDB()

    cursor.execute("SELECT * FROM courses")

    data=cursor.fetchall()

    #print(data)
    returnValue=''
    for row in data:
        returnValue=returnValue+"%s|%s|%s\n"%(row[0],row[1],row[2])
    disconnectDB()
    return returnValue

def Show():
    print(ShowStr())

if __name__ == "__main__":
    Show()

