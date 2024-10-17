#https://coderslegacy.com/python/python-gui/python-tkinter-frame/

from tkinter import *
from showCourses import ShowStr
from addCourses import addCourse

def addCourseClick(win,textCourse,textNumber):
    dept=textCourse.get("1.0","end-1c")
    number=textNumber.get("1.0","end-1c")
    addCourse(dept,number)
    win.destroy()

def addCourseWindow(root):
    win=Toplevel(root)
    win.title("Add a Course")
    
    leftframe = Frame(win)
    leftframe.pack(side=LEFT)
    
    rightframe = Frame(win)
    rightframe.pack(side=RIGHT)
    labelCourse = Label(leftframe, text = "Course Department")
    labelCourse.pack()
    textCourse=Text(rightframe, height=1, width=30)
    textCourse.pack()
    labelNumber = Label(leftframe, text = "Course Number")
    labelNumber.pack()
    textNumber=Text(rightframe, height=1, width=30)
    textNumber.pack()
    #add = Button(leftframe,command=addCourse,text = "Add the Course")
    add = Button(rightframe,command=lambda: addCourseClick(win,textCourse,textNumber),text = "Add the Course")
    add.pack(padx = 3, pady = 3)
    cancel=Button(leftframe,command=win.destroy,text="Cancel")
    cancel.pack(padx=3,pady=3)
    
    #grab_release()

def updateCourseList(event,text):
    global root
    if event.widget == root:
        print("Main Window Focus")
        text.delete('1.0', END)
        text.insert(END, ShowStr())

root = Tk()

frame = Frame(root)
frame.pack()
 
leftframe = Frame(root)
leftframe.pack(side=LEFT)
 
rightframe = Frame(root)
rightframe.pack(side=RIGHT)
 
label = Label(frame, text = "Courses Currently Scheduled")
label.pack()
 
add = Button(leftframe,command=lambda: addCourseWindow(root),text = "Add a Course")
add.pack(padx = 3, pady = 3)
remove = Button(leftframe, text = "Remove a Course")
remove.pack(padx = 3, pady = 3)
update = Button(leftframe, text = "Update a Course")
update.pack(padx = 3, pady = 3)

text=Text(rightframe, height=20, width=30)
text.pack()

root.title("Cool Course Editor")
root.bind("<FocusIn>", lambda event: updateCourseList(event,text))
root.mainloop()