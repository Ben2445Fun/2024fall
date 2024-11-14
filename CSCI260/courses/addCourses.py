
# PostGres Server 
# psql ^    ^
#           | 
# psycopg2 +
# python3

from db import *

def addCourse(crn,dept,number):
    cursor=connectDB()
    cursor.execute("INSERT INTO courses (crn,class,number) VALUES ('%s','%s','%s');" %(crn,dept,number))
    disconnectDB()

def Add():
    print("Adding a class to the offered classes")
    crn=input("Please enter the class reference number:")
    classDept=input("Please enter the class Department:")
    classNum=input("Please enter the class Number:")
    addCourse(crn,classDept,classNum)

if __name__ == "__main__":
    Add()

