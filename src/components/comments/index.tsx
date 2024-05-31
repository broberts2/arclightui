import React, { FC } from "react";
import Styles from "./styles";
import FontAwesome from "../fontawesome";
import TextField from "../textfield";
import Button from "../button";

export interface PropTypes {
  comments: Array<{ [key: string]: any }>;
}

const Comments: FC<PropTypes> = ({ comments }) => {
  const CommentController = (props) => {
    const [open, setOpen] = React.useState(0);
    const [value, setValue] = React.useState("");
    return (
      <div className={`arclight-flex-col arclight-space-y-0`}>
        <div
          className={`arclight-flex arclight-space-x-5 arclight-w-full arclight-items-start`}
        >
          <div className={`arclight-w-14`}>
            <img
              src={`https://highmountainlabs.io/cdn/arclight/media/highmountainlabs.png`}
              className={`arclight-w-full arclight-object-cover arclight-rounded-full`}
            />
          </div>
          <div className={`arclight-w-full`}>
            <TextField
              span
              hot
              multiline
              value={value}
              onSelect={() => setOpen(1)}
              label={"Add a comment..."}
              key={0}
              type={"text"}
              variant={"standard"}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <div
          className={`arclight-flex arclight-space-x-5 arclight-items-center arclight-justify-end`}
          style={{ transform: `scaleY(${open})` }}
        >
          <div
            className={`arclight-text-xs arclight-cursor-pointer`}
            onClick={() => setOpen(0)}
          >
            Cancel
          </div>
          <div>
            <Button
              type={"standard"}
              size={"md"}
              animation={true}
              label={"Comment"}
              onClick={() => null}
            />
          </div>
        </div>
      </div>
    );
  };
  const Comment = (props) => {
    return (
      <div className={`arclight-flex arclight-space-x-5 arclight-w-full`}>
        <div className={`arclight-w-14`}>
          <img
            src={props.avatar}
            className={`arclight-w-full arclight-object-cover`}
          />
        </div>
        <div className={`arclight-flex-grow-1 arclight-w-full`}>
          <div
            className={`arclight-flex-col arclight-items-start arclight-space-y-2`}
          >
            <div
              className={`arclight-flex arclight-items-center arclight-space-x-5`}
            >
              <div className={`arclight-text-md`}>{props.commenter}</div>
              <div className={`arclight-text-xs`}>{props.date}</div>
            </div>
            <div className={`arclight-text-sm`}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </div>
            <div
              className={`arclight-flex arclight-space-x-5 arclight-items-center`}
            >
              {[
                { icon: "thumbs-up", n: props.likes },
                { icon: "thumbs-down", n: props.dislikes },
                { text: "Reply" },
              ].map((el: any) =>
                el.icon ? (
                  <div
                    className={`arclight-flex arclight-space-x-2 arclight-items-center`}
                  >
                    <FontAwesome
                      icon={el.icon}
                      size={"md"}
                      className={`arclight-cursor-pointer`}
                    />
                    {el.n ? (
                      <div className={`arclight-text-sm`}>{el.n}</div>
                    ) : null}
                  </div>
                ) : (
                  <div className={`arclight-text-sm arclight-cursor-pointer`}>
                    {el.text}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Styles.Container
      className={`arclight-flex-col arclight-space-y-10 arclight-p-5`}
    >
      <CommentController />
      {comments.map((el: any) => (
        <Comment {...el} />
      ))}
    </Styles.Container>
  );
};

export default Comments;
