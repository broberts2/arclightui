import React, { FC } from "react";
import Styles from "./styles";

import Button from "../button";
import FontAwesome from "../fontawesome";
import TextField from "../textfield";

export interface PropTypes {
  fns: any;
  D: any;
  operation: string;
  id?: string;
}

const FileLoader: FC<PropTypes> = ({ fns, D, operation, id }) => {
  const inputRef = React.useRef(null);
  const MAX_HEIGHT = 72;
  const [previewUrl, setPreviewUrl] = React.useState<any>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [filename, setFilename] = React.useState<string | null>(null);
  const determineType = (s: string, url: string) => {
    const className = `arclight-w-full arclight-object-cover`;
    if (s === "image/jpeg" || s === "image/png")
      return <img src={previewUrl} className={className} />;
    else if (s === "video/mp4")
      return (
        <video autoPlay loop muted src={previewUrl} className={className} />
      );
  };
  return (
    <Styles.Container
      className={`arclight-w-full arclight-p-10 arclight-flex-col arclight-space-y-5`}
    >
      <div
        className={`arclight-rounded-md arclight-overflow-hidden arclight-max-h-${MAX_HEIGHT} arclight-relative`}
      >
        {previewUrl && file ? (
          determineType(file.type, previewUrl)
        ) : (
          <div
            className={`arclight-w-full arclight-h-${MAX_HEIGHT} arclight-bg-background-primary arclight-flex arclight-items-center arclight-justify-center arclight-p-10`}
          >
            <div
              className={`arclight-border-[1px] arclight-rounded-full arclight-w-44 arclight-h-44 arclight-flex arclight-items-center arclight-justify-center`}
            >
              <FontAwesome size={"4x"} icon={"cloud-arrow-up"} />
            </div>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          className={`arclight-opacity-0 arclight-absolute arclight-top-0 arclight-left-0 arclight-w-full arclight-h-full arclight-cursor-pointer`}
          onChange={(event: any) => {
            setPreviewUrl(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
            setFilename(event.target.files[0].name);
          }}
        />
      </div>
      {file && filename ? (
        <TextField
          span
          hot
          defaultValue={filename}
          onChange={(e: any) => setFilename(e.target.value)}
          type={"text"}
          key={0}
          label={"Name"}
          variant="standard"
        />
      ) : null}
      <Button
        span
        disabled={!file}
        className={``}
        label={"Submit"}
        type={"button"}
        size={"normal"}
        animation={true}
        onClick={() => {
          if (!fns?.calls || !fns.calls[`${operation}records_media`]) return;
          try {
            fns.calls[`${operation}records_media`]({
              _id: id ? id : undefined,
              nopanelchange: operation === "update" ? !id : true,
              filename,
              file,
            });
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </Styles.Container>
  );
};

export default FileLoader;
