import React, { FC } from "react";
import Styles from "./styles";

const InputPrompt: FC<{
  input: string;
  output: string;
  submit: Function;
}> = ({ input, output, submit }) => {
  const [localInput, setLocalInput] = React.useState("");
  const [shownChars, setShownChars] = React.useState("");
  const [locked, setLocked] = React.useState(true);
  const rollout = async () => {
    setLocked(true);
    const _ = async (s: string = "") => {
      if (s.length <= output.length) {
        const __ = Math.ceil(Math.random() * 20 + 10);
        setShownChars(s);
        await new Promise((r: any) => setTimeout(r, __));
        return await _(`${s}${output[s.length]}`);
      }
    };
    await _();
    setLocked(false);
  };
  React.useEffect(() => {
    rollout();
  }, [output]);
  return (
    <div
      className={`arclight-w-full arclight-h-96 arclight-bg-background-secondary arclight-rounded-md arclight-p-5`}
    >
      <textarea
        onKeyDown={(e: any) => {
          if (e.keyCode === 8 && !e.target.value.split("> ")[1].length)
            e.preventDefault();
          else if (e.keyCode === 13) {
            setLocked(true);
            e.preventDefault();
            submit(localInput);
            setLocalInput("");
          }
        }}
        onChange={(e: any) => setLocalInput(e.target.value.split("> ")[1])}
        value={`[Ivy]\n${shownChars}${!locked ? `\n\n> ${localInput}` : ""}`}
        className={`arclight-w-full arclight-h-full arclight-bg-transparent arclight-resize-none arclight-outline-none${
          locked ? " arclight-pointer-events-none" : ""
        }`}
      />
    </div>
  );
};

export default InputPrompt;
