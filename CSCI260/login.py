from tkinter import *
import psycopg2

def login():
  connection = psycopg2.connect(database=databaseField,host="localhost",user=userField,password=passwordField)
  cursor = connection.cursor()

root = Tk()
root.resizable(False,False)
frame = Frame(root)
frame.pack()
leftframe = Frame(root)
leftframe.pack(side=LEFT)
rightframe = Frame(root)
rightframe.pack(side=RIGHT)
labelAddress = Label(leftframe,text="Address")
labelAddress.pack()
addressField = Text(rightframe,height=1,width=30)
addressField.pack()
labelDatabase = Label(leftframe,text="Database")
labelDatabase.pack()
databaseField = Text(rightframe,height=1,width=30)
databaseField.pack()
labelUser = Label(leftframe,text="Username")
labelUser.pack()
userField = Text(rightframe,height=1,width=30)
userField.pack()
labelPassword = Label(leftframe,text="Password")
labelPassword.pack()
passwordField = Text(rightframe,height=1,width=30)
passwordField.pack()
confirmation = Button(leftframe,text="Login",command=login)
confirmation.pack()
exit = Button(rightframe,text="Exit",command=exit)
exit.pack()
root.title("Database Login")
root.mainloop()