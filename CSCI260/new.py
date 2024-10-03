import psycopg2
conn = psycopg2.connect(database="csci260",host="localhost",user="csci260",password="MinecraftFun@1.21.2")
cursor = conn.cursor()
cursor.execute("select * from courses")
print(*cursor)