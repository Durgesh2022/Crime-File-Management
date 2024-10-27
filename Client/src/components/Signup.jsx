import React from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPopup({ setshowlogin }) {
    const navigate = useNavigate();
    const [currState, setCurrentState] = React.useState("login");
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
        title: "Judge",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        // e.preventDefault();
        navigate("/officer");
        // const apiUrl =
        //     currState === "login" ? "/api/user/login" : "/api/user/register";

        // try {
        //     const res = await axios.post(apiUrl, data);
        //     if (res.data.success) {
        //         localStorage.setItem("token", res.data.token);
        //         setshowlogin(false);
        //     } else {
        //         alert(res.data.message);
        //     }
        // } catch (error) {
        //     alert("An error occurred. Please try again.");
        // }
    };

    React.useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={onSubmitHandler}>
                <div className="login-popup-title">
                    <h2>{currState === "login" ? "Login" : "Sign Up"}</h2>
                    {/* <button
                        type="button"
                        onClick={() => setshowlogin(false)}
                        className="close-button"
                    >
                        &times;
                    </button> */}
                </div>
                <div className="login-popup-input">
                    {currState === "sign in" && (
                        <>
                            <input
                                type="text"
                                placeholder="Your name"
                                name="name"
                                onChange={onChangeHandler}
                                value={data.name}
                                required
                            />
                            <select
                                name="title"
                                value={data.title}
                                onChange={onChangeHandler}
                                required
                            >
                                <option value="Judge">Judge</option>
                                <option value="Police Officer">
                                    Police Officer
                                </option>
                                <option value="Investigating Officer">
                                    Investigating Officer
                                </option>
                            </select>
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        required
                    />
                </div>
                <button type="submit">
                    {currState === "sign in" ? "Create account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By clicking this you agree to terms and conditions</p>
                    {currState === "login" ? (
                        <p>
                            Create a new account{" "}
                            <span onClick={() => setCurrentState("sign in")}>
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have an account{" "}
                            <span onClick={() => setCurrentState("login")}>
                                Login here{" "}
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
