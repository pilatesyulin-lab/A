import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// 1. App.jsx에서 보내준 'gyms' 배열을 props로 받습니다.
const GymDetailPage = ({ gyms }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. 전체 gyms 데이터 중에서 현재 URL의 id와 일치하는 데이터 하나만 찾습니다.
  // 이 작업은 App에서 이루어지므로 fetch보다 훨씬 빠름.
  const gym = gyms.find((item) => item.id === id);

  // 만약 데이터를 찾지 못했을 경우 (잘못된 접근 등)
  if (!gym) {
    return (
      <div style={{ padding: "20px" }}>
        <button onClick={() => navigate("/")}>목록으로 돌아가기</button>
        <p>정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 3. 주소 정제 로직 (시/구 까지만 잘라내기)
  const getShortAddress = (addr) => {
    if (!addr) return "";
    const addrParts = addr.split(" ");
    return addrParts.slice(0, 2).join(" ");
  };

  const searchTerm = `${getShortAddress(gym.address)} ${gym.name}`;
  const naverSearchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(searchTerm)}`;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          cursor: "pointer",
          padding: "8px 15px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#fff",
        }}
      >
        ← 뒤로가기
      </button>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>
          {gym.name}
        </h1>
        <hr
          style={{
            border: "0",
            borderTop: "1px solid #eee",
            marginBottom: "20px",
          }}
        />

        <p>
          <strong>📍 주소:</strong> {gym.address}
        </p>

        <a
          href={naverSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: "20px",
            padding: "15px",
            textAlign: "center",
            backgroundColor: "#03C75A",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          네이버 상세 정보 확인하기
        </a>

        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "#e7f3ff",
            borderRadius: "8px",
            border: "1px dashed #007bff",
          }}
        >
          <h3
            style={{ color: "#007bff", fontSize: "16px", marginBottom: "10px" }}
          >
            🔥 AI 추천 루틴 (준비 중)
          </h3>
          <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
            {gym.name}의 기구를 분석한 맞춤형 루틴이 곧 공개됩니다!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GymDetailPage;
