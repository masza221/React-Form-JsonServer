import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import arrow from "../img/arrow.svg";



const EditIntern = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    internshipStart: "",
    internshipEnd: "",
  });

  const [errors, setError] = useState({
    name: "",
    email: "",
    internshipEnd: "",
  });

  useEffect(() => {
    const fetchIntern = async () => {
      const response = await fetch(`http://localhost:3001/interns/${id}`);
      const intern = await response.json();
      setData(intern);
    };
    fetchIntern();
  }, [id]);

  const validateForm = () => {
    if (data.name === "") {
      setError({ ...errors, name: "This field is required" });
      return "unvalid";
    }
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(data.email)) {
      setError({ ...errors, email: "Invalid email" });
      return "unvalid";
    }

    if (data.internshipEnd < data.internshipStart) {
      setError({
        ...errors,
        internshipEnd:
          "The end of the internship must end after it has started",
      });
      return "unvalid";
    }
    return "valid";
  };

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid === "valid") {
      fetch(`http://localhost:3001/interns/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((window.location.href = `http://localhost:3000/`));
    }
  }

  return (
    <>
      <div className="container">
        <NavLink className="back" to="/">
          {" "}
          <img width={13} src={arrow} alt="left-arrow"></img> Back to list{" "}
        </NavLink>
        <h1>Edit</h1>
        <form onSubmit={handleSubmit}>
          <div className="data">
            <label>Name*</label>
            <br />
            <input
              type="text"
              value={data.name}
              required
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
                setError({ ...errors, name: "" });
              }}
              name="name"
              className="name"
            />
            <label className="error">{errors.name}</label>
          </div>
          <div className="data">
            <label>Email*</label>
            <br />
            <input
              type="text"
              value={data.email}
              required
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                setError({ ...errors, email: "" });
              }}
              name="email"
              className="email"
            />
            <br />
            <label className="error">{errors.email}</label>
          </div>
          <div className="date">
            <label>Internship Start*</label>
            <br />
            <input
              type="datetime-local"
              required
              value={data.internshipStart}
              onChange={(e) =>
                setData({ ...data, internshipStart: e.target.value })
              }
              name="internshipStart"
            />
          </div>
          <div className="date">
            <label>Internship End*</label>
            <br />
            <input
              type="datetime-local"
              required
              value={data.internshipEnd}
              onChange={(e) => {
                setData({ ...data, internshipEnd: e.target.value });
                setError({ ...errors, internshipEnd: "" });
              }}
              name="internshipEnd"
            />
            <label htmlFor="internshipEnd" className="error">
              {errors.internshipEnd}
            </label>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default EditIntern;
