import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import configData from "../../config.json";

const CreateUser = () => {

    const navigate = useNavigate();
    const root = configData.SERVER_URL;
    const createUserApi = root + "employee";
    const token = configData.TOKEN;;

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""
    })

    function isOverEighteen(year, month, day) {
        var now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
        var dob = year * 10000 + month * 100 + day * 1; 
      
        return now - dob >= 180000;
    }

    function isRigthManagerName(formManagerName) {

        let validation = true;

        let currentUserManageName =  localStorage.getItem("site");

        if (currentUserManageName == 'leader' && formManagerName == 'director')
        {
            validation = false;
        }
        else if (currentUserManageName == 'employee' && formManagerName != 'employee')
        {
            validation = false;
        }
      
        return validation;
    }

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault(); 

        let validation = true;
        let message = '';

        const birthDay = user.birthDay.split('/');

        if(!isOverEighteen(birthDay[2],birthDay[1],birthDay[0]))
        {
            validation = false;
            message = 'User need to have more then 18 years old.'
        } 
        else if(!isRigthManagerName(user.managerName))
        {
            validation = false;
            message = 'You cannot create a user with higher permissions than yours.'
        }

        if(validation)
        {
            try {
                setIsLoading(true);
                const response = await fetch(createUserApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                    body: JSON.stringify(user),
                });
    
                if (response.ok) {     
                    setUser({name: "",email: "",phone: ""})
                    navigate('/register');
                } else {
                    document.getElementById('errorMessage').innerHTML = 'Error saving the form.';
                }
    
            } catch (error) {
                document.getElementById('errorMessage').innerHTML = error.message;
            } finally{
                setIsLoading(false);
            }
        }
        else
        {
            document.getElementById('errorMessage').innerHTML = message;
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className='user-form'>
                    <div className='heading'>
                        <p>User Form</p>
                    </div>
                    <form onSubmit={handelSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName} onChange={handelInput} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={handelInput} required  />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handelInput} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Phone (if you have more then one phone split tem with coma please.)</label>
                            <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handelInput} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="managerName" className="form-label">Manager Name</label>
                            <select className="form-control" id="managerName" name="managerName" value={user.managerName} onChange={handelInput} required>
                                <option value=""></option>
                                <option value="employee">Employee</option>
                                <option value="leader">Leader</option>
                                <option value="director">Director</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="docNumber" className="form-label">Document Number</label>
                            <input type="text" className="form-control" id="docNumber" name="docNumber" value={user.docNumber} onChange={handelInput} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthDay" className="form-label">BirthDay</label>
                            <input type="text" className="form-control" id="birthDay" placeholder='01/01/1999' name="birthDay" value={user.birthDay} onChange={handelInput} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handelInput} required />
                        </div>
                        <button type="submit" className="btn btn-primary submit-btn">Submit</button>

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
    )
}

export default CreateUser