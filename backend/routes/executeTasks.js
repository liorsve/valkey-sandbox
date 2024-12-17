import express from 'express';
// Remove broadcast import
import executeCode from '../utils/dockerExecutor.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { tasks } = req.body;
  for (const task of tasks) {
    await executeTask(task);
  }
  res.sendStatus(200);
});

async function executeTask(task) {
  try {
    const { language, code, mode } = task;
    await executeCode(language, code, mode, (output) => {
      console.log(`Task Output: ${output}`);
    });
  } catch (error) {
    console.error(`Error executing task: ${error.message}`);
  }
}

export default router;
