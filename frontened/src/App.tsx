import { Container, Slider, Stack, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSocket } from "./socket/socket";

const App = () => {
  // long story short this will give you socket
  // if you are inside of SocketProvider
  const socket = useSocket();

  // sends button clik
  const handleButtonClick = () =>
    socket.send(JSON.stringify({ buttonClick: true }));

  // slider handling
  // sending slider value
  const [sliderValue, setSliderValue] = useState(0);
  const handleSlider = (event: Event, value: number) => {
    setSliderValue(value);
    // sendes slider value to socket
    socket.send(JSON.stringify({ sliderValue }));
  };

  // reciving slider value
  useEffect(() => {
    const onMessage = (ev: MessageEvent) => {
      try {
        // JSON.parse will throw on icorrect json
        const data = JSON.parse(ev.data);

        // check's if key in data then
        if ("sliderValue" in data) {
          setSliderValue(data.sliderValue);
        }
      } catch (e) {
        console.log(e);
      }
    };

    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Stack spacing={4}>
        <Button fullWidth variant="contained" onClick={handleButtonClick}>
          Button
        </Button>
        <Stack spacing={1}>
          <Slider value={sliderValue} onChange={handleSlider} />
          <Typography>Slider</Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default App;
