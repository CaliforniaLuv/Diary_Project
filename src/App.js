import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Edit from "./pages/Edit/Edit";
import New from "./pages/New/New";
import Diary from "./pages/Diary/Diary";

// COMPONENTS
import MyButton from "./components/UI/MyButton";
import Header from "./components/Header/Header";

// REDUCER
import { reducer } from "./reducer/reducer";

// CONTEXT
import { DiaryStateContext, DiaryDispatchContext } from "./context/context";

const dummyData = [
  { id: 1, emotion: 1, content: "오늘의 일기 1번", data: 1649610097766 },
  { id: 2, emotion: 4, content: "오늘의 일기 2번", data: 1649610097767 },
  { id: 3, emotion: 2, content: "오늘의 일기 3번", data: 1649610097768 },
  { id: 4, emotion: 3, content: "오늘의 일기 4번", data: 1649610097769 },
  { id: 5, emotion: 2, content: "오늘의 일기 5번", data: 1649610097770 },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        data: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
