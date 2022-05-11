import React from 'react'
import './featuredInfo.css'
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

export default function FeaturedInfo({ logEvents }){
    
    let dateToLogsCount = new Map();
    let Severityset = new Set();
    logEvents.forEach(e => {
        let date = e['creationTime'].toDateString();
        let Severity = e['severity']; 
        let iwe = Severity;
        let string = ""
        if(iwe <20){
            string = "Info";
        }
        else if(iwe <30){
            string = "Success";
        }
        else if(iwe < 50)
        {
            string = "Warning"
        }
        else{
            string = "Error";
        }

        Severityset.add(string);
        if(dateToLogsCount.get(date) === undefined){
            dateToLogsCount.set(date, new Map());
            dateToLogsCount.get(date).set(string,1);

        }else{
            let severitycount = dateToLogsCount.get(date);
            if(severitycount.get(string) === undefined){
                severitycount.set(string,1);
            }
            else{
                severitycount.set(string, severitycount.get(string) +1);
            }
        }
        //console.log(Severityset);
    });

    let dates = Array.from(dateToLogsCount.keys());
    let currentDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let today = dates.filter(date => {
        let dateobject = new Date(date);
        return dateobject.getTime() > currentDate.getTime() && dateobject.getTime() <= Date.now() ;
    });
    let yesterdayDate = new Date(Date.now()- 2 * 24 * 60 * 60 * 1000);
    
    let yesterday = dates.filter(date =>{
        let dateobject = new Date(date);
        return dateobject.getTime() > yesterdayDate.getTime() && dateobject.getTime() < currentDate.getTime();
    });
    const sortDates = (dates) => dates.sort(function (a, b) {
        let dateA = new Date(a);
        let dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      });

    const iwedata = (dates, data) => {
        dates.forEach(date =>{
            let value = dateToLogsCount.get(date);
            let svcount = {name: date};
            Severityset.forEach(string => {
                if(value.get(string)=== undefined){
                    svcount[string] = 0;
                }else{
                    svcount[string] = value.get(string);
                }
            })
            data.push(svcount);
        })
    }

    sortDates(yesterday);
    sortDates(today);
    let yesterdaydata =[];
    let todaydata = [];
    iwedata(today, todaydata);
    iwedata(yesterday, yesterdaydata);
   

   
  

    const arr1 = Object.values(todaydata);
    const arr2 =  Object.values(yesterdaydata);
    const sp1 = JSON.stringify(arr1);
    const sp2 = JSON.stringify(arr2);
    var x = sp1.split(",");
    var x2 = sp2.split(",");

    const trans = (str) => {
        let e,i,s,w=0;
        str.forEach(str => {
            let code = str.split(":")
               if(code[0] === '"Error"'){
                let error = code[1];
                e = parseInt(error)
           }
               if(code[0]=== '"Info"'){
                let info = code[1];
                i = parseInt(info);
               }
               if(code[0] === '"Success"'){
                let success = code[1];
                s = parseInt(success);
               }
               if(code[0] === '"Warning"'){
                let warning = code[1];
                w = parseInt(warning);
               }

                
        })
        return[e,i,s,w];
    }
    let [todayerror,todayinfo,todaysucess,todaywarning] = trans(x);
    let [yesterdayerror,yesterdayinfo,yesterdaysuccess,yesterdaywarning] = trans(x2);
   
    function DynamicIcon(current, past) {
        if (current - past === 0) {
            return <HorizontalRuleIcon />;
        }
        if (current - past > 0) {
            return <ArrowUpwardIcon className='featuredIcon' />;
        }
        else {
            return <ArrowDownwardIcon className='featuredIcon negative' />;
        }
    }

    const InfoArrow = DynamicIcon(todayinfo,yesterdayinfo);
    const SuccessArrow = DynamicIcon(todaysucess,yesterdaysuccess);
    const WarningArrow = DynamicIcon(todaywarning,yesterdaywarning);
    const ErrorArrow = DynamicIcon(todayerror,yesterdayerror);

    return(
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle"> Today's Info <InfoIcon className = 'titleIcon'/>
                </span>
                <div className='featuredContainer'>
                    <span className = "todaysnumber">{todayinfo}</span> 
                    <span className = 'compareYesterday'> {todayinfo - yesterdayinfo} {InfoArrow} 
                    </span>
                </div>
                <span className='featuredSub'>Compared to Yesterday </span>
            </div>

    
            <div className="featuredItem">
                <span className="featuredTitle"> Today's Success <CheckBoxIcon className = 'titleIcon success'/>
                </span>
                <div className='featuredContainer'>
                    <span className = "todaysnumber">{todaysucess}</span> 
                    <span className = 'compareYesterday'> {todaysucess- yesterdaysuccess} {SuccessArrow}
                    </span>
                </div>
                <span className='featuredSub'>Compared to Yesterday </span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle"> Today's Warning <WarningIcon className = 'titleIcon warning'/>
                </span>
                <div className='featuredContainer'>
                    <span className = "todaysnumber">{todaywarning}</span>
                    <span className = 'compareYesterday'> {todaywarning- yesterdaywarning} {WarningArrow}
                    </span>
                </div>
                <span className='featuredSub'>Compared to Yesterday </span>
            </div>


            <div className="featuredItem">
                <span className="featuredTitle"> Today's Error <ErrorIcon className = 'titleIcon error'/>
                </span>
                <div className='featuredContainer'>
                    <span className = "todaysnumber">{todayerror}</span>
                    <span className = 'compareYesterday'> {todayerror - yesterdayerror} {ErrorArrow}
                    </span> 
                </div>
                <span className='featuredSub'>Compared to Yesterday </span>
            </div>
        </div>

    
    )
}