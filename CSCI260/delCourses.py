
# PostGres Server 
# psql ^    ^
#           | 
# psycopg2 +
# python3

from db import *

def Delete():
    cursor=connectDB()

    print("Deleting a class from the offered classes")
    classDept=input("Please enter the class Department:")
    classNum=input("Please enter the class Number:")

    #Use Fstring Formatted String to add class and number to query
    query="delete from courses where class='%s' and number='%s'" %(classDept,classNum)
    print(query)
    cursor.execute(query)
    disconnectDB()

if __name__ == "__main__":
    Delete()