const http = require("http");
const path = require("path");
const express = require("express");
const webSocket = require("ws");

const TaskIds = {
  task10: 'task10',
  task13: 'task13',
  task16: 'task16',
  task19: 'task19',
  task22: 'task22',
}

const task10 = require("./task10");
const task13 = require("./task13");
const task16 = require("./task16");
const task19 = require("./task19");
const task22 = require("./task22");

const PORT = 3000

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

const server = http.createServer(app);

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

const webSocketServer = new webSocket.Server({ server, path: '/ws' });

webSocketServer.on('connection', (ws) => {
  console.log('connection');

  ws.on('message', (rawData) => {
    const parsedData = JSON.parse(rawData);
    const { taskId, data } = parsedData
    console.log(parsedData);

    switch (taskId) {
      case TaskIds.task10:
        try {
          const result = task10(Number(data.A));
  
          ws.send(JSON.stringify({ taskId, data: result }));
        } catch (error) {
          ws.send(JSON.stringify({ taskId, error: error.message }));
        }
        break;
      
      case TaskIds.task13:
        try {
          const result = task13(Number(data.A));
  
          ws.send(JSON.stringify({ taskId, data: result }));
        } catch (error) {
          ws.send(JSON.stringify({ taskId, error: error.message }));
        }
        break;

      case TaskIds.task16:
        try {
          const result = task16();
  
          ws.send(JSON.stringify({ taskId, data: result }));
        } catch (error) {
          ws.send(JSON.stringify({ taskId, error: error.message }));
        }
        break;
      
      case TaskIds.task19:
        try {
          const result = task19();
  
          ws.send(JSON.stringify({ taskId, data: result }));
        } catch (error) {
          ws.send(JSON.stringify({ taskId, error: error.message }));
        }
        break;
  
      case TaskIds.task22:
        try {
          const result = task22(Number(data.A));
  
          ws.send(JSON.stringify({ taskId, data: result }));
        } catch (error) {
          ws.send(JSON.stringify({ taskId, error: error.message }));
        }
        break;

      default:
        ws.send(JSON.stringify({ error: 'Неккоректный id формы' }));
        break;
    }
  });

  ws.on('close', (number, reason) => {
    console.log(`close ${number}`, reason);
  })

  ws.on('error', (error) => ws.send(error));
});

server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
})
