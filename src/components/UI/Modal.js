import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = () => {
    return (<div className={styles.backdrop}></div>);
}

const ModalOverlay = props => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
}

const Modal = (props) => {
    return (<Fragment>
        {ReactDOM.createPortal(<Backdrop />, document.getElementById('overlay'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlay'))}
    </Fragment>);
}

export default Modal;