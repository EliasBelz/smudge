# cse481s

A Firefox extension called Smudge to keep you secure and anonymous on the internet!

Built by Elias Belzberg, Kathryn Koehler, Will Safranek, Lucas Youngers

# Installation Guide

- Open Firefox and Paste `about:debugging#/runtime/this-firefox` into the navigation bar.
- Select "Load Temporary Add-on...".
- Navigate to the manifest.json inside the Extension directory in this repo.
- Select "Open".
- Now you’re browsing with Smudge ;)
- When you wish to reload the extension, pull the most recent version or save your changes, then click "Reload" on the extension menu.

# Workflow

Please follow the workflow as outlined below, to minimize confusion and conflicts.

1. Never push directly to master. When you work on a specific item or bug, please create a branch and push changes to that.
2. Then, try to get approval and a once-over from at least one other developer before merging the branch into master, and deleting the branch.
3. Please provide documentation and commit messages for any confusing or non-trivial code.
4. If there are ever merge conflicts, please contact the dev who wrote the conflicting code before making potentially breaking changes.
