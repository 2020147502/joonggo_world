const BoardItem = ({ onDelete, title, content, created_date, id }) => {
  return (
    <div className="DiaryItem">
      <div>
        <span>제목 :{title}</span>
        <br />
        <span>{new Date(created_date).toLocaleString()}</span>
      </div>
      <div>{content}</div>
      <button
        onClick={() => {
          if (window.confirm("게시 글을 삭제하시겠습니까?")) {
            onDelete(id);
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default BoardItem;
