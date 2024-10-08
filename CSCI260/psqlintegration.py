import psycopg2
database_in = input("Database: ")
host_in = input("Host Address: ")
username_in = input("Username: ")
password_in = input("Password: ")
connection = psycopg2.connect(database=database_in,
                              host=host_in,
                              user=username_in,
                              password=password_in)
cursor = connection.cursor()
while True :
  print("What would you like to do?\n",
        "[1] Show All Tables\n",
        "[2] Modify Table/Data\n",
        "[3] Quit")
  selection = input("Enter: ")
  if   selection == "1" :
    cursor.execute("select table_schema, table_name from information_schema.tables where table_type = 'BASE TABLE' and table_schema not in ('information_schema','pg_catalog')")
    tables = cursor.fetchall()
    for table in tables:
      print(table)
  elif selection == "2" :
    print("Selected 2")
  else :
    quit()