import express from 'express';
import executeCode from '../utils/dockerExecutor.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { language, code, mode, executionMode } = req.body;

  executeCode(language, code, mode, executionMode, (output) => {
    res.send(output);
  });
});

export default router;
