// import { useToast } from "../contexts/ToastProvider";
import { useEffect, useState } from "react";
import "../assests/css/toast.css";

const Toast = ({ toastList, position }) => {
  const [list, setList] = useState(toastList);
  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);
  return (
    <>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <button>X</button>
            <div className="notification-image">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Toast;
