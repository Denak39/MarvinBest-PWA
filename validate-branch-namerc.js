module.exports = {
  pattern: "^(main|staging|production)$|^(bump|feat|fix|rel(?:ease)?)/.+$",
  errorMsg:
    "🤨 The branch you are trying to push does not respect our conventions, you can rename it with `git branch -m <current-name> <new-name>`.",
};
