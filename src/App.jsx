import React from "react";
import { Routes, Route } from "react-router-dom";
import { useGymData } from "./hooks/useGymData";
import GymListPage from "./pages/GymListPage";
import GymDetailPage from "./pages/GymDetailPage";

function App() {
  const { gyms, loading } = useGymData();

  if (loading)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        🏋️ 데이터 로딩 중...
      </div>
    );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GymListPage gyms={gyms} />} />
        <Route path="/gym/:id" element={<GymDetailPage gyms={gyms} />} />
      </Routes>
    </div>
  );
}

export default App;
