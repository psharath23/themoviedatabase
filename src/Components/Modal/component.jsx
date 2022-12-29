import "./style.scss"

import Button from "../Button"

export const Modal = ({ children, onClose }) => {
    return <div className="modal">
        <div className="modal-content">
            <div className="body">
                {children}

            </div>
            <div className="footer">
                <Button onClick={onClose}>close</Button>
            </div>
        </div>
    </div>
}