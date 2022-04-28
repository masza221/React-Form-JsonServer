import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import pencil from "../img/pencil.svg";

const InternList = () => {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await fetch("http://localhost:3001/interns");
      const interns = await response.json();
      setInterns(interns);
    };
    fetchInterns();
  }, []);

  return (
    <div className="container">
      <h1>Participants</h1>
      <div className="internList">
        {interns.map((u) => (
          <div className="intern" key={u.id}>
            {u.name}
            <NavLink to={`/interns/${u.id}`}>
              <img width={12} src={pencil} alt="pecil"></img> Edit
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternList;
