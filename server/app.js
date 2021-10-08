const express = require('express');
const app = express();

app.use(express.json());

//app.get('/createRoom', (req,res) => {


    app.get('/playlist/api', (req,res) => {
    const roomId = createRoomId()
    res.send(roomId);

});

//const port = process.env.PORT || 3001;
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function createRoomId() {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let lengthOfCode = 6;
    let newCode = "";
    for (let i = 0; i < lengthOfCode; i++) {
      let rnum = Math.floor(Math.random() * characters.length);
      newCode += characters.substring(rnum, rnum + 1);
    }

  return newCode
}