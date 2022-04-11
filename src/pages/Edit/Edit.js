import { useSearchParams, useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id: ", id);

  const mode = searchParams.get("mode");
  console.log("mode: ", mode);

  return (
    <div>
      <h1>Home</h1>
      <p>이곳은 홈 입니다.</p>
      <button onClick={() => setSearchParams({ who: "winterlood" })}>
        QS 바꾸기
      </button>

      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}

export default Edit;
