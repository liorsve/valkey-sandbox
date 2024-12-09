import express from 'express';
import { broadcast } from '../websockets.js';
import executeCode from '../utils/dockerExecutor.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { tasks } = req.body;
  for (const task of tasks) {
    broadcast({ action: 'taskUpdate', data: { status: 'started', task } });
    await executeTask(task);
    broadcast({ action: 'taskUpdate', data: { status: 'completed', task } });
  }
  res.sendStatus(200);
});

async function executeTask(task) {
  // Example task execution logic
  try {
    const { language, code, mode } = task;
    await executeCode(language, code, mode, (output) => {
      console.log(`Task Output: ${output}`);
      // You can broadcast task-specific updates here if needed
    });
    // Add any additional task handling logic here
  } catch (error) {
    console.error(`Error executing task: ${error.message}`);
    broadcast({ action: 'taskUpdate', data: { status: 'error', task, error: error.message } });
  }
}

export default router;
