import React, { FC } from "react";
import Styles from "./styles";
import { Button } from "../components";

const InputPrompt: FC<{
  input: string;
  output: string;
  submit: Function;
  fns: any;
}> = ({ input, output, submit, fns }) => {
  const ref = React.useRef(null);
  const scrolldown = () => {
    //@ts-ignore
    if (ref?.current) {
      //@ts-ignore
      ref.current.scrollTop = ref?.current?.scrollHeight;
    }
  };
  const [localInput, setLocalInput] = React.useState("");
  const [shownChars, setShownChars] = React.useState("");
  const [locked, setLocked] = React.useState(true);
  const rollout = async () => {
    setLocked(true);
    const _ = async (s: string = "") => {
      if (s.length <= output.length) {
        const __ = Math.ceil(Math.random() * 2);
        setShownChars(s);
        await new Promise((r: any) => setTimeout(r, __));
        scrolldown();
        return await _(`${s}${output[s.length]}`);
      }
    };
    await _();
    setTimeout(() => {
      scrolldown();
      setLocked(false);
      setLocalInput("");
    }, 350);
  };
  React.useEffect(() => {
    if (output && output.length) rollout();
  }, [output]);
  return (
    <div
      className={`arclight-w-full arclight-h-96 arclight-bg-background-secondary arclight-rounded-md`}
    >
      <textarea
        ref={ref}
        onKeyDown={(e: any) => {
          if (e.keyCode === 8 && !e.target.value.split("> ")[1].length)
            e.preventDefault();
          else if (e.keyCode === 13) {
            if (!localInput?.length) return e.preventDefault();
            setLocked(true);
            setShownChars("");
            e.preventDefault();
            submit(localInput);
            setLocalInput("");
          }
        }}
        onChange={(e: any) => setLocalInput(e.target.value.split("> ")[1])}
        value={`${shownChars}${!locked ? `\n\n> ${localInput}` : ""}`}
        className={`arclight-w-full arclight-h-full arclight-bg-transparent arclight-resize-none arclight-outline-none${
          locked ? " arclight-pointer-events-none" : ""
        } arclight-p-5`}
      />
      <Button
        onClick={() => {
          fns.writeToken(undefined, "ollama_chat_session_id");
          window.location.reload();
        }}
        label={"start new conversation"}
        type={""}
        size={"md"}
        span
        animation={false}
        className={
          fns.readToken("ollama_chat_session_id")._token && !locked
            ? `arclight-opacity-100`
            : `arclight-opacity-30 arclight-pointer-events-none`
        }
      />
    </div>
  );
};

export default InputPrompt;
