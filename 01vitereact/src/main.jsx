import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Chai from "./chai.jsx";
import Ready from "./Ready.jsx";

// we can create function here also, instead of importing from somewhere else.
function MyApp() {
    return (
        <div>
            <h1>Custom App</h1>
        </div>
    );
}

// creating an object and try to pass it to react instead of function.
const anotherElement = <a href="https://google.com">Visit google</a>;

const reactElement = React.createElement(
    'a',
    {
        href: 'https://facebook.com',
        target: '_blank',
    },
    'click me to visit Facebook'
)

ReactDOM.createRoot(document.getElementById("root")).render(
    // <Chai/>
    // <MyApp/>

    // now trying to render direct object , so you have to pass it as an object without "()" parenthesis
    //   anotherElement

    //now try with react element
    reactElement
);
