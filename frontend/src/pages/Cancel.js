import React from "react";
import CANCELIMAGE from "../assest/cancel.webp";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center item-center flex-col p-4 m-4 rounded">
      <img
        src={CANCELIMAGE}
        width={450}
        height={250}
        alt="payment incompleted"
        className="mix-blend-multiply"
      />

      <p className="text-red-600 font-bold text-xl align-middle">
        Payment Failed
      </p>
      <Link
        to={"/cart"}
        className="p-2 ptx-3 mt-5 border-green-600 font-semibold text-red-600 hover:bg-red-600 hover:text-white justify-center"
      >
        Go To Cart
      </Link>
    </div>
  );
};

export default Cancel;
