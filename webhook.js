const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  if (req.body.ref === "refs/heads/main") {
    exec("/var/www/my-app/deploy.sh", (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка деплоя: ${error}`);
        return res.status(500).send("Deploy failed");
      }
      console.log(`Deploy output: ${stdout}`);
      res.status(200).send("Deployed successfully!");
    });
  }
});

app.listen(9000, () => console.log("Webhook listener on port 9000"));
