import { BrowserRouter, Routes, Route } from "react-router-dom"; // Routes, Route 추가
import GymListPage from "./pages/GymListPage";
import GymDetailPage from "./pages/GymDetailPage"; // 상세 페이지 컴포넌트 임포트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 목록 페이지 경로 */}
        <Route path="/" element={<GymListPage />} />

        {/* 상세 페이지 경로 (:id는 헬스장 번호에 따라 변하는 동적 값입니다) */}
        <Route path="/gym/:id" element={<GymDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
