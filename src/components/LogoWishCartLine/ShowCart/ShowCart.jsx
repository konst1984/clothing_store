import { useSelector } from "react-redux";
import { selectTotalAmount } from "feature/slices/cartSlice";
import React, { useEffect, useState } from "react";
import { Cart } from "../../Cart";
import { useLocation } from "react-router-dom";

const ShowCart = () => {
  const totalAmount = useSelector(selectTotalAmount);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <button
      className="flex flex-row items-center cursor-pointer pr-2 pl-1 rounded-2xl h-[50px]"
      onClick={handleOpen}
    >
      {totalAmount > 0 ? (
        <span className="rounded-full text-white font-semibold bg-red-700 px-2 font-inter mr-1 w-10 h-10 flex items-center justify-center text-lg">
          {totalAmount}
        </span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#000"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      )}
      <p className=" font-inter text-base font-medium tracking-normal leading-none text-center">
        Shopping bag
      </p>
      <div>{open && <Cart openModal={open} setOpen={handleClose} />}</div>
    </button>
  );
};

export default ShowCart;
