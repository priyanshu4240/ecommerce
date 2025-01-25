import React from "react";
import SUCCESSIMAGE from "../assest/success.gif";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center item-center flex-col p-4 m-4 rounded">
      <img
        src={SUCCESSIMAGE}
        width={450}
        height={250}
        alt="oayment succesfull"
        className="mix-blend-multiply"
      />

      <p className="text-green-600 font-bold text-xl">Payment Successfully Completed</p>
      <Link
        to={"/order"}
        className="p-2 ptx-3 mt-5 border-green-600 font-semibold"
      >
        See Order
      </Link>
    </div>
  );
};

export default Success;
