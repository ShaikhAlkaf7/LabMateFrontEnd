import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SelectBook from "./pages/SelectBook";
import TrackBook from "./pages/TrackBook";
import TrackUser from "./pages/TrackUser";
import DateRangeTrack from "./pages/DateRangeTrack";
import AllUsers from "./pages/AllUsers";
import AllBooks from "./pages/AllBooks";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-book" element={<SelectBook />} />
        <Route path="/track-book" element={<TrackBook />} />
        <Route path="/track-user" element={<TrackUser />} />
        <Route path="/date-range-track" element={<DateRangeTrack />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/all-books" element={<AllBooks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
