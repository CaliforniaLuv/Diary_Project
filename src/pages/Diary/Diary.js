import { useParams } from "react-router";

function Diary() {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <h1>Home</h1>
      <p>이곳은 홈 입니다.</p>
    </div>
  );
}

export default Diary;
