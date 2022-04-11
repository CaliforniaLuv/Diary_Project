import { useState } from "react";
import { useNavigate } from "react-router";
import MyButton from "../UI/MyButton";
import DiaryItem from "../DiaryItem/DiaryItem";

import "./DiaryList.css";
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((el, idx) => (
        // option의 el.value는
        // select의 onChange에 전달
        <option key={idx} value={el.value}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

function DiaryList({ diaryList }) {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessDiaryList = () => {
    // 최신순 오래된순 sort 구별 함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.data) - parseInt(a.data);
      } else {
        return parseInt(a.data) - parseInt(b.data);
      }
    };

    // 감정 판별 함수(전부다는 제외)
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // 원본 배열 데이터 건들지 않기 위해
    // const copyList = diaryList.slice();
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 전부다일 경우 copyList 통쨰로 sort 과정감
    const filteredList =
      filter === "all" ? copyList : copyList.filter((el) => filterCallback(el));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessDiaryList().map((el) => (
        <DiaryItem key={el.id} {...el} />
      ))}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
