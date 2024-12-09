import express from 'express';
import { broadcast } from '../websockets.js';

const router = express.Router();

let players = [
  { id: 1, name: 'Superman', score: 50 },
  { id: 2, name: 'Batman', score: 40 },
  { id: 3, name: 'Wonder Woman', score: 60 },
  { id: 4, name: 'Flash', score: 30 },
  { id: 5, name: 'Green Lantern', score: 20 },
  { id: 6, name: 'Aquaman', score: 10 },
];

router.post('/', (req, res) => {
  const { playerId, change } = req.body;
  const player = players.find((p) => p.id === playerId);
  if (player) {
    player.score += change;
    clearTimeout(player.broadcastTimeout);
    player.broadcastTimeout = setTimeout(() => {
      broadcast({ action: 'scoreUpdate', data: player });
    }, 100);
  }
  res.sendStatus(200);
});

export default router;
