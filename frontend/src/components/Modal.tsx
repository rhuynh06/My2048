// For game over or info popups
import styles from "../styles/Modal.module.css";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{title || "Modal"}</h2>
                    <button onClick={onClose}>✕</button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
