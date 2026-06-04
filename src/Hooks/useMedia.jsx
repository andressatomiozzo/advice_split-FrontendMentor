import React from "react";

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);

  React.useEffect(() => {
    const changeMatch = () => {
      // window.matchMedia()  É uma API do navegador que verifica media queries. retorna T ou F
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    };

    changeMatch();
    window.addEventListener("resize", changeMatch);

    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);

  return match;
};

export default useMedia;
