
# PostGres Server 
# psql ^    ^
#           | 
# psycopg2 +
# python3

from db import *

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