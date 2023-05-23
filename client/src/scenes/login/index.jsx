import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useCookies();
    const [token, setToken] = useCookies();
    const { setAuth, auth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state ? location.state.from : { pathname: "/" };

    let handleSubmit = async (e) => {
        e.preventDefault();
        var userData = {
            password: password,
            email: email,
        };
        // console.log(userData);

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/admin/login`,
            data: userData,
        }).then((response) => {
            console.log(response.data);
            // console.log(response.data.token);
            const accessToken = response.data.token;
            const userId = response.data.user_id
            // setAuth({ email, accessToken, userId });
            setCookies("user", userId, { path: '/', maxAge: 3600 })
            setToken("token", accessToken, { path: '/', maxAge: 3600 })
            console.log(accessToken);
            accessToken ? navigate(from, { replace: true }) : alert(response.data.message);
            // navigate(from, { replace: true });
        });
    };

    return (

        <div className="min-h-screen bg-fixed bg-[#171717] bg-bgPattern pt-20 overflow-hidden">
            <h1>
                Admin Login
            </h1>
            <div className="flex items-center flex-col py-5 pt-20 relative ">
                <div className="animate-pulse bg-gradient-to-br from-[#6850FF] -z-0 via-transparent to-transparent rounded-lg md:p-48 p-40 pb-0 blur-2xl absolute "></div>
                {/* <div>
                <img src={CompanyLogo} alt="Lumos Labs" />
            </div> */}
                <div className="z-0 bg-gradient-to-br from-[#FFFFFFCC] to-[#6765654d] via-[#676565ad] mt-5 rounded-lg p-[1px]">
                    <form
                        className="bg-[#202020] p-7 rounded-lg w-full md:w-[35vw] "
                        onSubmit={handleSubmit}
                    >
                        <div className="pb-5">
                            <label
                                for="email"
                                class="block mb-1 text-md font-BrinnanBold font-semibold text-white"
                            >
                                Email
                            </label>
                            <div className="bg-gradient-to-br from-[#FFFFFFCC] to-[#676565CC] via-[#676565] rounded-lg p-[1px]">
                                <input
                                    type="email"
                                    id="email"
                                    class="bg-[#1F1F1F] text-gray-100 text-sm rounded-lg font-InterRegular block w-full p-2.5 "
                                    placeholder="name@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="my-6 pb-6">
                            <label
                                for="password"
                                class="block mb-1 text-md font-BrinnanBold text-white"
                            >
                                Password
                            </label>
                            <div className="bg-gradient-to-br from-[#FFFFFFCC] to-[#676565CC] via-[#676565] rounded-lg p-[1px]">
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-[#1F1F1F] text-gray-100 text-sm rounded-lg font-InterRegular block w-full p-2.5  "
                                    placeholder="*****"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center pt-3">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                class="text-black uppercase bg-gradient-to-r from-[#2AF1FF] to-[#2dd5ff] hover:bg-gradient-to-br ease-in-out duration-500  rounded-lg text-md px-7 font-BrinnanBold py-2 tracking-wider text-center mr-2 mb-2"
                            >
                                Login
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
