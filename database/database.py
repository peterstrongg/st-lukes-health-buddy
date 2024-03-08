import psycopg2

class Database:
    def __init__(self):
        # self.conn = psycopg2.connect(
        #     database="",
        #     user="",
        #     password="",
        #     host="",
        #     port=5432
        # )

        pass

    def get_data_by_title(self, module):
        if module == "diabetes-education":
            return ({
                "video" : "https://player.vimeo.com/video/552139023?h=cd454073fe", 
                "description" : "Diabetes Education"
            })
        
        return False
