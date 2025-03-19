import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import configData from "../../config.json";

const Register = () => {

  const root = configData.SERVER_URL;
  const showUserApi = root + "employee";
  const token = configData.TOKEN;;
  
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(showUserApi.concat("/") + id, {
        method: "DELETE", headers: {"Authorization" : `Bearer ${token}`} 
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(showUserApi, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
              <div className="container-fluid">
                <div className="navbar-brand" href="#">
                  <span className="navbar-text">Employee CRUD</span>
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#mynavbar"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="create-user">
                        Create User
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="mt-5">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Manager Name</th>
                    <th>Document Number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((item, i) => {
                    return (
                      <tr key={i + 1}>
                        <td>{i + 1}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.managerName}</td>
                        <td>{item.docNumber}</td>
                        <td>
                          <div className="row">
                            <div className="col-2">
                              <Link to={`/edit-user/${item.id}`}>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                              </Link>
                            </div>
                            <div className="col-2">
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                                onClick={() => handelDelete(item.id)}
                              ></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
};

export default Register;