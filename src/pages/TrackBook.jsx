import React, { useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";

const TrackBook = () => {
  const [bookName, setBookName] = useState("");
  const [books, setbooks] = useState([]);
  const [trackData, setTrackData] = useState();

  const searchBooks = async (e) => {
    const inputValue = e.target.value.trim();
    setBookName(inputValue);

    if (!inputValue) {
      setbooks([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/book/search?name=${inputValue}`
      );
      setbooks(data?.books);
    } catch (error) {
      console.log(error);
    }
  };

  const trackBook = async (item) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/stats/track-book/${item?._id}`
      );
      setTrackData(data);
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
              Select A book
            </label>
            <input
              type="text"
              className="p-2 rounded-md text-black"
              placeholder="Enter book name here"
              required
              value={bookName}
              onChange={searchBooks}
            />
            {bookName && (
              <div className="absolute w-full top-16   bg-white text-black z-50 cursor-pointer">
                {books?.map((item) => (
                  <div
                    className=" p-1 rounded-md flex gap-3 items-center"
                    onClick={() => trackBook(item)}
                  >
                    <p className="font-semibold text-xl ">{item?.name}</p>
                    <p className=" text-base ">{item?.category}</p>
                    <p className=" text-base ">
                      {item?.rentPerDay} rupees Rent Per day
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-10 text-black">
            <p>How Many Times Issued :- {trackData?.totalIssuedCount}</p>
            <p>
              Who was the current holder of book :-{" "}
              {trackData?.currentlyIssued?.name}
            </p>
            <p>Total Rent Genrated By Book :- {trackData?.totalRent}</p>
            <h1 className="font-semibold text-2xl">Transactions</h1>
            {trackData?.transactions?.map((item) => (
              <div className="bg-[#27005d]  text-white p-3 rounded-md">
                <p>issue Date :- {item?.issueDate?.slice(0, 10)}</p>
                <p>Return Date :- {item?.returnDate?.slice(0, 10)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackBook;
