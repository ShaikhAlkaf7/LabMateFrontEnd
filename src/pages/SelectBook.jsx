import React, { useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";

const SelectBook = () => {
  const [bookName, setBookName] = useState("");
  const [userName, setUserName] = useState("");
  const [books, setbooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [rent, setRent] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [rentABook, setRentABook] = useState(true);

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

  const issueBook = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/book/issue-rent-book`,
        {
          book: selectedBook,
          user: selectedUser,
          issueDate: Date.now(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const returnBook = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/book/retun-book`,
        {
          book: selectedBook,
          user: selectedUser,
          returnDate: Date.now(),
        }
      );
      console.log(data);
      setRent(data?.rent);
    } catch (error) {
      console.log(error);
    }
  };

  const setUser = (item) => {
    setSelectedUser(item?._id);
    setUserName(item?.name);
  };
  const setBook = (item) => {
    setSelectedBook(item?._id);
    setBookName(item?.name);
  };

  return (
    <div className=" grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen  ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10  ">
        <SideBar />
      </div>
      <main className="text-white h-screen lg:col-span-8 col-span-10  flex     bg-[#27005d]   overflow-auto w-full ">
        <div className="w-full rounded-md m-2 p-2 h-[98vh] overflow-hidden flex-col items-center  flex gap-2 ">
          <button
            onClick={() => setRentABook(!rentABook)}
            className=" bg-[#AED2FF] px-8 py-2 text-2xl text-black font-semibold rounded-md mb-5"
          >
            {rentABook
              ? "Click Here To  Return a Book"
              : "Click Here To Rent A Book"}
          </button>
          {rentABook && (
            <form
              onSubmit={issueBook}
              className="w-[50%] bg-[#AED2FF] rounded-md p-2"
            >
              <h1 className="text-center font-semibold text-black text-2xl ">
                Rent A Book
              </h1>
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
                  <div className="absolute w-full top-16   bg-white text-black z-50">
                    {books?.map((item) => (
                      <div
                        className=" p-1 rounded-md flex gap-3 items-center"
                        onClick={() => setBook(item)}
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
                        onClick={() => setUser(item)}
                      >
                        <p className="font-semibold text-xl ">{item?.name}</p>
                        <p className=" text-base ">{item?.email}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="text-xl font-semibold text-center  m-auto bg-[#27005d]  px-5 py-2 rounded-md text-white my-5 "
                onClick={issueBook}
              >
                Issue The Book
              </button>
              <p className="text-red-700 font-semibold">
                Note :- Issue Date will add today's date
              </p>
            </form>
          )}

          {!rentABook && (
            <form className="w-[50%] bg-[#AED2FF] rounded-md p-2">
              <h1 className="text-center font-semibold text-black text-xl">
                Renturn A Book
              </h1>

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
                  <div className="absolute w-full top-16   bg-white text-black z-50">
                    {books?.map((item) => (
                      <div
                        className=" p-1 rounded-md flex gap-3 items-center"
                        onClick={() => setBook(item)}
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
                        onClick={() => setUser(item)}
                      >
                        <p className="font-semibold text-xl ">{item?.name}</p>
                        <p className=" text-base ">{item?.email}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="text-xl font-semibold text-center  m-auto bg-[#27005d]  px-5 py-2 rounded-md text-white my-5 "
                onClick={returnBook}
              >
                Return The Book
              </button>
              <p>Rent :- {rent}</p>
              <p className="text-red-700 font-semibold">
                Note :- Return Date will add today's date
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default SelectBook;
