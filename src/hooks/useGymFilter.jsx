import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// 🚨 핵심: 반드시 'export const'로 시작해야 합니다!
export const useGymFilter = (initialGyms) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 상태 관리
  const [inputText, setInputText] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(inputText);
  const selectedRegion = searchParams.get("region") || "전체";
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  // 데바운스 로직 (외부 파일 없이 자체 처리)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputText);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputText]);

  // URL 쿼리 파라미터 업데이트
  useEffect(() => {
    setSearchParams(
      { search: debouncedSearch, region: selectedRegion },
      { replace: true }
    );
  }, [debouncedSearch, selectedRegion, setSearchParams]);

  const filteredGyms = useMemo(() => {
    if (!initialGyms) return [];
    let result = [...initialGyms];

    // 지역 필터링
    if (selectedRegion !== "전체") {
      result = result.filter((gym) => gym.address.includes(selectedRegion));
    }

    // 검색어 필터링
    if (debouncedSearch) {
      result = result.filter((gym) =>
        gym.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // 정렬 로직 (지점순)
    result.sort((a, b) => {
      const getNum = (name) => {
        const match = name.match(/(\d+)호점/);
        return match ? parseInt(match[1], 10) : 0;
      };
      return getNum(a.name) - getNum(b.name);
    });

    return result.slice(0, page * itemsPerPage);
  }, [initialGyms, debouncedSearch, selectedRegion, page]);

  return {
    inputText,
    setInputText,
    selectedRegion,
    filteredGyms,
    setPage,
    hasMore: filteredGyms.length < (initialGyms?.length || 0),
  };
};
