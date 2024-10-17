
# PostGres Server 
# psql ^    ^
#           | 
# psycopg2 +
# python3

from db import *
from addCourses import Add
from delCourses import Delete
from showCourses import Show 
from updateCourses import Update

while (True):
    print("1) Add a Course")
    print("2) Show current Courses")
    print("3) Update a Course")
    print("4) Delete a Course")
    print("Any other number to quit")
    choice=input("Enter 1,2,3 or 4 ")
    if choice=="1":
        Add()
    elif choice=="2":
        Show()
    elif choice=="3":
        Update()
    elif choice=="4":
        Delete()
    else:
        quit()

