import psycopg2

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
            database="",
            user="",
            password="",
            host="",
            port=5432
        )
