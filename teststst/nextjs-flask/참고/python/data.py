def fetch_data(uri):
    # 여기에 데이터를 가져오는 로직을 구현합니다.
    # 예를 들어, 외부 API를 호출하거나 데이터베이스에서 데이터를 조회하는 등의 작업을 수행할 수 있습니다.
    # 이 예시에서는 간단하게 임의의 데이터를 반환하도록 구현하겠습니다.

    # 임의의 데이터 예시 (주어진 React 코드와 유사한 형태로 데이터를 구성합니다)
    data = {
        "items": [
            {
                "listSubject": "https://example.com/board/1",
                "listName": "John",
                "listDate": "2023-07-29",
                "listTitle": "Sample Post 1",
                "listUserId": "user1",
            },
            {
                "listSubject": "https://example.com/board/2",
                "listName": "Jane",
                "listDate": "2023-07-28",
                "listTitle": "Sample Post 2",
                "listUserId": "user2",
            },
            # Add more items here...
        ]
    }

    return data