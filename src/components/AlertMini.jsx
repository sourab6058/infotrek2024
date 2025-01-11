import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

let timerId;

let variantTheme = {
  danger: { icon: "❌", color: "red" },
  warning: { icon: "⚠️", color: "yellow" },
  primary: { icon: "ℹ️", color: "blue" },
  success: { icon: "✅", color: "green" },
};

function Alert({ message, title, setShow, variant }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("Alert");
    timerId = setInterval(
      () => setProgress((oldProgress) => oldProgress + 1),
      80
    );
    setTimeout(() => {
      setShow(false);
      clearInterval(timerId);
    }, 5000);
  }, []);

  return (
    <div
      className={`sticky bottom-[1vh] left-[50%]  md:translate-x-[-50%] translate-x-[0] w-[400px] bg-slate-200 rounded p-2 shadow`}
    >
      <div className=" flex align-center justify-content-between">
        <span className="font-bold">{`${variantTheme[variant].icon} ${title}`}</span>
        <span className="hover:cursor-pointer" onClick={() => setShow(false)}>
          ✖
        </span>
      </div>
      <div>
        <span className="text-sm">{message}</span>
      </div>
      <div>
        <ProgressBar now={progress} style={{ height: "3px" }} />
      </div>
    </div>
  );
}

export default function AlertMini({ message, title, show, setShow, variant }) {
  return (
    <>
      {show && (
        <Alert
          message={message}
          title={title}
          setShow={setShow}
          variant={variant}
        />
      )}
    </>
  );
}
