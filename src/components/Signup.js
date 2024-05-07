import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword: "" });
    const navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const hendelSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        // setNotes(notes.concat(json));
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            props.showAlert("Account created.", "success");
            navigate("/");
        }else{
            props.showAlert("invalid credential.", "danger");
        }
    }
    return (
        <div className='container'>
            <form className='col-md-5 mx-auto border rounded shadow-md p-5'>
                <h3 className='text-center'>Sign Up</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name='name' placeholder='Name' onChange={onChange} value={credentials.name} className="form-control" id="name" /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' placeholder='Email' onChange={onChange} value={credentials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' placeholder='Password' onChange={onChange} value={credentials.password} minLength={6} required className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword1" className="form-label">Confirm Password </label>
                    <input type="password" name='cpassword' placeholder='Confirm Password' onChange={onChange} value={credentials.cpassword} minLength={6} required className="form-control" id="cPassword1" />
                </div>
                <button type="button" onClick={hendelSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
