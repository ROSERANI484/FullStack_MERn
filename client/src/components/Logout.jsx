import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Logout = () => {

    const { dispatch } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await fetch("http://localhost:5000/logout", {
                    method: "GET",
                    credentials: "include"
                });

                dispatch({ type: "USER", payload: false });
                localStorage.removeItem("authToken");

                navigate("/login");
            } catch (error) {
                console.log("Logout Error:", error);
            }
        };

        logoutUser();
    }, []);

    return <h1 className="text-center mt-10">Logging out...</h1>;
};

export default Logout;
