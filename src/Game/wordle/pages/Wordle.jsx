import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { HeaderLayout } from "../../layout/HeaderLayout";
import { Board ,HeaderWordle,KeyBoard} from "../components";

export const Wordle = () => {
  const [letter, setLetter] = useState();
  const [changed, setChanged] = useState(false);
  const [letters, setLetters] = useState({});
  const [clicked, setClicked] = useState(0);
  const [error, setError] = useState("");

  const onClickDown = (event) => {
    if (event.key == "Enter") {
      setLetter("ENTER");
      setClicked(clicked + 1);
    } else if (event.key == "Backspace") {
      setLetter("DEL");
      setClicked(clicked + 1);
    } else if ("abcdefghijklmnopqrstuvwxyz".includes(event.key.toLowerCase())) {
      setLetter(event.key.toUpperCase());
      setClicked(clicked + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onClickDown);
    return () => window.removeEventListener("keydown", onClickDown);
  });

  const keyHandler = (letterValue) => {
    setLetter(letterValue);
    setClicked(clicked + 1);
  };

  const LettersHandler = (lettersValue) => {
    setLetters(lettersValue);
    setChanged(!changed);
  };

  return (
    <HeaderLayout>
      <Box>
        <HeaderWordle />
        <Board
          letter={letter}
          clicks={clicked}
          letters={LettersHandler}
          error={setError}
        />
        <Box
          sx={{
            height: "1rem",
          }}
        >
          {error && (
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
        <KeyBoard keyHandler={keyHandler} letters={letters} changed={changed} />
      </Box>
    </HeaderLayout>
  );
};
