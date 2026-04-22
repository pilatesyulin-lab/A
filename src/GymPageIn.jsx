useEffect(() => {
  // 1. 불러올 파일들을 배열로 만듭니다.
  const files = ["/gym_data.csv", "/gym_data2.csv"];

  // 2. 모든 파일을 fetch하는 약속(Promise)들을 만듭니다.
  const fetchPromises = files.map((file) =>
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`${file} 로딩 실패`);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        const decodedText = new TextDecoder("euc-kr").decode(buffer);
        return new Promise((resolve) => {
          Papa.parse(decodedText, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data.slice(1)), // 제목 줄 제외
          });
        });
      })
  );

  Promise.all(fetchPromises)
    .then((allDataGroups) => {
      // allDataGroups는 [[성동구 데이터들], [용산구 데이터들]] 형태입니다.
      // .flat()을 써서 하나로 합칩니다.
      const combinedData = allDataGroups
        .flat()
        .map((row, index) => ({
          id: String(index + 1), // 전체 리스트에 대한 새 ID 부여
          name: row[1] ? String(row[1]).trim() : "이름 없음",
          address: row[2] ? String(row[2]).trim() : "주소 없음",
          distance: parseFloat((Math.random() * 2 + 0.1).toFixed(1)),
        }))
        .filter((gym) => gym.name !== "이름 없음" && gym.name !== "상호명");

      console.log("합쳐진 총 데이터 개수:", combinedData.length);
      setGyms(combinedData);
      setLoading(false);
    })
    .catch((err) => {
      console.error("데이터 합치기 실패:", err);
      setLoading(false);
    });
}, []);
export default GymPageIn;
