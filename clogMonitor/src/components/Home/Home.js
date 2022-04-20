import React from "react";
import AppBarChart from "../Charts/AppBarChart";
import WelcomeTynography from "../WelcomeTynography/WelcomeTynography";
import FeaturedInfo from "../featuredInfo/FeaturedInfo";
import ErrorLogPane from "../ErrorLogPane/ErrorLogPane";
import "./Home.css";

function Home({ logEvents }) {
  return (
    <div className="Home">
      <div className="Home__WelcomeTynography">
        <WelcomeTynography />
      </div>
      <div className="Home__featureInfo">
        <div classNmae="Home__FeaturedInfo">
          <FeaturedInfo />
        </div>

      </div>

      <div className="Home__subscreen">
        <div className="Home__Charts">
          <AppBarChart logEvents={logEvents} />
        </div>
        <div className="Home___ErrorLogPane">
          <ErrorLogPane logEvents={logEvents} />
        </div>
      </div>
    </div>
  );
}

export default Home;
