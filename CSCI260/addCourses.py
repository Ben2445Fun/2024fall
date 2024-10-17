
# PostGres Server 
# psql ^    ^
#           | 
# psycopg2 +
# python3

from db import *

def addCourse(crn,dept,number):
    cursor=connectDB()
    #Use Fstring Formatted String to add class and number to query
    query="insert into courses (crn,class,number) values ('%s','%s','%s');" %(crn,dept,number)
    print(query)
    cursor.execute(query)
    disconnectDB()

def Add():
    print("Adding a class to the offered classes")
    crn=input("Please enter the class reference number:")
    classDept=input("Please enter the class Department:")
    classNum=input("Please enter the class Number:")
    addCourse(crn,classDept,classNum)

if __name__ == "__main__":
    Add()

