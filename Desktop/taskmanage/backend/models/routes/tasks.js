const router = require("express").Router();
const Task = require("../Task");

// Create
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

// Read
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Update
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  res.send(task);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;