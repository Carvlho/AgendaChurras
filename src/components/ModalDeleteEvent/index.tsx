import "./modalDelete.styles.css";

type ModalErrorProps = {
  isOpen: boolean;
  close: () => void;
  deleteEvent: () => void;
};

export function ModalDeleteEvent({
  isOpen,
  close,
  deleteEvent,
}: ModalErrorProps) {
  return (
    <div
      className={isOpen ? "modalContainer show" : "modalContainer"}
      onClick={close}
    >
      <div className="modalContent">
        <h3>Tem certeza que deseja deletar este evento?</h3>
      </div>

      <div className="buttonContainer">
        <button className="button-modal confirm" onClick={deleteEvent}>
          Sim
        </button>
        <button className="button-modal negative" onClick={close}>
          Não
        </button>
      </div>
    </div>
  );
}
