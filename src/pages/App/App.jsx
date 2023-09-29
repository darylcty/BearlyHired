import debug from "debug";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

export default function App() {
  return (
    <>
      <main className="App">App</main>;
    </>
  );
}
