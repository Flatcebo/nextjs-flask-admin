from flask import Flask, jsonify
from sqlalchemy import create_engine, Column, String, Integer, or_
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

# SQLAlchemy 설정
DATABASE_URL = "mysql+pymysql://localDB:flatcebo@192.168.0.37:3306/crawling?charset=utf8"
engine = create_engine(DATABASE_URL, echo=True,isolation_level="READ_UNCOMMITTED", connect_args={"charset": "utf8mb4"} )
Session = sessionmaker(bind=engine)
Base = declarative_base()


class Test(Base):
    __tablename__ = 'Test'

    id = Column(Integer, primary_key=True)
    userId = Column(String)
    title = Column(String)
    userName = Column(String)
    mainNumber = Column(String)

@app.route("/api/crawler")
def users():
	# users 데이터를 Json 형식으로 반환한다
    return jsonify({"members": [{ "id" : 1, "name" : "yerin" },
    					{ "id" : 2, "name" : "dalkong" }]})



@app.route('/api/read', methods=['GET'])
def query_database():
    
    # keyword = request.args.get('keyword')

    # if not keyword:
    #     return jsonify({"message": "Keyword is missing"}), 400

    

    session = Session()
 
    try:
        
        categories = session.query(Test).\
            filter(Test.userId)
        
        unique_categories = set()
        for category in categories:
            unique_categories.add((category.userId, category.title, category.userName, category.mainNumber))

        result = []
        for category in categories:
            result.append({
                "userId": category.userId,
                "title": category.title,
                "userName": category.userName,
                "mainNumber": category.mainNumber
            })

        return jsonify({"categories": result})

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        session.close()

if __name__ == '__main__':
    app.run(debug=True)