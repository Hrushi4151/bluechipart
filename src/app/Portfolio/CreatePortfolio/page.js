'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const router = useRouter();
  const [data, setdata] = useState({
    email: "",
    pname: ""
  })

  const onchange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setdata({ email: localStorage.getItem("APFOS_useremail"), [name]: val });
  };

  const handleSubmit = async (e) => {
    document.cookie = "PortfolioName=" + data.pname;
    // router.push("/Portfolio/AddAssest");
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="mb-6 md:mb-0 flex flex-row justify-center my-2">
        <p className='text-2xl text-center text-white font-bold ml-3 bg-red-500 w-auto h-auto py-1 pr-2'><span className=' bg-black text-white px-2 py-1'>Bluechip</span> Art </p>
      </div>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Create Portfolio
          </h1>
          <form className="space-y-4 md:space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Portfolio Name</label>
              <input onChange={(e) => onchange(e)} type="text" name="pname" id="pname" className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Portfolio Name" required="" />
            </div>
            <Link href="/Portfolio/AddAssest" onClick={handleSubmit} type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Next</Link>

          </form>
        </div>
        
      </div>
    </div>

  )
}

export default page
