import React, { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Styles from "./styles";

export interface PropTypes {
  value: string;
  onChange: Function;
  hot?: boolean;
}

const Quill: FC<PropTypes> = ({ value, onChange, hot }) => {
  const quillref = React.useRef(null);
  return (
    <Styles.Container
      onBlur={() => {
        if (!hot) {
          //@ts-ignore
          onChange(quillref.current.value);
        }
      }}
    >
      <ReactQuill
        ref={quillref}
        theme="snow"
        value={value}
        onChange={(value: string) => (hot ? onChange(value) : undefined)}
      />
    </Styles.Container>
  );
};

export default Quill;
