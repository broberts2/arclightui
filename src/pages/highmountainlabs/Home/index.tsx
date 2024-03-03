import React, { FC } from "react";
import { Page } from "../../../components";

import Pipe from "../../../projectcomponents/pipe";
import InputPrompt from "../../../projectcomponents/inputprompt";

const Music = new Audio();
Music.volume = 0.05;
Music.muted = true;
Music.loop = true;
let userinteraction = 0;
let init = 0;

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  const [output, setOutput] = React.useState("");
  const submit = (s: string) => {
    setInput(s);
    setOutput("");
    if (fns?.calls?.ollama_ask) fns.calls.ollama_ask({ prompt: s });
  };
  const [input, setInput] = React.useState("");
  React.useEffect(() => {
    if (!userinteraction) return;
  }, [input]);
  React.useEffect(() => {
    if (!D.ollama_ask || D.ollama_ask.response === output) return;
    setOutput(D.ollama_ask.response);
  }, [D]);
  React.useEffect(() => {
    Music.src = `https://highmountainlabs.io/arclight/static/media/65e40a8735b8895019faa245.mp3`;
    Music.addEventListener("canplay", () => {
      document.addEventListener("click", () => {
        if (userinteraction) return;
        userinteraction++;
        Music.muted = false;
        Music.play();
      });
    });
  }, []);
  React.useEffect(() => {
    if (!fns?.calls?.ollama_ask || init) return;
    init++;
    fns.calls.ollama_ask({
      prompt: "Make a brief welcome message in the words of Ivy.",
    });
  }, [fns]);
  return D && fns.calls ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: `https://highmountainlabs.io/arclight/static/media/65e3b40035b8895019faa204.jpg`,
        opacity: 0.1,
      }}
    >
      <div
        className={`arclight-w-full arclight-h-screen arclight-flex arclight-items-center arclight-justify-center`}
      >
        <div className={`arclight-col arclight-space-y-20 arclight-w-5/12`}>
          <Pipe />
          <InputPrompt input={input} output={output} submit={submit} />
        </div>
      </div>
    </Page>
  ) : null;
};

export default Home;
