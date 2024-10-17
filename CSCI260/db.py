import psycopg2

conn=None
cursor=None

def connectDB():
    global conn
    global cursor
    conn = psycopg2.connect(database="csci260",
                            host="localhost",
                            user="csci260",
                            password="MinecraftFun@1.21.2")
    cursor = conn.cursor()
    print("Connect Success")
    return cursor

def disconnectDB():
    global conn
    global cursor
    conn.commit()
    cursor.close()
    conn.close()
    conn=None
    cursor=None
