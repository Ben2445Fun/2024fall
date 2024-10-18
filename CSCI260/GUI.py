from tkinter import *
from showCourses import ShowStr
from addCourses import addCourse
from removeCourses import removeCourse
from updateCourses import updateCourse

# Add course
def addCourseClick(win,textCRN,textDepartment,textNumber):
    crn = textCRN.get("1.0","end-1c")
    dept=textDepartment.get("1.0","end-1c")
    number=textNumber.get("1.0","end-1c")
    addCourse(crn,dept,number)
    win.destroy()
def addCourseWindow(root):
    win=Toplevel(root)
    win.title("Add a Course")
    
    leftframe = Frame(win)
    leftframe.pack(side=LEFT)
    
    rightframe = Frame(win)
    rightframe.pack(side=RIGHT)
    labelCRN = Label(leftframe,text="CRN")
    labelCRN.pack()
    textCRN = Text(rightframe,height=1,width=30)
    textCRN.pack()
    labelDepartment = Label(leftframe, text = "Course Department")
    labelDepartment.pack()
    textDepartment=Text(rightframe, height=1, width=30)
    textDepartment.pack()
    labelNumber = Label(leftframe, text = "Course Number")
    labelNumber.pack()
    textNumber=Text(rightframe, height=1, width=30)
    textNumber.pack()
    #add = Button(leftframe,command=addCourse,text = "Add the Course")
    add = Button(rightframe,command=lambda: addCourseClick(win,textCRN,textDepartment,textNumber),text = "Add the Course")
    add.pack(padx = 3, pady = 3)
    cancel=Button(leftframe,command=win.destroy,text="Cancel")
    cancel.pack(padx=3,pady=3)
    
    #grab_release()

# Remove Course - This is FAR more complicated than I need to make it, but it was worth it :P
def removeCourseClick(win):
    if 'labelCRN' in globals() and labelCRN.winfo_exists():
        crn = textCRN.get("1.0","end-1c")
        removeCourse(crn,None)
    elif 'labelDepartment' in globals() and labelDepartment.winfo_exists():
        dept = textDepartment.get("1.0","end-1c")
        number = textNumber.get("1.0","end-1c")
        removeCourse(dept,number)
    win.destroy()
def removeCourseWindow(root): #Add a remove course window
    win=Toplevel(root)
    leftframe = Frame(win)
    leftframe.pack(side=LEFT)
    rightframe = Frame(win)
    rightframe.pack(side=RIGHT)
    switchCRN = Button(leftframe,text="Course Reference Number",command=lambda:removeCoursebyCRN(leftframe,rightframe,win,switchCRN,switchDN))
    switchCRN.pack()
    switchDN = Button(rightframe,text="Department & Number",command=lambda:removeCoursebyDN(leftframe,rightframe,win,switchCRN,switchDN))
    switchDN.pack()
    #Default state
    removeCoursebyCRN(leftframe,rightframe,win,switchCRN,switchDN)
def removeCoursebyCRN(leftframe,rightframe,win,switchCRN,switchDN): #Allows the user to remove a course using its CRN
    switchCRN.config(relief=SUNKEN,state=DISABLED)
    switchDN.config(relief=RAISED,state=NORMAL)
    clearRemoveCourse()
    global labelCRN
    global textCRN
    labelCRN = Label(leftframe,text="CRN")
    labelCRN.pack()
    textCRN = Text(rightframe,height=1,width=30)
    textCRN.pack()
    removeCourseOptions(leftframe,rightframe,win)
def removeCoursebyDN(leftframe,rightframe,win,switchCRN,switchDN): #Allows the user to remove a course using its department and number
    switchCRN.config(relief=RAISED,state=NORMAL)
    switchDN.config(relief=SUNKEN,state=DISABLED)
    clearRemoveCourse()
    global labelDepartment
    global textDepartment
    global labelNumber
    global textNumber
    labelDepartment = Label(leftframe,text="Department")
    labelDepartment.pack()
    textDepartment = Text(rightframe,height=1,width=30)
    textDepartment.pack()
    labelNumber = Label(leftframe,text="Number")
    labelNumber.pack()
    textNumber = Text(rightframe,height=1,width=30)
    textNumber.pack()
    removeCourseOptions(leftframe,rightframe,win)
def removeCourseOptions(leftframe,rightframe,win): #Adds "delete" and "cancel" buttons to window
    global confirm
    global cancel
    confirm = Button(leftframe,text="Delete Course",command=lambda: removeCourseClick(win))
    confirm.pack()
    cancel = Button(rightframe,text="Cancel",command=win.destroy)
    cancel.pack()
def clearRemoveCourse(): #Removes previous buttons from the delete window
    if 'labelCRN' in globals() and labelCRN.winfo_exists():
        labelCRN.destroy()
        textCRN.destroy()
    if 'labelDepartment' in globals() and labelDepartment.winfo_exists():
        labelDepartment.destroy()
        textDepartment.destroy()
        labelNumber.destroy()
        textNumber.destroy()
    if 'confirm' in globals() and confirm.winfo_exists():
        confirm.destroy()
        cancel.destroy()

# Update Course
def updateCourseClick(win):
    updateCRN = textNewCRN.get("1.0","end-1c")
    updateDept = textNewDepartment.get("1.0","end-1c")
    updateNumber = textNewNumber.get("1.0","end-1c")
    if 'labelCRN' in globals() and labelCRN.winfo_exists():
        crn = textCRN.get("1.0","end-1c")
        updateCourse(crn,None,updateCRN,updateDept,updateNumber)
    else:
        dept = textDepartment.get("1.0","end-1c")
        number = textNumber.get("1.0","end-1c")
        updateCourse(dept,number,updateCRN,updateDept,updateNumber)
    win.destroy()

def updateCourseWindow(root):
    win=Toplevel(root)
    leftframe = Frame(win)
    leftframe.pack(side=LEFT)
    rightframe = Frame(win)
    rightframe.pack(side=RIGHT)
    switchCRN = Button(leftframe,text="Course Reference Number",command=lambda:updateCoursebyCRN(leftframe,rightframe,win,switchCRN,switchDN))
    switchCRN.pack()
    switchDN = Button(rightframe,text="Department & Number",command=lambda:updateCoursebyDN(leftframe,rightframe,win,switchCRN,switchDN))
    switchDN.pack()
    #Default state
    updateCoursebyCRN(leftframe,rightframe,win,switchCRN,switchDN)
def updateCoursebyCRN(leftframe,rightframe,win,switchCRN,switchDN): #Allows the user to update a course using its CRN
    switchCRN.config(relief=SUNKEN,state=DISABLED)
    switchDN.config(relief=RAISED,state=NORMAL)
    clearUpdateCourse()
    global labelCRN
    global textCRN
    labelCRN = Label(leftframe,text="CRN")
    labelCRN.pack()
    textCRN = Text(rightframe,height=1,width=30)
    textCRN.pack()
    updateCourseOptions(leftframe,rightframe,win)
def updateCoursebyDN(leftframe,rightframe,win,switchCRN,switchDN): #Allows the user to update a course using its department and number
    switchCRN.config(relief=RAISED,state=NORMAL)
    switchDN.config(relief=SUNKEN,state=DISABLED)
    clearUpdateCourse()
    global labelDepartment
    global textDepartment
    global labelNumber
    global textNumber
    labelDepartment = Label(leftframe,text="Department")
    labelDepartment.pack()
    textDepartment = Text(rightframe,height=1,width=30)
    textDepartment.pack()
    labelNumber = Label(leftframe,text="Number")
    labelNumber.pack()
    textNumber = Text(rightframe,height=1,width=30)
    textNumber.pack()
    updateCourseOptions(leftframe,rightframe,win)
def updateCourseOptions(leftframe,rightframe,win): #Update Course stuff
    global confirm
    global cancel
    global labelUpdate
    global leaveBlank
    global labelNewCRN
    global textNewCRN
    global labelNewDepartment
    global textNewDepartment
    global labelNewNumber
    global textNewNumber
    labelUpdate = Label(leftframe,text="Update Information")
    labelUpdate.pack()
    leaveBlank = Label(rightframe,text="(Leave blank for no change)")
    leaveBlank.pack()
    labelNewCRN = Label(leftframe,text="Update CRN")
    labelNewCRN.pack()
    textNewCRN = Text(rightframe,height=1,width=30)
    textNewCRN.pack()
    labelNewDepartment = Label(leftframe,text="Update Department")
    labelNewDepartment.pack()
    textNewDepartment = Text(rightframe,height=1,width=30)
    textNewDepartment.pack()
    labelNewNumber = Label(leftframe,text="Update Number")
    labelNewNumber.pack()
    textNewNumber = Text(rightframe,height=1,width=30)
    textNewNumber.pack()
    confirm = Button(leftframe,text="Update Course",command=lambda: updateCourseClick(win))
    confirm.pack()
    cancel = Button(rightframe,text="Cancel",command=win.destroy)
    cancel.pack()
def clearUpdateCourse(): #Removes previous buttons from the update window
    if 'labelCRN' in globals() and labelCRN.winfo_exists():
        labelCRN.destroy()
        textCRN.destroy()
    if 'labelDepartment' in globals() and labelDepartment.winfo_exists():
        labelDepartment.destroy()
        textDepartment.destroy()
        labelNumber.destroy()
        textNumber.destroy()
    if 'confirm' in globals() and confirm.winfo_exists():
        labelUpdate.destroy()
        leaveBlank.destroy()
        labelNewCRN.destroy()
        textNewCRN.destroy()
        labelNewDepartment.destroy()
        textNewDepartment.destroy()
        labelNewNumber.destroy()
        textNewNumber.destroy()
        confirm.destroy()
        cancel.destroy()


# Update course list
def updateCourseList(event,text):
    global root
    if event.widget == root:
        text.delete('1.0', END)
        text.insert(END, ShowStr())


# Setup default window
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
remove = Button(leftframe, text = "Remove a Course",command=lambda:removeCourseWindow(root))
remove.pack(padx = 3, pady = 3)
update = Button(leftframe, text = "Update a Course",command=lambda:updateCourseWindow(root))
update.pack(padx = 3, pady = 3)
exit = Button(leftframe, text = "Exit",command=root.destroy)
exit.pack(padx = 3, pady = 3)

text=Text(rightframe, height=20, width=30)
text.pack()

root.title("Course Editor")
root.bind("<FocusIn>", lambda event: updateCourseList(event,text))
root.mainloop()