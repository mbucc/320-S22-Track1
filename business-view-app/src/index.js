import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*const element = <h1 className = "testClass">Welcome</h1>;

ReactDOM.render(element, document.getElementById("root"));

const newElement = <h1 className = "testClass">Understanding</h1>;

ReactDOM.render(newElement, document.getElementById("app"));*/

/*const element = (
    <div className = "testClass">
        <h1>GIBBERISH</h1>
        <h1>More Gibberish</h1>
    </div>
);

ReactDOM.render(element, document.getElementById("root"));*/

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);



 
      
