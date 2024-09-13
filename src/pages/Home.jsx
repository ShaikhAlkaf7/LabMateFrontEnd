import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState();
  const [books, setBooks] = useState();

  const searchBooks = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACK_END_URL
        }/book/search?name=${name}&price=${price}&category=${category}`
      );
      setBooks(data?.books);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/book/search`
      );
      setCategories(data?.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    searchBooks();
  }, []);

  return (
    <div className=" grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen  ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10  ">
        <SideBar />
      </div>
      <main className="text-white h-screen lg:col-span-8 col-span-10  flex     bg-[#27005d]   overflow-auto w-full ">
        <div className="w-full rounded-md m-2 p-2 h-[98vh] overflow-hidden bg-[#AED2FF]">
          {books?.map((item) => (
            <div className="bg-[#27005d] p-1 rounded-md flex gap-3 items-center">
              <p className="font-semibold text-xl ">{item?.name}</p>
              <p className=" text-base ">{item?.category}</p>
              <p className=" text-base ">
                {item?.rentPerDay} rupees Rent Per day
              </p>
            </div>
          ))}
        </div>

        <div className="w-[30%] bg-[#AED2FF] h-screen m-2 flex  items-center flex-col">
          <div className="p-5">
            <label
              htmlFor="bookName"
              className="text-black text-xl font-semibold mb-1"
            >
              Enter Book Name
            </label>
            <input
              type="text"
              id="bookName"
              className="outline-[#27005d] text-black rounded-md w-[95%] p-2 "
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter book name"
            />
          </div>

          <div className="p-5">
            <label
              htmlFor="rentRange"
              className="text-black text-xl font-semibold mb-1"
            >
              Select Rent Range
            </label>
            <input
              type="number"
              id="rentRange"
              className="outline-[#27005d] text-black rounded-md w-[95%] p-2 "
              value={0}
              disabled
            />
            <h1>To</h1>
            <input
              type="number"
              id="rentRange"
              className="outline-[#27005d] text-black rounded-md w-[95%] p-2 "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="enter price range"
            />
          </div>

          <div className="p-5">
            <select
              name=""
              id=""
              className="text-black"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">categories</option>
              {categories?.map((item) => (
                <option value={item?.categories}>{item?.category}</option>
              ))}
            </select>
          </div>
          <button
            className="text-white bg-[#27005d] text-center px-9 text-xl font-semibold py-1 rounded-md "
            onClick={searchBooks}
          >
            Filter
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
