import fs from "fs";

export const checkIfFileExists = () => {
  if (!fs.existsSync("./tasks.json")) {
    console.error(
      "There's no tasks yet, Try creating one. \n\ntasks add <task description>"
    );

    process.exit(1);
  } else {
    const { tasks } = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));

    if (tasks.length === 0) {
      console.error(
        "There's no tasks yet, Try creating one. \n\ntasks add <task description>"
      );

      process.exit(1);
    }
  }
};

export const checkIdArgument = (argument) => {
  if (!argument) {
    console.error(`
    You must provide the ID of the task you want update
    try:
    tasks list
    to see all the tasks
    `);
    process.exit(1);
  }
};

export const checkDescriptionArgument = (argument) => {
  if (!argument) {
    console.error("You must Provide a description for the task");
    process.exit(1);
  }
};

export const naruto = () => {
  const { tasks } = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
  const lastID = tasks?.length + 1;

  [
    "task 1",
    "task 2",
    "task 3",
    "task 4",
    "task 5",
    "task 6",
    "task 7",
    "task 8",
    "task 9",
    "task 10",
    "task 11",
    "task 12",
    "task 13",
    "task 14",
    "task 15",
    "task 16",
    "task 17",
    "task 18",
    "task 19",
    "task 20",
    "task 21",
    "task 22",
    "task 23",
    "task 24",
    "task 25",
  ].forEach((description, i) => {
    const task = {
      ID: 1,
      description,
      todo: true,
      done: Math.random() > 0.5 ? true : false,
      inProgress: Math.random() < 0.5 ? true : false,
      createdAt: new Date(),
      updatedAt: "",
    };

    task.ID = lastID + i;
    tasks.push(task);
  });

  fs.writeFileSync(
    "./tasks.json",
    JSON.stringify({
      tasks,
    })
  );

  console.log("Tasks list updated with 25 records");
  process.exit(0);
};
