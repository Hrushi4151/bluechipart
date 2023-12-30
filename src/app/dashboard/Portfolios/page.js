"use client";
import Link from "next/link";
import react, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


const page = () => {
  const [prices, setprices] = useState({ prev: "", curr: "", rem: "" });
  const [portfoliodata, setportfoliodata] = useState([]);
  // useEffect(() => {
  //   allportfoliodata();
  // }, []);
  const allportfoliodata = async () => {
    // alert("calling ")
    const res = await fetch(
      `http://localhost:3000//api/portfolio/AllPortfolio`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: "",
      }
    );
    const response = await res.json()
    setportfoliodata(response.error); 
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token").toString();
      const decoded = jwtDecode(token);
      console.log(decoded);
      // Check for expired token
      var dateNow = new Date() / 1000;
      if (dateNow > decoded.exp) {
        alert("Your session has been expired.");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        if(decoded.role=="admin"){
          allportfoliodata();
        }
        if(decoded.role=="user"){
          router.push('/');
        }  
      }
    }
  },[]);

  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="flex flex-col justify-center items-center w-auto p-4 md:p-10 overflow-hidden">
          <div className="flex flex-wrap w-full justify-center items-center">
            <div className=" flex flex-col justify-center items-center  w-full my-2">
              <span className="text-white font-bold text-xl">
                All Portfolio
              </span>
              <Link
                href={"/dashboard/Portfolio/CreatePortfolio"}
                className="bg-blue-400 my-4 rounded p-2 text-white font-bold text-lg"
              >
                Create Portfolio
              </Link>
            </div>
            {portfoliodata &&
              portfoliodata.map((elem, index) => {
                console.log(elem);
                if (index < 6) {
                  return (
                    <div>
                      {/* <div className="card" style={{ width: "18rem", color: "white", border: "1px solid red" }}>
									<div className="card-body">
										<h5 className="card-title"><Link key={index} href={`/Portfolio/PortfolioDetails?pid=${elem._id}`}>{elem.PortfolioName}</Link>
										</h5>
										<Link onClick={() => { Cookies.set("price", `${elem.Price}`) }} style={{ width: "10vh", color: "black" }} key={index} href={`/Portfolio/Assests/BuyAssest?pid=${elem._id}`}><div className="bg-white shadow-md rounded-lg max-w-sm m-2">
											buy
										</div>
										</Link>
									</div>
								</div> */}
                      <Link
                        href={`/dashboard/Portfolio/PortfolioDetails?pid=${elem._id}`}
                        key={index}
                      >
                        <div className="bg-white shadow-md rounded-lg max-w-sm m-2">
                          <Link
                            key={index}
                            href={`/dashboard/Portfolio/PortfolioDetails?pid=${elem._id}`}
                          >
                            <h2 className="m-2 p-3 font-bold text-blue-600 text-3xl">
                              {elem.PortfolioName}
                            </h2>
                          </Link>
                          <div className="m-2 px-4 pb-4">
                            <p>
                              <span className="text-black font-medium text-lg tracking-tight ">
                                {/* {(elem ? elem.overview : "").slice(0, 100) + "..."} */}
                                Explore Edward Babcock's board "Tri color
                                combinations" on Pinterest. See more ideas about
                                color, color combinations, color inspiration.
                              </span>
                            </p>

                            <div className="flex flex-wrap items-center justify-center my-2 mt-4">
                              <span className="text-sm font-bold m-2 px-2 py-2 rounded bg-orange-700 text-white">
                                Previous:
                                {elem.PortfolioPrice[elem.PortfolioPrice.length-2] ? elem.PortfolioPrice[elem.PortfolioPrice.length-2].Price:"N/A"}
                              </span>
                              <span className="text-sm font-bold m-2 px-2 py-2 rounded bg-green-700 text-white">
                                Current:
                                {elem.PortfolioPrice[elem.PortfolioPrice.length-1] ? elem.PortfolioPrice[elem.PortfolioPrice.length-1].Price:"N/A"}
                              </span>
                              <span className="text-sm font-bold m-2 px-2 py-2 rounded bg-pink-700 text-white">
                                Remaining:{Math.round(elem.RemainingPrice)}
                              </span>
                            </div>
                            <div className="flex items-center justify-center my-2 mt-4">
                              <span className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                View
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
