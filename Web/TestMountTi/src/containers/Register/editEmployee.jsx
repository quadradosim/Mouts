import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import configData from "../../config.json";

const EditUser = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const root = configData.SERVER_URL;
  const getUserApi = root + "employee";
  const token = configData.TOKEN;  
 
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(getUserApi.concat("/") + id, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    fetch(getUserApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          document.getElementById('errorMessage').innerHTML = 'Network response was not ok.';
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(true);
        navigate("/register");
      })
      .catch((error) => {
        document.getElementById('errorMessage').innerHTML = error.message;
        setIsLoading(false);
      })
  };

  return (
    <div className="container">
      <div className="row">
        <div className="user-form">
          <div className="heading">
            <p>Edit Form</p>
          </div>
          <form onSubmit={handelSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handelInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handelInput}
                />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handelInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handelInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="docNumber" className="form-label">
                Document Number
              </label>
              <input
                type="text"
                className="form-control"
                id="docNumber"
                name="docNumber"
                value={user.docNumber}
                onChange={handelInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="docNumber" className="form-label">
                Manager Name
              </label>
              <select className="form-control" id="managerName" name="managerName" value={user.managerName} onChange={handelInput}>
                  <option value="employee">Employee</option>
                  <option value="leader">Leader</option>
                  <option value="director">Director</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary submit-btn">
              EDIT
            </button>
            <div className="row mb-4">
              <div className="text-danger text-center font-weight-bold" id="errorMessage"></div>
            </div>
            <div className="mt-2">
              <Link to={`/register`}>
                  Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditUser;