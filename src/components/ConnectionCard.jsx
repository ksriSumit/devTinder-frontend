import React from "react";

const ConnectionCard = ({ data }) => {
  const { firstName, lastName, about, gender, photoUrl, age } = data;
  const initials = `${firstName[0]}${lastName[0]}`;

  return (
    <div className="bg-gray-800 text-white rounded-xl p-4 shadow-md space-y-3 w-full">
      <div className="flex items-center space-x-4">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="rounded-full w-12 h-12 object-cover"
          />
        ) : (
          <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold">
            {initials}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg">
              {firstName} {lastName}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {gender[0].toUpperCase()}, {age}
          </p>
        </div>
      </div>
      <div className="pl-16">
        <p className="text-sm text-gray-300">{about}</p>
      </div>
    </div>
  );
};

export default ConnectionCard;
