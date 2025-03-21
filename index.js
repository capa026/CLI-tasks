#!/usr/bin/env node
//The shebang (#!/usr/bin/env node) tells the system to use Node.js to execute the script
//It must be un the first line always

import fs from "fs";

import {
  naruto,
  checkIfFileExists,
  checkIdArgument,
  checkDescriptionArgument,
} from "./utils.js";

const main = () => {
  const args = process.argv.slice(2);
  exceptions(args);
  getArguments(args);
};

const getArguments = (command) => {
  switch (command[0]) {
    case "add":
      checkDescriptionArgument(command[1]);
      add(command[1]);
      break;
    case "update":
      checkIdArgument(command[1]);
      checkDescriptionArgument(command[2]);
      update(command[1], command[2]);
      break;
    case "delete":
      checkIdArgument(command[1]);
      deleteTask(command[1]);
      break;
    case "mark-in-progress":
      checkIdArgument(command[1]);
      markInProgress(command[1]);
      break;
    case "mark-done":
      checkIdArgument(command[1]);
      markDone(command[1]);
      break;
    case "list":
      list(command[1]);
      break;
    case "naruto":
      naruto();
      break;
    default:
      console.error("Unknown command: ", command[0]);
      help();
      process.exit(1);
  }
};

const exceptions = (command) => {
  if (!command[0]) {
    console.error("You must provide a command: tasks <command> [options].");
    process.exit(1);
  }

  if (command[0] === "--help" || command[0] === "-h") help();
  if (command[0] === "--version" || command[0] === "-v") version();
};

const add = (content) => {
  const task = {
    ID: 1,
    description: content,
    todo: true,
    done: false,
    inProgress: false,
    createdAt: new Date(),
    updatedAt: "",
  };
  if (!fs.existsSync("./tasks.json")) {
    fs.writeFileSync(
      "./tasks.json",
      JSON.stringify({
        tasks: [task],
      })
    );

    console.log("Task added successfully (ID: 1)");
    process.exit(0);
  }
  const { tasks } = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
  const nextID = tasks.length + 1;
  task.ID = nextID;

  tasks.push(task);

  fs.writeFileSync(
    "./tasks.json",
    JSON.stringify({
      tasks,
    })
  );

  console.log(`Task added successfully (ID: ${nextID})`);
  process.exit(0);
};

const update = (ID, newTask) => {
  checkIfFileExists();

  const { tasks } = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
  let prevTask = null;

  const taskFound = tasks.some((task) => {
    if (task.ID == ID) {
      prevTask = task.description;
      task.description = newTask;
      task.updatedAt = new Date();
      return true;
    }
  });

  if (!taskFound) {
    console.error("No task found with the provided ID: ", ID);
    process.exit(1);
  }

  fs.writeFileSync(
    "./tasks.json",
    JSON.stringify({
      tasks,
    })
  );

  console.log(
    `Task with (ID: ${ID}) updated. \n(from: ${prevTask}) \n(to: ${newTask})`
  );
  process.exit(0);
};

const deleteTask = (content) => {
  checkIfFileExists();
  let { tasks } = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
  if (content == "all") {
    tasks = [];
    fs.writeFileSync(
      "./tasks.json",
      JSON.stringify({
        tasks,
      })
    );

    console.log("All tasks Deleted");

    process.exit(0);
  }

  const taskFound = tasks.some((task) => task.ID == content);

  if (!taskFound) {
    console.error("No task found with the provided ID: ", content);
    process.exit(1);
  }

  const newTasks = tasks.filter((task) => task.ID != content);

  fs.writeFileSync(
    "./tasks.json",
    JSON.stringify({
      tasks: newTasks,
    })
  );
  console.log("Task Deleted.");
  process.exit(0);
};

const markInProgress = (ID) => {
  checkIfFileExists();

  const { tasks } = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
  let prevTask = null;
  let isInProgress = null;

  const taskFound = tasks.some((task) => {
    if (task.ID == ID) {
      prevTask = task.description;
      if (task.inProgress) {
        isInProgress = true;
        return true;
      }
      task.inProgress = true;
      return true;
    }
  });

  if (!taskFound) {
    console.error("No task found with the provided ID: ", ID);
    process.exit(1);
  }
  if (isInProgress) {
    console.log(`(task: ${prevTask}) is already in progress.`);
    process.exit(0);
  }

  fs.writeFileSync(
    "./tasks.json",
    JSON.stringify({
      tasks,
    })
  );

  console.log(`(Task: ${prevTask}) is in progress.`);
  process.exit(0);
};

const markDone = (ID) => {
  checkIfFileExists();

  const { tasks } = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
  let prevTask = null;
  let isFinished = null;

  const taskFound = tasks.some((task) => {
    if (task.ID == ID) {
      prevTask = task.description;
      if (task.done) {
        isFinished = true;
        return true;
      }
      task.done = true;
      return true;
    }
  });

  if (!taskFound) {
    console.error("No task found with the provided ID: ", ID);
    process.exit(1);
  }
  if (isFinished) {
    console.log(`(task: ${prevTask}) is finished!.`);
    process.exit(0);
  }

  fs.writeFileSync(
    "./tasks.json",
    JSON.stringify({
      tasks,
    })
  );

  console.log(`(Task: ${prevTask}) marked as finished.`);
  process.exit(0);
};

const list = (content) => {
  checkIfFileExists();
  const { tasks } = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
  const doneTasks = tasks.filter((task) => task.done);
  const todoTasks = tasks.filter((task) => task.todo);
  const inProgressTasks = tasks.filter((task) => task.inProgress);

  if (!content) {
    console.log("List of tasks: ", tasks);
    process.exit(0);
  }

  switch (content) {
    case "done":
      console.log("Tasks done: ", doneTasks);
      process.exit(0);
    case "todo":
      console.log("Tasks to do: ", todoTasks);
      process.exit(0);
    case "in-progress":
      console.log("Tasks in progress: ", inProgressTasks);
      process.exit(0);
    default:
      console.error("Unknown command: ", content);
      process.exit(1);
  }
};

const version = () => {
  const { version } = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  console.log("Version: ", version);
  process.exit(0);
};

const help = () => {
  console.log(`
  To use the task commads you must follow this format.
  tasks <command> [args]

  --help, -h  | Show the help info.
  --version, -v | Show the version of the tool.

  # add <description>  | Create a new task with the specified description.
  # update <id> <new description>  | Update the task with the especified id.
  # delete <id>  | Delete a task.
    - all  | Delete all Tasks.
  # mark-in-progress <id>  | Update the tast to mark as in progress.
  # mark-done <id>  | Update the tast to mark it finished.

  # list | Show all the tasks.
    - done | Show all the tasks finished.
    - todo | Show all the tasks still not in progress.
    - in-progress | Show all the tasks in progress.
  `);
  process.exit(0);
};

main();
