from flask import Flask, render_template, request, jsonify
import pymysql
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin


app = Flask(__name__)



@app.route('/a', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        uri = request.form['uri']
        # data를 가져오는 로직을 호출합니다.
        # data = fetch_data(uri)
        pymysql.connect().cursor
        data = {}  # 여기에 데이터를 가져오는 로직을 구현합니다.
        return render_template('index.html' ,data=data)

    return render_template('index.html', data={})

if __name__ == '__main__':
    app.run(debug=True)


    # 설명글, 이미지URL, 설명글에서 필터링 하여 폰넘버
# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import urljoin

# visited_urls = set()
# url = "http://jowhang.dinak.co.kr/%EC%A0%90%EC%A3%BC%EC%84%A0%EC%9E%A5%EC%A1%B0%ED%99%A9/view?sYear=2020&seq=112524&tmp=1"

# def crawl_page(url):
#     global visited_urls

#     if url in visited_urls:
#         return

#     visited_urls.add(url)

#     print(f"Crawling: {url}")

#     try:
#         response = requests.get(url)
#         if response.status_code == 200:
#             html_content = response.text
#             soup = BeautifulSoup(html_content, 'html.parser')

#             # 원하는 데이터 추출 또는 처리
#             # 예를 들어, 해당 페이지의 제목 출력
#             desc = soup.select_one('#jw-view')
#             if desc:
#                 print(f"Page Desc: {desc}")

#             # 페이지의 모든 링크를 가져와서 재귀적으로 크롤링
#     #         links = soup.find_all('a', href=True)
#     #         for link in links:
#     #             next_url = urljoin(url, link['href'])
#     #             crawl_page(next_url)

#     except Exception as e:
#         print(f"Error crawling {url}: {e}")

# if __name__ == "__main__":
#     start_url = "http://jowhang.dinak.co.kr/%EC%A0%90%EC%A3%BC%EC%84%A0%EC%9E%A5%EC%A1%B0%ED%99%A9/view?sYear=2020&seq=112524&tmp=1"  # 크롤링을 시작할 URL 설정
#     crawl_page(start_url)
