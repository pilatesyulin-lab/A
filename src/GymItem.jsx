// src/GymItem.jsx (또는 컴포넌트 파일)

const GymItem = ({ gym }) => {
  return (
    <div
      style={{
        padding: "15px",
        borderBottom: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      {/* gym.name과 gym.address가 정확해야 화면에 글자가 뜹니다! */}
      <strong style={{ fontSize: "18px", color: "#333" }}>
        {gym.name || "이름 정보 없음"}
      </strong>
      <span style={{ fontSize: "14px", color: "#666" }}>
        📍 {gym.address || "주소 정보 없음"}
      </span>
      <div style={{ fontSize: "14px", color: "#007bff", fontWeight: "bold" }}>
        📏 {gym.distance}km | ⭐ 4.5
      </div>
    </div>
  );
};

export default GymItem;
