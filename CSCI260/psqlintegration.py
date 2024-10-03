import psycopg2
database_in = input("Database: ")
host_in = input("Host Address: ")
username_in = input("Username: ")
password_in = input("Password: ")
connection = psycopg2.connect(database=database_in, host=host_in, user=username_in, password=password_in)
cursor = connection.cursor()
while True :
  print("What would you like to do?\n",
        "[1] Show All Tables\n",
        "[2] Modify Table/Data\n",
        "[3] Quit")
  selection = input("Enter: ")
  if   selection == "1" :
    print(*cursor.execute("\dt"))
  elif selection == "2" :
    print("Selected 2")
  else :
    quit()