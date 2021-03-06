const fs = require('fs')
const path = require('path')
/*
fs.readFile(
  path.join(__dirname, 'files', 'starter.txt'),
  'utf-8',
  (err, data) => {
    if (err) throw err
    console.log(data)
  }
)
console.log('print first')

process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`)
  process.exit(1)
})
*/

/*
callback hell
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet u, this is Hulk",
  (err) => {
    if (err) throw err;
    console.log("Write compelete");
    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "this is an append text",
      (err) => {
        if (err) throw err;
        console.log("append compelete");
        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files",'newReply.txt'),
          (err) => {
            if (err) throw err;
            console.log("rename compelete");
          }
        );
      }
    );
  }
);
*/

const fsPromsies = require('fs').promises

const fileOps = async () => {
  try {
    const data = await fsPromsies.readFile(
      path.join(__dirname, 'files', 'starter.txt'),
      'utf8'
    )
    console.log(data)
    await fsPromsies.writeFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      data
    )
    await fsPromsies.appendFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      `\n\nNice to meet you`
    )
    await fsPromsies.rename(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      path.join(__dirname, 'files', 'promiseWriteComplete.txt')
    )
    const newData = await fsPromsies.readFile(
      path.join(__dirname, 'files', 'promiseWriteComplete.txt'),
      'utf8'
    )
    console.log(newData)
    fsPromsies.unlink(
      path.join(__dirname, 'files', 'promiseWriteComplete.txt')
    )
  } catch (error) {
    console.log(error)
  }
}
fileOps()
