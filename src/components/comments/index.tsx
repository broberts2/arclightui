import React, { FC } from "react";
import Styles from "./styles";
import FontAwesome from "../fontawesome";
import TextField from "../textfield";
import Button from "../button";

export interface PropTypes {
  article?: {
    [key: string]: any;
  };
  commenter?: {
    [key: string]: any;
  };
  createcomment?: Function;
  editcomment?: Function;
  deletecomment?: Function;
  likecomment?: Function;
  dislikecomment?: Function;
  reportcomment?: Function;
}

const Comments: FC<PropTypes> = ({
  article,
  commenter,
  createcomment,
  editcomment,
  deletecomment,
  likecomment,
  dislikecomment,
  reportcomment,
}) => {
  const CommentController = (props) => {
    const [open, setOpen] = React.useState(0);
    const [content, setContent] = React.useState("");
    return (
      <div className={`arclight-flex-col arclight-space-y-0`}>
        <div
          className={`arclight-flex arclight-space-x-5 arclight-w-full arclight-items-start`}
        >
          <div className={`arclight-w-14`}>
            <img
              src={commenter?.avatar}
              className={`arclight-w-full arclight-object-cover arclight-rounded-full`}
            />
          </div>
          <div className={`arclight-w-full`}>
            <TextField
              span
              hot
              multiline
              value={content}
              onSelect={() => setOpen(1)}
              label={"Add a comment..."}
              key={0}
              type={"text"}
              variant={"standard"}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div
          className={`arclight-flex arclight-space-x-5 arclight-items-center arclight-justify-end`}
          style={{ transform: `scaleY(${open})` }}
        >
          <div
            className={`arclight-text-xs arclight-cursor-pointer`}
            onClick={() => {
              setContent("");
              setOpen(0);
            }}
          >
            Cancel
          </div>
          <div>
            <Button
              type={"standard"}
              size={"md"}
              animation={true}
              label={"Comment"}
              onClick={() => {
                if (!createcomment) return;
                createcomment({
                  content,
                  articleowner: article?._id,
                });
                setOpen(0);
                setContent("");
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  const Comment = (props) => {
    const originalcontent = props.content;
    const [content, setContent] = React.useState(props.content);
    const [editing, setEditing] = React.useState(false);
    return (
      <div className={`arclight-flex arclight-space-x-5 arclight-w-full`}>
        <div className={`arclight-w-14`}>
          <img
            src={props.owner.avatar}
            className={`arclight-w-full arclight-object-cover arclight-rounded-full`}
          />
        </div>
        <div className={`arclight-flex-grow-1 arclight-w-full`}>
          <div
            className={`arclight-flex-col arclight-items-start arclight-space-y-2`}
          >
            <div
              className={`arclight-flex arclight-items-center arclight-space-x-5`}
            >
              <div className={`arclight-text-md`}>{props.owner.username}</div>
              <div className={`arclight-text-xs`}>{props.date}</div>
              {props.updated ? (
                <div className={`arclight-text-xs`}>
                  (edited - {props.updated})
                </div>
              ) : null}
            </div>
            {editing ? (
              <div className={`arclight-w-full`}>
                <TextField
                  span
                  hot
                  multiline
                  value={content}
                  onSelect={() => null}
                  label={null}
                  key={0}
                  type={"text"}
                  variant={"standard"}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            ) : (
              <div className={`arclight-text-sm`}>{content}</div>
            )}
            <div
              className={`arclight-flex arclight-space-x-5 arclight-items-center`}
            >
              {[
                { icon: "thumbs-up", n: props.likes, show: !editing },
                { icon: "thumbs-down", n: props.dislikes, show: !editing },
                { text: "Reply", show: !editing },
                {
                  text: "Edit",
                  show: props.owner._id === commenter?._id && !editing,
                  fn: () => {
                    setEditing(!editing);
                    if (editing) setContent(originalcontent);
                  },
                },
                {
                  text: "Delete",
                  show: props.owner._id === commenter?._id && !editing,
                  fn: () => {
                    if (!deletecomment) return;
                    deletecomment({
                      _id: props._id,
                    });
                  },
                },
                {
                  text: "Undo",
                  show: editing,
                  fn: () => {
                    setEditing(!editing);
                    if (editing) setContent(originalcontent);
                  },
                },
              ]
                .filter((c: any) => c.show === undefined || c.show)
                .map((el: any) =>
                  el.icon ? (
                    <div
                      className={`arclight-flex arclight-space-x-2 arclight-items-center`}
                    >
                      <FontAwesome
                        icon={el.icon}
                        size={"md"}
                        className={`arclight-cursor-pointer`}
                        onClick={el.fn}
                      />
                      {el.n ? (
                        <div className={`arclight-text-sm`}>{el.n}</div>
                      ) : null}
                    </div>
                  ) : (
                    <div
                      className={`arclight-text-sm arclight-cursor-pointer`}
                      onClick={el.fn}
                    >
                      {el.text}
                    </div>
                  )
                )}
              {editing ? (
                <div>
                  <Button
                    type={"standard"}
                    size={"md"}
                    animation={true}
                    label={"Update"}
                    onClick={() => {
                      if (!editcomment) return;
                      editcomment({
                        _id: props._id,
                        content,
                      });
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Styles.Container
      className={`arclight-flex-col arclight-space-y-10 arclight-p-2 lg:arclight-p-5 arclight-mt-10`}
    >
      <CommentController />
      {(article || {}).comments.map((el: any) => {
        return <Comment {...el} />;
      })}
    </Styles.Container>
  );
};

export default Comments;
