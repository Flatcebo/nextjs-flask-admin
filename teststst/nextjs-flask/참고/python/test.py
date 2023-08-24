import pymysql

connection = pymysql.connect(
    host='192.168.0.37',  
    port=3306,  
    user='localDB',
    password='flatcebo',
    db='crawling',  
    charset='utf8'
)

cur = connection.cursor()

result = "ddd"


# print(cur.execute(
#     "SELECT * FROM TB_Dinak_Master_21 ORDER BY id ASC LIMIT 0,100"
# ))

# cur.execute(
#     "CREATE TABLE userTable (id char(4), userName char(15))"
# )
try:
    with connection.cursor() as cursor:
        # SQL 쿼리 작성
        sql = "INSERT INTO userTable (id, userName) VALUES (%s, %s)"
        
        # VALUES에 들어갈 데이터
        data = (result, '값2')
        
        # SQL 실행
        cursor.execute(sql, data)
        
    # 변경사항 커밋
    connection.commit()

finally:
    # 연결 종료
    connection.close()