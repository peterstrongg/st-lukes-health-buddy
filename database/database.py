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
    
    def authenticate_user(self, username, password):
        query = sql.SQL(
            """
            SELECT {} FROM {} 
            WHERE username = %s AND 
            password = %s
            """
        ).format(
            sql.Identifier("uid"),
            sql.Identifier("test_users"),
        )
        self.__curs.execute(query, (username, password))
        result = self.__curs.fetchone()
        if result:
            return result[0]
        return 0
    
    def get_module_data(self, module):
        query = sql.SQL(
            """
            SELECT * FROM {}
            WHERE module_name = %s
            """
        ).format(
            sql.Identifier("test_module_info")
        )
        self.__curs.execute(query, (module,))
        result = self.__curs.fetchone()

        if result:
            title = result[2]
            video_link = result[3]
            description = result[4]

            return (title, video_link, description)
        return ("", "", "")
