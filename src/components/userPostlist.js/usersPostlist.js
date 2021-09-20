import React from "react";

export default function UsersPostlist() {
  return (
    <div className="Postcard">
      <p>
        <button className="Userbutton" onClick={() => Userhandle(names)}>
          {names}
          <span className="Post">
            {data.filter((users) => users.from_name === names).length}
          </span>
        </button>
      </p>
    </div>
  );
}
