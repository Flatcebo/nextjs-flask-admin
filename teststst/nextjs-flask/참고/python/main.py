# pip install requests && beautifulsoup
import requests
import time
import re
import pymysql
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from flask import Flask, jsonify
app = Flask(__name__)



connection = pymysql.connect(
    host='192.168.0.37',  
    port=3306,  
    user='localDB',
    password='flatcebo',
    db='crawling',  
    charset='utf8'
)

cur = connection.cursor()


@app.route('/api/crawl', methods=['GET'])
def crawl_list(url) :
    response = requests.get(url)

    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    ul = soup.select_one('.maincontents')
    # urls = []

    # 제목
    arr = []
    
    titles = ul.select(".contents-wrapper tbody td.subject a")
    for title in titles:
        title.get_text()
    # 업체명
    userNames = ul.select(".contents-wrapper tbody td.writer.member span")
    for userName in userNames:
        userName.get_text()
    # 주소
    subjects = ul.select(".contents-wrapper table tbody td.subject a")
    for subject in subjects:
        subject.attrs['href']
        # urls.append(subject.attrs['href'])
    # 게시일
    uploadAts = ul.select(".contents-wrapper tbody td.date")
    for uploadAt in uploadAts:
        uploadAt.get_text()
    # 유저 아이디
    userIds = ul.select(".contents-wrapper tbody td.writer.member span")
    for userId in userIds:
        userId.attrs["onclick"].split(', ')[3].strip().strip("'")
    # 지역
    regions = ul.select(".contents-wrapper tbody td.region span")
    for region in regions:
        region.get_text()
    # 글번호
    listNumbs = ul.select(".contents-wrapper tbody td.no")
    for listNumb in listNumbs:
        listNumb.get_text()
    # 타입
    types = ul.select(".contents-wrapper tbody td.type .typeicon")
    for type in types:
        type.get_text()

    for i in range(len(subjects)):
        arr.append({
            "title":titles[i].get_text(),
            "userName": userNames[i].get_text(),
            "subject": subjects[i].attrs['href'],
            "uploadAt": uploadAts[i].get_text(),
            "userId":userIds[i].attrs["onclick"].split(', ')[3].strip().strip("'"),
            "region": regions[i].get_text(),
            "listNumb":listNumbs[i].get_text(),
            "type": types[i].get_text()
        })

        
    return arr


def crawl_next(url) :
    # global visited_urls
    # visited_urls = set()

    # if url in visited_urls:
    #     return

    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    ul = soup.select_one('.contents')
    count = 0
    links = soup.select("td.subject a", href=True)
    for link in links:
        if count == 1:
            break
        next_url = urljoin(url,link['href'])
        count += 1
        # 상세글
        detailDescs = ul
        for detailDesc in detailDescs : 
            detailDesc

        # 상세 이미지
        detailImgs = ul.select('img')
        for detailImg in detailImgs :
            detailImg.attrs['src']
        
        # 상세 번호
        detailNumbs = ul
        for detailNumb in detailNumbs :
            regexNumb = detailNumb.get_text()
            pattern = re.compile(r'(?=.)(?:010)[^0-9]*[0-9]{3,4}[^0-9]*[0-9]{4}')
            results = pattern.findall(regexNumb)

            for result in results:
                print(result)

        detail_descs = []  # 데이터를 저장할 리스트 초기화

        for detailDesc in detailDescs:
            # 데이터 처리 코드 추가
            detail_descs.append(detailDesc)  # 데이터 리스트에 추가

        detail_imgs = []  # 상세 이미지 데이터를 저장할 리스트 초기화
        for detailImg in detailImgs:
            detail_imgs.append(detailImg.attrs['src'])  # 이미지 URL 저장

        detail_numbs = []  # 상세 번호 데이터를 저장할 리스트 초기화
        for detailNumb in detailNumbs:
            regexNumb = detailNumb.get_text()
            pattern = re.compile(r'(?=.)(?:010)[^0-9]*[0-9]{3,4}[^0-9]*[0-9]{4}')
            results = pattern.findall(regexNumb)
            detail_numbs.extend(results)  # 결과를 리스트에 추가



        # 데이터를 딕셔너리 형태로 묶어서 반환
        return {
            "detail_descs": detail_descs if detail_descs is not None else "",
            "detail_imgs": detail_imgs if detail_imgs is not None else "",
            "detail_numbs": detail_numbs if detail_numbs is not None else ""
        }


 



if __name__ == "__main__":
        url = "http://jowhang.dinak.co.kr/%EC%A0%90%EC%A3%BC%EC%84%A0%EC%9E%A5%EC%A1%B0%ED%99%A9/list?sYear=2020&tmp=1"
        page = 1
        totalPages = 2
        delayInMilliseconds = 3
        arr = []
        while True:
            if page >= totalPages:
                print("break")
                break
        
            print("페이지 번호 =>", page)
            pages = f"&page={page}"
            arr += crawl_list(url + pages)

            page += 1

            time.sleep(delayInMilliseconds)
        # crawl_list의 item 속의 주소값을 받아와서 crawl_next 함수에서 크롤링함
        # arr.map((item) =>)
        for item in arr:
            crawled_data = crawl_next(item["subject"])  # crawl_next에서 수집한 데이터
            item.update(crawled_data)  # 기존 아이템 정보에 crawl_next 데이터 추가

        # print(arr)

try:
    with connection.cursor() as cursor:
        sql = "INSERT INTO Test (title,userName,userId,uploadDate,url,type,numb,region,imageURL,mainNumber,phoneNumber,description,country,fish,tag) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"    
            # crawl_list 함수 호출
            # crawled_data = arr
                
                # 각 아이템마다 데이터 추출 후 데이터베이스에 삽입
                # 아이템 안에 그 뒤에 정보를 넣는다
    # 디테일 데이터 넣아야함
        for item in arr:
            data = (
                item["title"],
                item["userName"],
                item["userId"],
                item["uploadAt"],
                item["subject"],
                item["type"],
                item["listNumb"],
                item["region"],
                item["detail_imgs"], # 안됨
                item["detail_numbs"],  # mainNumber 값은 적절한 값을 넣어주세요
                item["detail_numbs"],  # phoneNumber 값은 적절한 값을 넣어주세요
                item["detail_descs"],  # desc 값은 적절한 값을 넣어주세요
                item["title"],  # country 값은 적절한 값을 넣어주세요
                item["title"],  # fish 값은 적절한 값을 넣어주세요
                item["title"]  # tag 값은 적절한 값을 넣어주세요
            )
            cursor.execute(sql, data)
            connection.commit()
finally:
    connection.close()

if __name__ == '__main__':
    app.run(debug=True)



    # 프론트 기존 리액트두고 백엔드 파이썬으로 사용함 작업 요구