import { ReactTyped } from "react-typed";

const Typing = () => (
  <div className="typing-container">
    <ReactTyped
      strings={["Hello from Neuromancers", "The programming society of IIT Bhubaneswar"]}
      typeSpeed={70}
      backDelay={1070}
      backSpeed={70}
      loop
      className="typing-text"
    />
  </div>
);

export default Typing;

