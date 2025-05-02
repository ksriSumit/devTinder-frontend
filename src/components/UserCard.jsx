import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, gender, about, age } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="User Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p></p>
        <p>{age + ", " + gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-center flex gap-2">
          <button className="btn btn-primary flex-1">Ignore</button>
          <button className="btn btn-secondary flex-1">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
