import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles/TeamCard.css";

function TeamCard({ name, pos, img, year }) {
  return (
    <div class="team_card text-center text-gray-600 dark:text-gray-300 bg-green-900 dark:bg-gray-500 p-4 rounded-md">
      {" "}
      {/* Card background */}
      <img
        class="mx-auto mb-4 w-48 h-48 rounded-md"
        src={img}
        alt={`${name}'s Avatar`}
      />
      <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-600">
        {name}
      </h3>{" "}
      {/* Text color */}
      <p>{pos}</p>
      <h5 className="text-gray-700">
        <b>{year}</b>
      </h5>
    </div>
  );
}

export default TeamCard;
