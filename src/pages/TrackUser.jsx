import React, { useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";

const TrackUser = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();

  const searchUser = async (e) => {
    const inputValue = e.target.value.trim();
    setUserName(inputValue);

    if (!inputValue) {
      setUsers([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACK_END_URL
        }/user/search-user?name=${inputValue}`
      );
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  const searchTransacton = async (item) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/stats/track-user/${item?._id}`
      );
      setUserData(data?.transactions);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen  ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10  ">
        <SideBar />
      </div>
      <main className="text-white h-screen lg:col-span-8 col-span-10  flex     bg-[#27005d]   overflow-auto w-full ">
        <div className="w-full rounded-md m-2 p-2 h-[98vh] overflow-hidden bg-[#AED2FF]">
          <div className="mt-6 flex flex-col relative">
            <label
              htmlFor="bookName"
              className="text-xl text-black font-semibold"
            >
              Select A User
            </label>
            <input
              type="text"
              className="p-2 rounded-md text-black"
              placeholder="Enter book name here"
              required
              value={userName}
              onChange={searchUser}
            />
            {userName && (
              <div className="absolute w-full top-16   bg-white text-black z-50">
                {users?.map((item) => (
                  <div
                    className=" p-1 rounded-md flex gap-3 items-center"
                    onClick={() => searchTransacton(item)}
                  >
                    <p className="font-semibold text-xl ">{item?.name}</p>
                    <p className=" text-base ">{item?.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10">
            {userData?.map((item) => (
              <div className="text-white bg-[#27005d] my-2 p-2 rounded-md">
                <p>Book Name :- {item?.book?.name}</p>
                <p>Issue Date :- {item?.issueDate?.toLocaleString()}</p>
                <p>Return Date :- {item?.returnDate}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackUser;
