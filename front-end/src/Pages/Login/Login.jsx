import "./Login.css";
import logo from "../../assets/LogoRushHour2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [res, setRes] = useState("");
    const notify = () => toast(res);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const navigate = useNavigate();

    const handeSubmit = async () => {
        axios.post("http://localhost:5001/api/users/login", data).then((res) => {
            const response = res;
            console.log(res)
            console.log(response);
            toast.success(response);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            navigate("/home");
        }).catch((err) => {
            toast.error(err.response.data.message);
        });
    }

    const [data, setData] = useState({});
    const updateData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const submit = e => {
        e.preventDefault();
    }

    return (
        <div className="loginPage">
            <div>
                <ToastContainer />
            </div>
            <div className="formContainer">
                <div className="formTitle">Attendance tracker</div>

                <form className="formular" onSubmit={submit}>
                    <div className="formWrapper">
                        <label htmlFor="email" className="formLabel">
                            Email:
                        </label>
                        <input type="text" name="email" className="formInput" onChange={updateData} />
                    </div>
                    <div className="formWrapper">
                        <label htmlFor="password" className="formLabel">
                            Parola:
                        </label>
                        <input type="password" name="password" className="formInput" onChange={updateData} />
                    </div>
                    <input className="btnLogin" type="submit" value="Submit" onClick={handeSubmit} />
                    <button className="btnSignUp" onClick={() => navigate("/signup")}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
