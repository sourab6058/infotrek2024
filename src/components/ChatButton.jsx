import React from "react";
import { Link } from "react-router-dom";
import Leaf from "../assets/Leaf";

export default function ChatButton() {
  return (
    <Link className="chat-button no-underline font-bold flex justify-around items-center min-w-[140px]">
      <Leaf />
      <div className="ml-2">CHAT NOW</div>
    </Link>
  );
}
