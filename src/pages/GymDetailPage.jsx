import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams: ID 가져오기, useNavigate: 뒤로가기
import Papa from "papaparse";

const GymDetailPage = () => {
  const { id } = useParams(); // URL에서 /gym/:id 의 id값을 가져옵니다.
  const navigate = useNavigate();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. 상세 페이지에서도 데이터를 가져와야 합니다.
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
            const allGyms = realData.map((row, index) => ({
              id: String(index + 1), // 비교를 위해 문자열로 저장
              name: row[1] ? String(row[1]).trim() : "이름 없음",
              address: row[2] ? String(row[2]).trim() : "주소 없음",
              phone: row[3] ? String(row[3]).trim() : "번호 정보 없음", // 엑셀에 번호가 있다면 추가
            }));

            // 2. 전체 데이터 중 현재 URL의 id와 일치하는 것만 찾습니다.
            const selectedGym = allGyms.find((item) => item.id === id);
            setGym(selectedGym);
            setLoading(false);
          },
        });
      });
  }, [id]);

  if (loading) return <div style={{ padding: "20px" }}>로딩 중...</div>;
  if (!gym)
    return <div style={{ padding: "20px" }}>정보를 찾을 수 없습니다.</div>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px", cursor: "pointer", padding: "5px 10px" }}
      >
        ← 뒤로가기
      </button>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>
          {gym.name}
        </h1>
        <hr style={{ border: "0.5px solid #eee", marginBottom: "20px" }} />

        <p>
          <strong>📍 주소:</strong> {gym.address}
        </p>
        <p>
          <strong>📞 전화번호:</strong> {gym.phone}
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "#e7f3ff",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
            ✨ AI 추천 루틴과 커뮤니티 기능은 준비 중입니다!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GymDetailPage;
