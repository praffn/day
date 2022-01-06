import "./App.css";

import useDay from "./day";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
});

function App() {
  const { points, date, guess, state } = useDay();

  return (
    <div className="main">
      {/* <p>Points: {points}</p> */}
      <p className="date">{dateFormatter.format(date)}</p>
      <p
        className={`points ${
          points === 0 ? "zero" : points < 0 ? "negative" : "positive"
        }`}
      >
        <span>{points}</span>
      </p>
      <div className="buttons">
        <button className="button" onClick={() => guess(1)}>
          Monday
        </button>
        <button className="button" onClick={() => guess(2)}>
          Tuesday
        </button>
        <button className="button" onClick={() => guess(3)}>
          Wednesday
        </button>
        <button className="button" onClick={() => guess(4)}>
          Thursday
        </button>
        <button className="button" onClick={() => guess(5)}>
          Friday
        </button>
        <button className="button" onClick={() => guess(6)}>
          Saturday
        </button>
        <button className="button" onClick={() => guess(0)}>
          Sunday
        </button>
      </div>
    </div>
  );
}

export default App;
