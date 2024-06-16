import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import { ratingsJSON } from "./ratings.js"; 
import {topJSON} from "./top_comp.js";
import {reviewJSON} from "./reviews.js";
import {appleJSON} from "./apple.js"
import { ibmJSON } from "./ibm.js";
import { linkedinJSON } from "./linkedin.js";
import { microsoftJSON } from "./microsoft.js";
import { oracleJSON } from "./oracle.js";

const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let data;
let topCompanies = JSON.parse(topJSON);
let one=topCompanies.LinkedIn;
let two=topCompanies.Apple;
let three=topCompanies.Microsoft;
let four=topCompanies.Deloitte;
const reviewData = JSON.parse(reviewJSON);
const ratingsData=JSON.parse(ratingsJSON);
let ratings;

let analysis;
let compAnalysis;


console.log(one); 
console.log(four); // Output the first key


const Nav="CANDID CARRERS";
app.get("/",(req, res) => {
    const name="Candid Careers";
        res.render("intro",{wname:name});
});
app.get("/home", (req, res) => {
    res.render("home",{Navbar:Nav});
   });
app.get("/about",(req,res)=>{
  const h="About Us";
   res.render("about",{title:h});
});
app.get("/form",(req,res)=>{
   const review= "Employee Review";
   res.render("form",{review:review});
});
app.post("/submit-feedback",(req,res)=>{
  res.send(`
        <script>
            alert("Your feedback has been submitted successfully!");
            window.location.href = "/";
        </script>
    `);})
app.post("/submit",(req,res)=>{
     var input=req.body.comp;
     var cname=input.charAt(0).toUpperCase() + input.slice(1);
     const companyReviews = reviewData[0][cname];
     if(companyReviews){
     const reviewKeys = Object.keys(companyReviews);
     const shuffledKeys = reviewKeys.sort(() => Math.random() - 0.5);
     const randomKeys = shuffledKeys.slice(0, Math.min(10, shuffledKeys.length));
    const randomReviews = randomKeys.map(key => companyReviews[key]);
    
     switch(cname){
       case "Apple":
            data = JSON.parse(ratingsJSON)[0];
             analysis=JSON.parse(appleJSON);
            compAnalysis=analysis[0].Apple;
           
            ratings=ratingsData[0];
          
            break;
       case "Deloitte":
          data =JSON.parse(ratingsJSON)[1];
          ratings=ratingsData[1];
            break;
       case "EY":
          data = JSON.parse(ratingsJSON)[2];
          ratings=ratingsData[2];
            break;
        case "IBM":
          data = JSON.parse(ratingsJSON)[3];
          analysis=JSON.parse(ibmJSON);
            compAnalysis=analysis[0].IBM;
            ratings=ratingsData[3];
            break;
        case "JPMorgan":
          data = JSON.parse(ratingsJSON)[4];
          ratings=ratingsData[4];
            break;
        case "LinkedIn":
          data = JSON.parse(ratingsJSON)[5];
          analysis=JSON.parse(linkedinJSON);
            compAnalysis=analysis[0].LinkedIn;
            console.log(compAnalysis);
            ratings=ratingsData[5];
            break;
        case "Microsoft":
          data = JSON.parse(ratingsJSON)[6];
          analysis=JSON.parse(microsoftJSON);
            compAnalysis=analysis[0].Microsoft;
            ratings=ratingsData[6];
            break;
        case "Oracle":
          data = JSON.parse(ratingsJSON)[7];
          analysis=JSON.parse(oracleJSON);
            compAnalysis=analysis[0].Oracle;
            ratings=ratingsData[7];
            break;
        case "PwC":
          data = JSON.parse(ratingsJSON)[8];
          ratings=ratingsData[8];
            break;
         default:
             break;
     }

     res.render("comp",{company:cname,Navbar:Nav,ans:randomReviews,ratings:ratings,compAnalysis:compAnalysis,crate:data.overall_rating,first:one,second:two,third:three,fourth:four});
    }
    if(companyReviews==null){
      res.render("error", { message: "Sorry, we don't provide services for that company." });
    }
    })

app.listen(3000,()=>{
    console.log("server is running at port 3000");
});