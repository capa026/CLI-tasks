# Tasks manager **CLI Tool**

Hi! This program is a **CRUD CLI Tool** wich will help you manage tasks. Written in vanilla **Javascript** using **Node.js** with Zero Dependencies.

The tasks are stored in a json file called **tasks.json**

## Commands

| COMMAND          |          ARGS          |                         DRESCRIPTION                          |
| ---------------- | :--------------------: | :-----------------------------------------------------------: |
| --help / -h      |           -            |          Show all the commands and how to use them.           |
| --version / -v   |           -            |                     Version of the tool.                      |
| add              |     (description)      |         Create a new task with the given desription.          |
| update           | (ID) (new description) | Update a task with the ID provided, with the new description. |
| delete           |          (ID)          |              Delete a task with the ID provided.              |
| delete all       |           -            |                       Delete all Tasks.                       |
| mark-in-progress |          (ID)          |             Mark a task as currently in progress.             |
| mark-done        |          (ID)          |                   Mark a task as finished.                    |
| list             |           -            |                      List all the tasks                       |
| list done        |           -            |                 List all the finished tasks.                  |
| list todo        |           -            |             List all the tasks that are inactive.             |
| list in-progress |           -            |      List all the tasks that are currently in progress.       |

## Functionalities and usage

`$ tasks add "New Task"`

This will output:

`$ Task added successfully (ID: 1)`

If there is no **tasks.json** archive, the add command will create it.

### Project URL
https://github.com/capa026/CLI-tasks
