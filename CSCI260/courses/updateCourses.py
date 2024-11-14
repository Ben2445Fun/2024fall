
# PostGres Server 
# psql ^    ^
#           | 
# psycopg2 +
# python3

from db import *

def updateCourse(dept,number,newCRN,newDept,newNumber):
    cursor = connectDB()
    if number == None:
        if newCRN != '':
            cursor.execute("UPDATE courses SET crn = '%s' WHERE crn = '%s'"%(newCRN,dept))
        if newDept != '':
            cursor.execute("UPDATE courses SET class = '%s' WHERE crn = '%s'"%(newDept,dept))
        if newNumber != '':
            cursor.execute("UPDATE courses SET number = '%s' WHERE crn = '%s'"%(newNumber,dept))
    else:
        if newCRN != '':
            cursor.execute("UPDATE courses SET crn = '%s' WHERE class = '%s' AND number = '%s'"%(newCRN,dept,number))
        if newDept != '':
            cursor.execute("UPDATE courses SET class = '%s' WHERE class = '%s' AND number = '%s'"%(newDept,dept,number))
        if newNumber != '':
            cursor.execute("UPDATE courses SET number = '%s' WHERE class = '%s' AND number = '%s'"%(newNumber,dept,number))
    disconnectDB()


def Update():
    cursor=connectDB()

    print("Updating a class number in the offered classes")
    classDept=input("Please enter the class Department:")
    classNum=input("Please enter the class Number:")
    classNewNum=input("Please enter the new class Number:")

    #Use Fstring Formatted String to add class and number to query
    query="update courses set number='%s' where class='%s' and number='%s'" %(classNewNum,classDept,classNum)
    print(query)
    cursor.execute(query)
    disconnectDB()

if __name__ == "__main__":
    Update()