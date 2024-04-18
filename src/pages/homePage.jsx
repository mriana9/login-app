import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //fetch user data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(location?.state?.userData);
    //console.log(location.state?.userData);
  }, [location.state?.userData]);

  const logout = () => {
    setUserData(null);
    navigate("/login");
  };

  const imageSrc =
    userData && userData.image ? userData.image : "fallback-image.jpg";

  return (
    <div className="flex flex-col max-w-md mt-14  m-auto bg-white rounded-xl overflow-hidden shadow-md">
      <img
        className="h-48 w-full object-contain"
        src={imageSrc}
        alt="user image"
      />
      <div className="p-6">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {userData?.firstName} {userData?.lastName}
        </div>
        <p className="mt-2 text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris.
        </p>
        <div className="flex-auto  text-slate-400 pt-5">
          <p> {userData?.username}</p>
          <p>{userData?.email}</p>
          <p>{userData?.gender}</p>
        </div>
        <button
          className="h-10 w-full  mt-3 px-6 font-semibold rounded-full bg-violet-600 text-white"
          onClick={logout}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
