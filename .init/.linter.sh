#!/bin/bash
cd /home/kavia/workspace/code-generation/tic-tac-toe-ai-challenge-41067-41077/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

