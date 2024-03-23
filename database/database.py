import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv

load_dotenv(".env")
PG_DB_NAME = os.getenv("PG_DB_NAME")
PG_USER = os.getenv("PG_USER")
PG_HOST = os.getenv("PG_HOST")
PG_PASSWORD = os.getenv("PG_PASSWORD")
PG_PORT = os.getenv("PG_PORT")

class Database:
    def __init__(self):
        try:
            self.__conn = psycopg2.connect(
                database=PG_DB_NAME,
                user=PG_USER,
                password=PG_PASSWORD,
                host=PG_HOST,
                port=PG_PORT
            )
            self.__curs = self.__conn.cursor()

        except psycopg2.OperationalError as e:
            print("Database connection failed\n{0}").format(e)
    
    def get_data_by_title(self, module):
        if module == "diabetes-education":
            return ({
                "video" : "https://player.vimeo.com/video/552139023?h=cd454073fe", 
                "description" : "Diabetes Education"
            })
        
        return False
    
    def authenticate_user(self, username, password):
        query = sql.SQL(
            "SELECT {} FROM {} WHERE username = %s AND password = %s;"
        ).format(
            sql.Identifier("uid"),
            sql.Identifier("test_table"),
        )
        self.__curs.execute(query, (username, password))
        data = self.__curs.fetchone()
        if data:
            return data[0]
        return 0

