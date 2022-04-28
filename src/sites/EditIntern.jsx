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
    internshipStart: "",
    internshipEnd: "",
  });
  const [submiting, setSubmiting] = useState(false)

  useEffect(() => {
    const fetchIntern = async () => {
      const response = await fetch(`http://localhost:3001/interns/${id}`);
      const intern = await response.json();
      setData(intern);
    };
    fetchIntern();
  }, [id]);

  const validateForm = (e) => {
    const error = {}
    if (!data.name.trim()) {
     error.name = "This field is required";
    }

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(data.email)) {
      error.email = "Invalid email" ;
    }
    if(!data.internshipStart.trim())
    {
      error.internshipStart = "This field is required"
    }
    

    if (data.internshipEnd < data.internshipStart) {
      error.internshipEnd =
          "The end of the internship must end after it has started";
    }
   
    return error
  };

  function handleSubmit(e) {
    e.preventDefault();
    
   setError(validateForm(e)) 
   setSubmiting(true)
  }
  useEffect(()=> {

    const nameInput = document.querySelector('#name')
    const emailInput = document.querySelector('#email')
    const internshipStartInput = document.querySelector('#internshipStart')
    const internshipEndInput = document.querySelector('#internshipEnd')

    errors.name ? nameInput.classList.add('invalid') : nameInput.classList.remove('invalid')
    errors.email ? emailInput.classList.add('invalid') : emailInput.classList.remove('invalid')
    errors.internshipStart ? internshipStartInput.classList.add('invalid') : internshipStartInput.classList.remove('invalid')
    errors.internshipEnd ? internshipEndInput.classList.add('invalid') : internshipEndInput.classList.remove('invalid')

    console.log(errors.name)

    if(Object.keys(errors).length === 0 && submiting)  {
     
        fetch(`http://localhost:3001/interns/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(window.location.href = "http://localhost:3000/");
    }
  },[errors])

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
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
                setError({ ...errors, name: "" });
              }}
              name="name"
              id='name'
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
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                setError({ ...errors, email: "" });
              }}
              name="email"
              id='email'
              className="email"
            />
            <br />
            <label className="error">{errors.email}</label>
          </div>
          <div className="date">
            <label>Internship Start*</label>
            <br />
            <input
              type="date"
              value={data.internshipStart}
              onChange={(e) =>
                setData({ ...data, internshipStart: e.target.value })
              }
              name="internshipStart"
              id='internshipStart'
            />
            <label htmlFor="internshipStart" className="error">
              {errors.internshipStart}
            </label>
          </div>
          <div className="date">
            <label>Internship End*</label>
            <br />
            <input
              type="date"
              value={data.internshipEnd}
              onChange={(e) => {
                setData({ ...data, internshipEnd: e.target.value });
                setError({ ...errors, internshipEnd: "" });
              }}
              name="internshipEnd"
              id='internshipEnd'
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
