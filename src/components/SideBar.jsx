import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [slider, setSlider] = useState(false);
  return (
    <>
      <button
        className="lg:hidden z-10 p-4 text-xl text-white absolute"
        onClick={() => setSlider(!slider)}
      >
        <CiMenuBurger />
      </button>
      <aside
        className={`lg:w-full w-48 bg-[#9400FF] p-2 z-10  ${
          slider ? "block absolute top-0 left-0" : "hidden -left-80"
        } lg:block  overflow-y-auto h-screen transition-all duration-500  `}
      >
        <button className="lg:hidden z-10" onClick={() => setSlider(!slider)}>
          <IoClose />
        </button>
        {/* dashboard */}
        <div className="my-5 mx-4">
          <h5 className="font-semibold uppercase my-2 mx-0 ">* Logo *</h5>
          <ul className="flex flex-col gap-1">
            <li className="py-[7px] px-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                All Books
              </NavLink>
            </li>

            <li className="py-[7px] px-4">
              <NavLink
                to="/select-book"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                Select a Book
              </NavLink>
            </li>

            <li className="py-[7px] px-4">
              <NavLink
                to="/track-book"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                Track A Book
              </NavLink>
            </li>

            <li className="py-[7px] px-4">
              <NavLink
                to="/track-user"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                Book Issued To User
              </NavLink>
            </li>

            <li className="py-[7px] px-4">
              <NavLink
                to="/date-range-track"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                Track Date Ranges
              </NavLink>
            </li>

            <li className="py-[7px] px-4">
              <NavLink
                to="/all-users"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                All Users
              </NavLink>
            </li>

            <li className="py-[7px] px-4">
              <NavLink
                to="/all-books"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                All Books
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
