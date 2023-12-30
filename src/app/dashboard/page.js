'use client'
import React, { useState } from "react";
import Chart from "chart.js";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";



export default function Graph() {
    const [showlist, setshowlist] = useState(false)
  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
          
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);


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
          // fetchdata();
        }
        if(decoded.role=="user"){
          router.push('/');
        }
      }
    }

  }, []);
  return (
    <>
      <div className="flex flex-col break-words w-screen md:w-[70vw] mx-auto mb-4 border-1 shadow-lg rounded bg-transparent">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-white mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Asset value</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col items-center w-[100%]">
          <div className="w-full h-[60vh] ">
            <canvas id="line-chart" className=""></canvas>
          </div>
          <Link href={'/dashboard/Portfolios'} className="w-fit text-purple-800 bg-white hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mx-2 px-2 py-2.5 text-center ">View Portfolios</Link>
        <div className="flex flex-wrap align-items-center m-2">
        <span className="text-white font-semibold text-lg mx-1 px-2 py-2.5 text-center ">Total Assets : 200</span>
        <span className="text-white font-semibold text-lg mx-1 px-2 py-2.5 text-center ">Sold : 100</span>
        <span className="text-white font-semibold text-lg mx-1 px-2 py-2.5 text-center ">Available : 100</span>
    </div>
    </div>
      </div>
    </>
  );
}