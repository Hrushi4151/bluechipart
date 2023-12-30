import User from "../../../../models/User";
import Portfolio from "../../../../models/Portfolio"
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { pname, email, Assests } = body;
    await connectDB();
    const userdetails = await User.findOne({ email: email });
    let total = 0;
    for (let i = 0; i < Assests.length; i++) {
      console.log(Assests[i].Assest_Price)
      total += parseFloat(Assests[i].Assest_Price) * parseFloat(Assests[i].Assest_Quantity);
    }
    let data = { Price: total, date: new Date().toUTCString() }
    await Portfolio.create({ userId: userdetails._id, Assests: Assests, PortfolioName: pname, Price: total, PortfolioPrice: [data], RemainingPrice: total })
    console.log("portfolio create successfully")
    return NextResponse.json({ status: 200 }, { error: "portfolio create successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 300 }, { error: "check internet connection" });
  }
}
