// import { writeFile } from "fs/promises"

const fs = require("fs/promises")

const test = {
  "user": `Bndré`,
  "comment": "And.",
  "replies": [
    {
      "user": "Jay",
    }
  ]
};

for (let i = 0; i < 1000;i++) {
  test.replies.push({
    "user": `André ${i}`,
    "comment": "And.",
    "replies": [
      {
        "user": "Jay",
      }
    ]
  })
}

fs.writeFile('./test.json', JSON.stringify(test))