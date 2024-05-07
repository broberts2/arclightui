import React, { FC } from "react";
import { Page } from "../../../components";

import Pipe from "../../../projectcomponents/pipe";
import InputPrompt from "../../../projectcomponents/inputprompt";

const REDIRECT = undefined;

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
  const submit = (prompt: string) => {
    setInput(prompt);
    setOutput("");
    fns.calls.ollama_ask({
      prompt,
      id: fns.readToken("ollama_chat_session_id")._token,
      redirect: REDIRECT,
    });
  };
  const [input, setInput] = React.useState("");
  React.useEffect(() => {
    if (!userinteraction) return;
  }, [input]);
  React.useEffect(() => {
    if (!D.ollama_ask || D.ollama_ask.message.content === output) return;
    setOutput(D.ollama_ask.message.content);
    if (
      D.ollama_ask.ollama_chat_session_id &&
      fns.readToken("ollama_chat_session_id")._token !==
        D.ollama_ask.ollama_chat_session_id
    ) {
      fns.writeToken(
        D.ollama_ask.ollama_chat_session_id,
        "ollama_chat_session_id"
      );
    }
  }, [D]);
  React.useEffect(() => {
    if (init || !fns?.calls || !fns.calls.ollama_ask) return;
    init++;
    fns.calls.ollama_ask({
      prompt: "Greetings!",
      init: true,
      redirect: REDIRECT,
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
          <Pipe title={"Mox"} />
          <InputPrompt
            fns={fns}
            input={input}
            output={output}
            submit={submit}
          />
        </div>
      </div>
    </Page>
  ) : null;
};

export default Home;
