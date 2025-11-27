// import React from "react";
// import Footer from "./Footer";

// const Home = () => {
//     return (
//         <div className="bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen flex flex-col justify-between">
//             {/* Main Section */}
//             {/* <section className="flex flex-col md:flex-row items-center justify-center md:justify-between px-10 sm:px-20 md:px-8 py-30 md:py-10 flex-grow"> */}
//             <section className="flex flex-col md:flex-row items-center justify-center md:justify-between px-10 sm:px-20 md:px-8 pt-20 md:pt-10 pb-10 flex-grow">
//                 {/* Left Side - Text */}
//                 <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
//                         Welcome to <span className="text-cyan-600">Our WebApp</span>
//                     </h1>
//                     <p className="text-gray-700 text-sm md:text-base mb-8 max-w-md mx-auto md:mx-0">
//                         Build, manage, and grow your projects effortlessly. Our WebApp provides
//                         you with smart tools, powerful analytics, and a modern experience to
//                         make your workflow smoother than ever before.
//                     </p>
//                     <a
//                         href="#"
//                         className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
//                     >
//                         Get Started
//                     </a>
//                 </div>

//                 {/* Right Side - Image */}
//                 <div className="w-full md:w-1/2 flex justify-center">
//                     <img
//                         src="
//                            https://img.freepik.com/premium-vector/programmer-designer-developing-website-team-working-together-construct-internet-page-software-developer_102902-5719.jpg"
//                         alt="Web Application Illustration"
//                         className="w-[90%] sm:w-[80%] md:w-[85%] lg:w-[75%] xl:w-[80%] h-[380px] md:h-[460px] object-contain"
//                     />
//                 </div>
//             </section>

//             {/* Footer */}
//             <Footer />
//         </div>
//     );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Footer from "./Footer";

const Home = () => {
    const [user, setUser] = useState(null);

    // Fetch user
    const fetchUser = async () => {
        try {
            const res = await fetch("http://localhost:5000/getdata", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();
            console.log("User Found:", data);

            if (data.name) {
                setUser(data);
            }
        } catch (error) {
            console.log("User Not Logged In");
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen flex flex-col justify-between">

            {/* MAIN SECTION */}
            <section className="flex flex-col md:flex-row items-center justify-center md:justify-between px-10 sm:px-20 md:px-8 pt-28 md:pt-10 pb-10 flex-grow">

                {/* LEFT CONTENT */}
                <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">

                    {/* LOGIN BASED HEADING */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {user
                            ? <>Welcome Back, <span className="text-cyan-600">{user.name}</span> 👋</>
                            : <>Welcome to <span className="text-cyan-600">Our WebApp</span></>}
                    </h1>

                    {/*UPDATED PARAGRAPH WITH PROFESSION */}
                    <p className="text-gray-700 text-sm md:text-base mb-8 max-w-md mx-auto md:mx-0">
                        {user
                            ? `We are happy to have a ${user.work} like you here. Keep growing and creating amazing things!`
                            : "Build, manage, and grow your projects effortlessly. Our WebApp provides you with smart tools, powerful analytics, and a modern experience to make your workflow smoother than ever before."
                        }
                    </p>

                    {/* BUTTON ONLY WHEN NOT LOGGED IN */}
                    {!user && (
                        <a
                            href="/login"
                            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
                        >
                            Get Started
                        </a>
                    )}
                </div>

                {/* RIGHT IMAGE */}
                <div className="w-full md:w-1/2 flex justify-center">
                    {/* <img
                        src="https://img.freepik.com/premium-vector/programmer-designer-developing-website-team-working-together-construct-internet-page-software-developer_102902-5719.jpg"
                        alt="Web App Illustration"
                        className="w-[90%] sm:w-[80%] md:w-[85%] lg:w-[75%] xl:w-[80%] h-[380px] md:h-[460px] object-contain"
                    /> */}
                    <img
                        src="https://img.freepik.com/premium-vector/programmer-designer-developing-website-team-working-together-construct-internet-page-software-developer_102902-5719.jpg"
                        alt="Web App Illustration"
                        className="w-[90%] sm:w-[80%] md:w-[85%] lg:w-[75%] xl:w-[80%] h-[380px] md:h-[460px] object-contain -mt-10 md:mt-0"
                    />

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;





