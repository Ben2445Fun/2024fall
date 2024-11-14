from db import *

def removeCourse(dept,number):
  cursor=connectDB()
  if number == None:
    cursor.execute("DELETE FROM courses WHERE crn='%s';" %(dept))
  else:
    cursor.execute("DELETE FROM courses WHERE class='%s' AND number='%s';" %(dept,number))
  disconnectDB()