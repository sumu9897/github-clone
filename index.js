import yargs from "yargs";

import { hideBin } from "yargs/helpers";

import initRepo from "./controllers/init.js";
import addRepo from "./controllers/add.js";
import commitRepo from "./controllers/commit.js";
import pullRepo from "./controllers/pull.js";
import pushRepo from "./controllers/push.js";
import revertRepo from "./controllers/revert.js";

yargs(hideBin(process.argv))
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository ",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    addRepo
  )
  .command("commit -m <message>", "Commit the staged files", (yargs) => {
    yargs.positional("message", {
      describe: "Commit message",
      type: "string",
    }),
      commitRepo;
  })
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command("revert <commitID>", "Revert to a specific commit", (yargs) => {
    yargs.positional("commitID", {
      describe: "Commit mID to revert to",
      type: "string",
    }),
      revertRepo;
  })
  .demandCommand(1, "You need at least one command")
  .help().argv;
