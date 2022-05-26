import { useRef, useState } from "react";

const BoardItem = ({ onEdit, onDelete, title, content, created_date, id }) => {
  const localContentInput = useRef();
  const [localContent, setLocalContent] = useState(content);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleDelete = () => {
    if (window.confirm("게시글을 정말 삭제하시겠습니까?")) onDelete(id);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm("글을 수정하시겠습니까?")) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div>
        <span>제목 :{title}</span>
        <br />
        <span>{new Date(created_date).toLocaleString()}</span>
      </div>
      <div>
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default BoardItem;
