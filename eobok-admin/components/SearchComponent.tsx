import React, { useState } from "react";

const SearchComponent = () => {
  const [keyword, setKeyword] = useState("");
  const [descs, setDescs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch("/api/crawler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });

      const data = await response.json();
      setDescs(data.descs);
    } catch (error) {
      console.error("검색 결과를 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {/* {descs.map((user, i) => (
          <li key={i}>
            {user.userId} {user.lastName}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default SearchComponent;
