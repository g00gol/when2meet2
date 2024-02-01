import express from "express";

const PORT = 8080;
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
    status: 200,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
