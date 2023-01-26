import "./modalError.styles.css";

type ModalErrorProps = {
  isOpen: boolean;
  close: () => void;
  text: string;
};

export function ModalError({ isOpen, close, text }: ModalErrorProps) {
  return (
    <div
      className={isOpen ? "modalContainer show" : "modalContainer"}
      onClick={close}
    >
      <div className="modalContent">
        <button onClick={close} className="iconClose">
          X
        </button>

        <h5>{text}</h5>
      </div>
    </div>
  );
}
