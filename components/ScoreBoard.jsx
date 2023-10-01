"use client";

function Scoreboard({ xWins, oWins }) {
  return (
    <div className="scoreboard">
      <div>X Wins: {xWins}</div>
      <div>O Wins: {oWins}</div>
    </div>
  );
}
