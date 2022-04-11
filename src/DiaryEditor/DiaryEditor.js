import { useNavigate } from "react-router";
import { useState } from "react";

import Header from "../components/Header/Header";
import MyButton from "../components/UI/MyButton";
import EmotionItem from "../components/EmotionItem/EmotionItem";

import "./DiaryEditor.css";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/emotion/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/emotion/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/emotion/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/emotion/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/emotion/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

function DiaryEditor() {
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  return (
    <div className="DiaryEditor">
      <Header
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h1>오늘은 언제인가요?</h1>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h1>오늘의 감정</h1>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((el) => (
              <EmotionItem
                key={el.id}
                {...el}
                onClick={handleClickEmotion}
                isSelected={el.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
