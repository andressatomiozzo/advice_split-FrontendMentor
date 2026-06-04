import React from "react";
import "./App.css";
import DividerMobile from "./assets/pattern-divider-mobile.svg?react";
import DividerDesktop from "./assets/pattern-divider-desktop.svg?react";
import Icon from "./assets/icon-dice.svg?react";
import useMedia from "./Hooks/useMedia";
import Loading from "./Components/Loading";

const App = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const mobile = useMedia("(max-width: 40rem)");

  const apiFetch = async () => {
    let response;
    let json;
    try {
      setLoading(true);
      setError(null);
      response = await fetch("https://api.adviceslip.com/advice");
      json = await response.json();
      if (!response.ok) throw new Error("There was an error with the search.");
    } catch (err) {
      setError(err);
      json = null;
    } finally {
      setLoading(false);
      setData(json);
    }
  };

  React.useEffect(() => {
    apiFetch();
  }, []);

  if (error) return <p>{error}</p>;
  if (loading) return <Loading />;
  if (data)
    return (
      <div className="wrapper">
        <h1 className="title">Advice #{data.slip.id}</h1>
        <p className="text">"{data.slip.advice}"</p>

        {mobile ? <DividerMobile /> : <DividerDesktop />}

        <button aria-label="Generate another advice" onClick={apiFetch} className="button">
          <Icon />
        </button>
      </div>
    );
  else return null;
};

export default App;
