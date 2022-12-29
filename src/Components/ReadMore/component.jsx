import "./style.scss"

import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import Modal from "Components/Modal";
import useOnClickOutside from "../../Hooks/useOnClickOutside";

export const ReadMore = ({ text, limit }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const ref = useRef();
    useOnClickOutside(ref, () => setModalOpen(false));
    return <div className="read-more">
        {
            text.length > limit && <div className="text">
                {text.slice(0, limit)} <Link to="#"><span onClick={() => setModalOpen(true)}>... read more</span></Link>
            </div>
        }
        {
            text.length <= limit && <div className="text">
                {text}
            </div>
        }
        {
            isModalOpen && <Modal ref={ref} onClose={() => setModalOpen(false)}>
                {text}
            </Modal>
        }
    </div >
}