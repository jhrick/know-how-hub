interface IDeleteBtn {
  presentationId: number;
  onClick: Function;
}

const DeletePresentationBtn = ({ presentationId, onClick }: IDeleteBtn) => {
  return (
    <button
      className="delete-presentation_btn"
      onClick={() => {
        onClick();
      }}
    >
      Delete
    </button>
  );
};

export default DeletePresentationBtn;
