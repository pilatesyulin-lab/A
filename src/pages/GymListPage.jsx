import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // 1. useNavigate 추가
import Papa from "papaparse";
import GymItem from "../GymItem";

const GymListPage = () => {
  const [gyms, setGyms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // 2. 이동 함수 생성

  const [inputText, setInputText] = useState(searchParams.get("search") || "");
  const searchTerm = searchParams.get("search") || "";
  const sortType = searchParams.get("sort") || "default";

  useEffect(() => {
    fetch("/gym_data.csv")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const decoder = new TextDecoder("euc-kr");
        const decodedText = decoder.decode(buffer);
        Papa.parse(decodedText, {
          header: false,
          skipEmptyLines: true,
          complete: (results) => {
            const realData = results.data.slice(1);
            const formattedData = realData
              .map((row, index) => ({
                id: index + 1,
                name: row[1] ? String(row[1]).trim() : "이름 없음",
                address: row[2] ? String(row[2]).trim() : "주소 없음",
                distance: parseFloat((Math.random() * 2 + 0.1).toFixed(1)),
              }))
              .filter(
                (gym) => gym.name !== "이름 없음" && gym.name !== "상호명"
              );
            setGyms(formattedData);
          },
        });
      });
  }, []);

  const handleSearch = () => {
    setSearchParams({ search: inputText, sort: sortType });
  };

  const filteredAndSortedGyms = useMemo(() => {
    if (!gyms.length) return [];
    let result = [...gyms];
    if (searchTerm.trim() !== "") {
      result = result.filter(
        (gym) =>
          gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gym.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortType === "distance") result.sort((a, b) => a.distance - b.distance);
    return result;
  }, [gyms, searchTerm, sortType]);

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>📍 헬스장 찾기 </h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="검색 후 엔터를 누르세요..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "10px", borderRadius: "8px", cursor: "pointer" }}
        >
          검색
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filteredAndSortedGyms.map((gym) => (
          /* 3. 클릭 시 이동 이벤트 추가 */
          <div
            key={gym.id}
            onClick={() => navigate(`/gym/${gym.id}`)}
            style={{ cursor: "pointer" }}
          >
            <GymItem gym={gym} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymListPage;
