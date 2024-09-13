import React, { useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";

const DateRangeTrack = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dateRangeData, setDateRangeData] = useState();

  const search = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACK_END_URL
        }/stats/date-range?startDate=${startDate}&endDate=${endDate}`
      );
      setDateRangeData(data?.result);
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
          <h1 className=" text-black font-semibold text-center text-2xl">
            Enter Date To Track{" "}
          </h1>
          <div className="flex text-black items-center flex-row mt-5 justify-evenly">
            <label htmlFor="" className="flex flex-col">
              From
              <input
                type="date"
                className="p-2 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <h1 className="text-2xl font-semibold text-black">To</h1>
            <label htmlFor="" className="flex flex-col">
              From
              <input
                type="date"
                className="p-2 rounded-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button
              className="bg-[#27005d] py-2 px-5 text-white font-semibold rounded-md"
              onClick={search}
            >
              Search
            </button>
          </div>
          <div className="mt-10">
            {dateRangeData?.map((item) => (
              <div className="text-white bg-[#27005d] my-2 p-2 rounded-md">
                <p>Book Name :- {item?.bookName}</p>
                <p>Issue Date :- {item?.issueDate?.toLocaleString()}</p>
                <p>user Name :- {item?.userName}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DateRangeTrack;
