from flask import Flask, request, jsonify
from prisma import PrismaClient

app = Flask(__name__)

prisma = PrismaClient()

@app.route('/api/crawler', methods=['GET'])
def get_data():
    params = request.args
    cate = params.get('cate')
    year = params.get('year')
    theme = params.get('theme')
    offset = params.get('offset')
    count = params.get('count')
    keyword = params.get('keyword')
    print('param =====>', params)

    if len(keyword) < 1:
        return jsonify({"ok": True})

    Boat = None

    if year == '2023선상낚시':
        Boat = prisma.tB_Innak_Boat_23
    elif year == '2022선상낚시':
        Boat = prisma.tB_Innak_Boat_22
    elif year == '2021선상낚시':
        Boat = prisma.tB_Innak_Boat_21
    elif year == '2023갯바위':
        Boat = prisma.tB_Innak_Rock_23
    elif year == '2022갯바위':
        Boat = prisma.tB_Innak_Rock_22
    elif year == '2021갯바위':
        Boat = prisma.tB_Innak_Rock_21

    categories = Boat.findMany(
        select={
            "userId": True,
            "title": True,
            "userName": True,
            "mainNumber": True,
        },
        where={
            "OR": [
                {"userId": {"contains": keyword}},
                {"userName": {"contains": keyword}},
                {"title": {"contains": keyword}},
                {"mainNumber": {"contains": keyword}},
            ],
        },
        skip=int(offset) if offset else None,
        take=int(count) if count else 20,
    )

    try:
        if cate == "전체":
            categories = Boat.findMany(
                select={
                    "userId": True,
                    "title": True,
                    "userName": True,
                    "mainNumber": True,
                },
                where={
                    "OR": [
                        {"userId": {"contains": keyword}},
                        {"userName": {"contains": keyword}},
                        {"title": {"contains": keyword}},
                        {"mainNumber": {"contains": keyword}},
                    ],
                },
                skip=int(offset) if offset else None,
                take=int(count) if count else 20,
            )
        elif cate == "업체명":
            categories = Boat.findMany(
                select={
                    "userId": True,
                    "title": True,
                    "userName": True,
                    "mainNumber": True,
                },
                where={"userName": {"contains": keyword}},
                skip=int(offset) if offset else None,
                take=int(count) if count else 20,
            )
        # 이하 case 문도 동일하게 변환
    except Exception as error:
        return jsonify({"error": "내부 서버 오류가 발생했습니다"})
    finally:
        prisma.$disconnect()

    return jsonify({"categories": categories})

if __name__ == '__main__':
    app.run(debug=True)