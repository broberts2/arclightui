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
  refreshindex?: string;
  createcomment?: Function;
  editcomment?: Function;
  deletecomment?: Function;
  likecomment?: Function;
  reportcomment?: Function;
}

const Comments: FC<PropTypes> = ({
  article,
  commenter,
  createcomment,
  editcomment,
  deletecomment,
  likecomment,
  refreshindex,
  reportcomment,
}) => {
  const CommentController = (props) => {
    const [open, setOpen] = React.useState(0);
    const [content, setContent] = React.useState("");
    React.useEffect(() => {}, [props.replying]);
    return (
      <div className={`arclight-flex-col arclight-space-y-0`}>
        {commenter && Object.keys(commenter).length ? (
          <div
            className={`arclight-flex arclight-space-x-5 arclight-w-full arclight-items-end`}
          >
            <div
              className={`${
                props.commentowner ? `arclight-w-10` : `arclight-w-14`
              }`}
            >
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
                label={
                  props.commentowner ? "Add a reply..." : "Add a comment..."
                }
                key={0}
                type={"text"}
                variant={"standard"}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        ) : null}
        <div
          className={`arclight-flex arclight-space-x-5 arclight-items-center arclight-justify-end `}
          style={{
            transform: `scaleY(${open})`,
          }}
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
                  commentowner: props.commentowner
                    ? props.commentowner
                    : undefined,
                });
                setOpen(0);
                setContent("");
                if (props.setReplying) props.setReplying(false);
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
    const [replying, setReplying] = React.useState(false);
    const [childComponentsExpanded, setChildComponentsExpanded] =
      React.useState(false);
    return (
      <div
        className={`arclight-flex arclight-space-x-5 arclight-w-full arclight-mt-10`}
      >
        <div
          className={`${
            props.reply ? `arclight-w-10` : `arclight-w-14`
          } arclight-flex-col arclight-relative`}
        >
          <img
            src={props.owner.avatar}
            className={`arclight-w-full arclight-object-cover arclight-rounded-full`}
          />
          {props.childcomments && childComponentsExpanded ? (
            <div className={`flex arclight-h-full`}>
              <div
                className={`arclight-border-l-[1px] arclight-border-white arclight-h-full arclight-w-0 arclight-m-auto`}
              />
            </div>
          ) : null}
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
                {
                  icon: "thumbs-up",
                  n: props.likes,
                  show: !editing,
                  fn: () => {
                    if (!likecomment) return;
                    likecomment({
                      search: { _id: props._id },
                      index: refreshindex,
                      key: "likes",
                      articleId: article?._id,
                    });
                  },
                },
                {
                  icon: "thumbs-down",
                  n: props.dislikes,
                  show: !editing,
                  fn: () => {
                    if (!likecomment) return;
                    likecomment({
                      search: { _id: props._id },
                      index: refreshindex,
                      key: "dislikes",
                      articleId: article?._id,
                    });
                  },
                },
                {
                  text: "Reply",
                  show: !editing,
                  fn: () => (setReplying ? setReplying(!replying) : null),
                },
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
            {replying ? (
              <CommentController
                setReplying={setReplying}
                commentowner={props._id.toString()}
              />
            ) : null}
            {props.childcomments ? (
              <div>
                <div
                  className={`arclight-flex arclight-space-x-2 arclight-cursor-pointer`}
                  onClick={() =>
                    setChildComponentsExpanded(!childComponentsExpanded)
                  }
                >
                  <FontAwesome
                    icon={
                      childComponentsExpanded ? "chevron-up" : "chevron-down"
                    }
                    size={"md"}
                  />
                  <div>{Object.keys(props.childcomments).length} replies</div>
                </div>
                {childComponentsExpanded ? (
                  <div
                    className={``}
                    style={{
                      transform: `scaleY(${childComponentsExpanded ? 1 : 0})`,
                    }}
                  >
                    {props.childcomments.map((el) => (
                      <Comment {...el} reply />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };
  return article ? (
    <Styles.Container
      className={`arclight-flex-col arclight-space-y-10 arclight-p-2 lg:arclight-p-5`}
    >
      <CommentController />
      {Object.values(article.comments).map((el: any) => {
        return <Comment {...el} />;
      })}
    </Styles.Container>
  ) : null;
};

export default Comments;
