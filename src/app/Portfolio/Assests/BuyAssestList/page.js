"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { jwtDecode } from "jwt-decode";


export default function Main() {
    const router = useRouter();


    const [portfoliodata, setportfoliodata] = useState("");
    const fetchdata = async () => {
        let APFOS_useremail = localStorage.getItem("APFOS_useremail");
        console.log(APFOS_useremail)
        const res = await fetch(`http://localhost:3000/api/portfolio/Assest/BuyAssestList`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: APFOS_useremail }),
        });
        const response = await res.json();
        console.log(response)
        setportfoliodata(response.error);
        
    }


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
            if(decoded.role=="user"){
              fetchdata(); 
              }
              if(decoded.role=="admin"){
                router.push('/dashboard');
              }  
          }
        }else{
          router.push('/login')
        }
      },[]);


    // useEffect(() => {
    //     fetchdata();
    // }, [])
    return (
        <div className="mx-auto m-4 md:m-8 md:px-16 px-2">
      <h1 className="mx-auto bg-white p-2 rounded w-fit text-3xl font-semibold mb-4">
        All Assets
      </h1>
      <div className=" bg-white shadow-md rounded-lg md:overflow-hidden overflow-scroll">
       

        <div className="relative overflow-x-auto overflow-y-hidden">
          <table className="w-full px-4 text-md text-left  text-black ">
            <thead className="text-md text-white uppercase bg-blue-400 ">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  Asset Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Sell
                </th>
              </tr>
            </thead>
            <tbody>
              {portfoliodata && portfoliodata.map((data)=><tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4  text-gray-900 whitespace-nowrap "
                >
                  <p className="text-lg font-semibold">{data.AssestTitle}</p>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet</p>
                </td>
                <td className="px-6 py-4">{data.AssestTotalPrice}</td>
                <td className="px-6 py-4">{data.Profit[data.Profit.length]}</td>
                
                <td className="px-6 py-4">
                  <button className="text-red-500 border py-1 px-2 rounded hover:text-red-700 hover:font-bold focus:outline-none">
                    Sell
                  </button>
                </td>
              </tr>)}
              

              <tr className="bg-white border-b ">
                <td className="px-6 py-4">
                  <p className="text-lg font-semibold">Assets:10</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-lg font-semibold">Price:140000</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold py-1 px-2 ">Quantity:4</p>
                </td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
        // <div className="w-full h-screen rounded p-2 md:px-16">
        //     <div className="flex justify-center items-center my-2 mb-4">
        //         <span className="text-white text-lg font-bold">Portfolio List</span>
        //     </div>
        //     <div className="w-[100%] overflow-auto">
        //         <div className="max-h-[70vh] w-[50rem] md:w-full md:p-3 bg-white rounded  p-4 md:px-2 overflow-y-scroll">
        //             <div className="sticky top-0 flex bg-blue-200 rounded items-center border-b border-gray-300 px-5 py-2">
        //                 <div className="w-[75%] ">
        //                     <p className="text-lg font-bold">Asset Name</p>
        //                 </div>
        //                 <div className="w-[18%] md:w-32 text-center mx-1">
        //                     <p className="text-lg font-bold">Price</p>
        //                 </div>
        //                 <div className="w-[24%] text-center mx-1">
        //                     <p className="mx-auto font-bold w-16 py-1 px-2">Assest Type</p>
        //                 </div>
        //                 <div className="w-[24%] text-center mx-1">
        //                     <p className="mx-auto font-bold w-16 py-1 px-2">Assest Quantity</p>
        //                 </div>
        //                 <div className="w-[24%] text-center mx-1">
        //                     <p className="mx-auto font-bold w-16 py-1 px-2">Assest Description</p>
        //                 </div>

        //                 <div className="w-[24%] text-center mx-1">
        //                     <p className="mx-auto font-bold w-16 py-1 px-2">Option</p>
        //                 </div>
        //             </div>
        //             <div className="bg-white  rounded-lg my-2">
        //                 {
        //                     portfoliodata && portfoliodata.map((data) => {
        //                         return (
        //                             <div className="flex rounded items-center border-b-2 border-gray-300 px-5 py-5" key={data._id}>
        //                                 <div className="w-[75%]">
        //                                     <p className="text-lg font-semibold">{data.AssestTitle}</p>
        //                                 </div>
        //                                 <div className="w-[18%] md:w-32 text-center mx-1">
        //                                     <p className="text-lg font-bold">{data.AssestTotalPrice}</p>
        //                                 </div>
        //                                 <div className="w-[18%] md:w-32 text-center mx-1">
        //                                     <p className="text-lg font-bold">{data.Profit[data.Profit.length]}</p>
        //                                 </div>


        //                                 <div className="w-[12%] text-center mx-1">
        //                                     <button className="text-red-500 font-bold py-1 px-2">
        //                                         Delete
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         );
        //                     })
        //                 }
        //             </div>


        //         </div>
        //     </div>
        // </div>
        // </div >

    );
}
