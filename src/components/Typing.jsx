import { ReactTyped, Typed } from "react-typed";

const Typing = () => (
  <div>
    <ReactTyped strings={["Hello from Neuromancers", "The programming society of IIT Bhubaneswar"]} typeSpeed={70} backDelay={1070} backSpeed={70} loop style={{
        // "fontFamily": "cursive",
        "fontSize": "3rem"
    }}/>
  </div>
);

export default Typing
