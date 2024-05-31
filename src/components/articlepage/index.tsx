import React, { FC } from "react";
import Styles from "./styles";
import FadeDivider from "../fadedivider";
import GoogleDoc from "../googledoc";
import TextField from "../textfield";
import Quill from "../quill";
import Button from "../button";
import moment from "moment";
import FontAwesome from "../fontawesome";
import Comments from "../comments";

export interface PropTypes {
  fns: {
    [key: string]: any;
  };
  preview?: boolean;
  setPreview?: Function;
  D: { [key: string]: any };
  className?: string | object | null;
  bannerImg?: string;
  ruby?: string;
  googledoc?: string;
  nopage: string;
  cb?: Function;
  init?: { [key: string]: any };
  edit?: boolean;
  comments?: boolean;
  views?: boolean;
}

const ArticlePage: FC<PropTypes> = ({
  init,
  className,
  fns,
  D,
  bannerImg,
  ruby,
  googledoc,
  nopage,
  cb,
  preview,
  setPreview,
  edit,
  comments,
  views,
}) => {
  const blockTemplate = (index: number) => ({
    title: `Block Title ${index + 1}`,
    value: "",
  });
  const [title, setTitle] = React.useState<string>("");
  const [previewMode, setPreviewMode] = React.useState<boolean>(false);
  const [authorName, setAuthorName] = React.useState(null);
  const [img, setImg] = React.useState<string>("");
  const [contentBlocks, setContentBlocks] = React.useState<{
    [key: string]: any;
  }>({
    0: blockTemplate(0),
  });
  const manageBlocks = (contentBlocks: { [key: string]: any }) => {
    if (cb && init) {
      return cb({
        ...init,
        contentBlocks,
      });
    } else {
      return setContentBlocks(contentBlocks);
    }
  };
  const Bttn = (props) => (
    <Button
      span={props.span}
      label={props.label}
      type={"button"}
      size={"md"}
      animation={true}
      disabled={false}
      block={false}
      rounded={false}
      square={false}
      isIconButton={false}
      onClick={(status: any) => props.fn()}
    />
  );
  const Builder = (props: any) => {
    return (
      <div className={`arclight-flex-col arclight-space-y-5`}>
        <TextField
          span
          defaultValue={init ? init.title : title}
          label={"Title"}
          onChange={(input) => {
            if (cb && init) {
              return cb({
                ...init,
                title: input.target.value,
              });
            } else {
              return setTitle(input.target.value);
            }
          }}
          type={"text"}
          variant={"standard"}
          key={0}
        />
        <TextField
          span
          defaultValue={init ? init.img : img}
          label={"Image Url"}
          onChange={(input) => {
            if (cb && init) {
              return cb({
                ...init,
                img: input.target.value,
              });
            } else {
              return setImg(input.target.value);
            }
          }}
          type={"text"}
          variant={"standard"}
          key={0}
        />
        {Object.keys(init ? init.contentBlocks : contentBlocks).map(
          (k: string, i: number) => {
            return (
              <div className={`arclight-flex-col arclight-space-y-3`}>
                <TextField
                  span
                  defaultValue={
                    (init ? init.contentBlocks : contentBlocks)[k].title
                  }
                  label={undefined}
                  onChange={(input) => {
                    if (cb && init) {
                      const _ = init ? init.contentBlocks : contentBlocks;
                      _[k].title = input.target.value;
                      manageBlocks(_);
                    } else {
                      // logic
                    }
                  }}
                  type={"text"}
                  variant={"standard"}
                  key={0}
                />
                <Quill
                  value={(init ? init.contentBlocks : contentBlocks)[k].value}
                  onChange={(value: string) => {
                    if (cb && init) {
                      const _ = init ? init.contentBlocks : contentBlocks;
                      _[k].value = value;
                      manageBlocks(_);
                    } else {
                      // logic
                    }
                  }}
                />
                <div
                  className={`arclight-flex arclight-space-x-3 arclight-justify-end`}
                >
                  {[
                    {
                      label: "Create Block",
                      fn: () => {
                        const _ = init ? init.contentBlocks : contentBlocks;
                        const ii = (() => {
                          for (let i = 0; i < Object.keys(_).length + 1; i++) {
                            if (!_[i]) return i;
                          }
                          return 0;
                        })();
                        _[ii] = blockTemplate(ii);
                        manageBlocks(_);
                      },
                    },
                    {
                      label: "Delete Block",
                      fn: () => {
                        const _ = init ? init.contentBlocks : contentBlocks;
                        delete _[i];
                        manageBlocks(_);
                      },
                    },
                  ]
                    .filter(
                      (c: any) =>
                        c.label !== "Delete Block" ||
                        Object.keys(init ? init.contentBlocks : contentBlocks)
                          .length > 1
                    )
                    .map((c: any) => (
                      <Bttn {...c} />
                    ))}
                </div>
              </div>
            );
          }
        )}
        {authorName && init?.author && false ? (
          <div className={`arclight-text-left arclight-text-xl`}>
            {authorName}
          </div>
        ) : null}
      </div>
    );
  };
  const Previewer = (props) =>
    init ? (
      <div className={`arclight-flex-col arclight-space-y-5`}>
        <div
          className={`arclight-bg-slate-100 arclight-text-black arclight-flex-col arclight-space-y-14 arclight-text-left arclight-p-10`}
          style={{ textShadow: "none" }}
        >
          <div className={`arclight-text-center arclight-text-3xl`}>
            {init.title}
          </div>
          <div className={`arclight-flex-col arclight-space-y-5`}>
            {Object.values(init.contentBlocks).map((block: any) => (
              <div
                dangerouslySetInnerHTML={{
                  __html: block.value.replace(/&lt;/g, "<"),
                }}
              />
            ))}
          </div>
          <div className={`arclight-flex arclight-items-end`}>
            <div
              className={`arclight-flex arclight-items-start arclight-justify-start arclight-w-full arclight-space-x-5`}
            >
              {[
                {
                  icon: "eye",
                  text: "views",
                  value: views ? init.views : undefined,
                },
                {
                  icon: "comments",
                  text: "comments",
                  value: comments ? init.comments.length : undefined,
                },
              ]
                .filter((el: any) => el.value !== undefined)
                .map((icon: any) => (
                  <div className={`arclight-flex arclight-space-x-3`}>
                    <FontAwesome icon={icon.icon} size={`xl`} />
                    <div>{icon.value}</div>
                  </div>
                ))}
            </div>
            <div
              className={`arclight-text-right arclight-flex-col arclight-w-full`}
            >
              {authorName ? (
                <div className={`arclight-text-lg`}>{authorName}</div>
              ) : null}
              {init?.createddate ? (
                <div className={`arclight-text-sm`}>
                  {moment(init.createddate).format("MMM Do, YYYY").toString()}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  React.useEffect(() => {
    if (authorName) return;
    if (
      fns?.calls?.getrecords_user &&
      init?.author &&
      typeof init.author === "string"
    ) {
      fns.calls.getrecords_user({
        search: {
          _id: init.author,
        },
      });
    }
  }, [init]);
  React.useEffect(() => {
    if (authorName) return;
    if (D?.getrecords_user?.authorvalue?.records) {
      setAuthorName(D.getrecords_user.authorvalue.records[0].username);
    } else if (typeof init?.author === "object") {
      setAuthorName(init.author.username);
    }
  }, [D]);
  return (
    <Styles.Container className={className}>
      {googledoc ? <FadeDivider img={bannerImg} ruby={ruby} /> : null}
      <Styles.Body>
        {googledoc ? (
          <GoogleDoc url={googledoc} author={undefined} />
        ) : preview || previewMode || !edit ? (
          <Previewer />
        ) : (
          <Builder />
        )}
        {edit ? (
          <div className={`arclight-mt-5`}>
            <Bttn
              span
              label={!previewMode ? "Preview Mode" : "Edit Mode"}
              fn={() =>
                setPreview ? setPreview(!preview) : setPreviewMode(!previewMode)
              }
            />
          </div>
        ) : null}
        {comments ? <Comments comments={init?.comments} /> : null}
      </Styles.Body>
    </Styles.Container>
  );
};

export default ArticlePage;
