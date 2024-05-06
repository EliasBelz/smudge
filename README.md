# cse481s

A Firefox extension called Smudge to keep you secure and anonymous on the internet!

Built by Elias Belzberg, Kathryn Koehler, Will Safranek, Lucas Youngers

# Installation Guide

- Open Firefox and Paste `about:debugging#/runtime/this-firefox` into the navigation bar.
- Select "Load Temporary Add-on...".
- Navigate to the manifest.json inside the Extension directory in this repo.
- Select "Open".
- Now you’re browsing with Smudge
- When you wish to reload the extension, pull the most recent version or save your changes, then click "Reload" on the extension menu.

# Workflow

Please follow the workflow as outlined below, to minimize confusion and conflicts.

1. Never push directly to master. When you work on a specific item or bug, please create a branch and push changes to that.
2. Then, try to get approval and a once-over from at least one other developer before merging the branch into master, and deleting the branch.
3. Please provide documentation and commit messages for any confusing or non-trivial code.
4. If there are ever merge conflicts, please contact the dev who wrote the conflicting code before making potentially breaking changes.

# Convention

In effort to keep the repository clean and efficient, please try to adhere to these common best-practices. (Note that these mostly apply to Javascript.)

- Please use JSdoc to comment your global variables, functions, and classes. This will give us typescript-style type checking through VScode intellisense, and is helpful when working with such a "unique" and "innovative" language such as javascript.
- Try to leave one blank line between code blocks, such as functions.
- Prefer async/await syntax over then/catch callback hell.
- I give up, we can use semicolons :( please use them consistently to end every expression.
- I'm standardizing our quotes to single quotes, let's try to use those since it seems to be the bulk of them so far. (Note that double quotes are acceptable if the message contains single quotes.)
- Try to avoid lines over 80 characters long. This is not a hard line, but long lines can become unreadable.
- Try to avoid functions over 30 lines long. Again, this can become unreadable.
- Comment global variables, and try to minimize their use.
- INDENT USING FOUR SPACES FOR THE LOVE OF GOD (respectfully).
- Use const if possible, immutable code is easier to debug.