import React from "react";
import { useNavigate } from "react-router-dom";
import { useListPage } from "../hooks/useListPage";
import { useGymData } from "../GymPageIn"; //
import GymItem from "../GymItem";

const GymListPage = () => {
  // 👈 1. ({}) 비어있는 props는 지워주세요.
  const navigate = useNavigate();

  // 👈 2. 수정포인트: useGymData를 호출해서 데이터와 로딩 상태를 가져옵니다.
  const { gyms, loading } = useGymData();

  const {
    inputText,
    setInputText,
    filteredGyms,
    sortType,
    selectedRegion,
    setSearchParams,
    setPage,
    hasMore,
  } = useListPage(gyms);

  //
  if (loading)
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        데이터를 불러오는 중입니다...
      </div>
    );

  const updateParams = (newParams) => {
    const currentParams = {
      search: inputText,
      sort: sortType,
      region: selectedRegion,
      ...newParams,
    };
    setSearchParams(currentParams);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>📍 헬스장 찾기</h2>
      {/* ... 이후 코드는 동일합니다 ... */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="헬스장 검색..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <select
          value={selectedRegion}
          onChange={(e) => updateParams({ region: e.target.value })}
          style={{ flex: 1, padding: "8px" }}
        >
          <option value="전체">전체</option>
          <option value="성동구">성동구</option>
          <option value="용산구">용산구</option>
        </select>

        <select
          value={sortType}
          onChange={(e) => updateParams({ sort: e.target.value })}
          style={{ flex: 1, padding: "8px" }}
        >
          <option value="ganada">가나다순</option>
          <option value="distance">거리순</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {filteredGyms.map((gym) => (
          <div
            key={gym.id}
            onClick={() => navigate(`/gym/${gym.id}`)}
            style={{ cursor: "pointer" }}
          >
            <GymItem gym={gym} />
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          더 보기
        </button>
      )}
    </div>
  );
};

export default GymListPage;
