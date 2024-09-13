import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/book/search?name`
      );
      console.log(data);
      setBooks(data?.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
          <div className="mt-10">
            {books?.map((item) => (
              <div className="text-white bg-[#27005d] my-2 p-2 rounded-md">
                <p>Name :- {item?.name}</p>
                <p>Rent Per Day :- {item?.rentPerDay}</p>
                <p>Category :- {item?.category}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllBooks;
