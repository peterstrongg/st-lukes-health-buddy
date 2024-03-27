import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv
from hashlib import sha256

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
            print("Database connection failed")
    

    # Public members
            
    def authenticate_user(self, username, password):
        query = sql.SQL(
            """
            SELECT {} FROM {} 
            WHERE username = %s AND 
            password = %s
            """
        ).format(
            sql.Identifier("user_id"),
            sql.Identifier("users"),
        )
        
        self.__curs.execute(query, (username, self.__hash_password(password)))
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
            sql.Identifier("module")
        )
        self.__curs.execute(query, (module,))
        result = self.__curs.fetchone()

        if result:
            title = result[2]
            video_link = result[3]
            description = result[4]

            return (title, video_link, description)
        return ("", "", "")
    
    def create_module(self, module_name, title, video_link, description):
        query = sql.SQL(
        """
        INSERT INTO {} ({}, {}, {}, {}) 
        VALUES (%s, %s, %s, %s)
        """
        ).format(
            sql.Identifier("module"),
            sql.Identifier("module_name"),
            sql.Identifier("title"),
            sql.Identifier("video_link"),
            sql.Identifier("description")
        )
        try:
            self.__curs.execute(query, (module_name, title, video_link, description))
            self.__conn.commit()
        except psycopg2.errors.UniqueViolation:
            return False
        return True

    # Private Members

    def __hash_password(self, password):
        return sha256(password.encode('utf-8')).hexdigest()
    