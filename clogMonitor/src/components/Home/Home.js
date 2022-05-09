import React from "react";
import AppBarChart from "../Charts/AppBarChart";
import WelcomeTynography from "../WelcomeTynography/WelcomeTynography";
import FeaturedInfo from "../featuredInfo/FeaturedInfo";
import ErrorLogPane from "../ErrorLogPane/ErrorLogPane";
import "./Home.css";
import { CircularProgress } from '@mui/material';

function Home({ logEvents, loading }) {
  return (
    <div className="Home">
      <div className="Home__WelcomeTynography">
        <WelcomeTynography />
      </div>
      <div className="Home__featureInfo">
        <div classNmae="Home__FeaturedInfo">
          {(!loading) ? <FeaturedInfo 
            logEvents={logEvents} />: <CircularProgress/>}
        </div>
      </div>

      <div className="Home__subscreen">
        <div className="Home__Charts">
          {(!loading) ? <AppBarChart
            logEvents={logEvents} /> : <CircularProgress />}

        </div>
        <div className="Home___ErrorLogPane">
          {(!loading) ? <ErrorLogPane
            logEvents={logEvents}

          /> : <div></div>}

        </div>
      </div>
    </div>
  );
}

export default Home;
