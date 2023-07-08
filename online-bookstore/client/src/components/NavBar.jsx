import SearchParameters from "./SearchParameters";
import { useState, useEffect } from "react";

export default function Navbar({ setSearchKey }) {
  // const [searchKey, setSearchKey] = useState("");
  // useEffect(() => {
  //   // apiSearch
  //   // return () => {
  //   //   second
  //   // }
  //   if (searchKey.length > 0) {
  //     console.log("search for " + searchKey);
  //   }

  //   var timeout = setTimeout(() => {}, 500);
  // }, [searchKey]);

  return (
    <div className="navbar">
      <div className="base w-screen h-16 flex justify-between px-[10px] items-center border-[2px] border-slate-200 bg-slate-200">
        <a href="/">
          <div className="appName text-2xl text-slate-500">Book Store</div>
        </a>

        <div
          className={
            window.location.pathname == "/cart"
              ? "hidden"
              : "inline searchWithFilters flex items-center justify-center"
          }
        >
          <div className="searchBar">
            <input
              type="text"
              className="w-[300px] border-[.005rem] bg-slate-50 border-slate-300 rounded-lg p-1"
              placeholder="Search by title, author, category..."
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
          {/* <SearchParameters /> */}
        </div>
        <a
          href="cart"
          className={window.location.pathname == "/cart" ? "hidden" : "inline"}
        >
          <div className="cartArea mx-4 p-3 bg-blue-500 flex p-x-12 rounded-md">
            <div className="cartIcon h-[10px]">
              <img
                src="https://img.icons8.com/pastel-glyph/25/shopping-cart--v2.png"
                alt="shopping-cart--v2"
              />
            </div>
            <div className="cartTitle text-black px-2 text-bold">CART</div>
          </div>
        </a>
      </div>
    </div>
  );
}
