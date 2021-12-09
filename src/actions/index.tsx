export const termSet = (term) => {
  return {
    type: "TERM_SET",
    payload: term,
  };
};

export const commentsSet = (comments) => {
  return {
    type: "COMMENTS_SET",
    payload: comments,
  };
};
