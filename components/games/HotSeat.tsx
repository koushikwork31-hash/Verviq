"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useXp } from "./XpContext";

type Q = { q: string; options: string[]; answer: number; tip: string };

const QUESTIONS: Q[] = [
  { q: "Tell me about yourself.", options: ["Recite your resume line by line", "Present–past–future: who you are, key highlight, why you're here", "Share your life story from school days", "Talk mostly about your family background"], answer: 1, tip: "A tight present–past–future arc shows structure and confidence." },
  { q: "What is your greatest weakness?", options: ["\"I'm a perfectionist\"", "\"I have no weaknesses\"", "A real weakness + what you're doing to improve it", "\"I work too hard\""], answer: 2, tip: "Honesty + a growth plan reads as self-awareness, not weakness." },
  { q: "Why should we hire you?", options: ["\"I need this job badly\"", "Match your skills to the role's needs with one proof point", "\"My marks are good\"", "\"You need employees, I need a job — perfect match\""], answer: 1, tip: "Connect one specific strength to one specific need of the role." },
  { q: "Where do you see yourself in 5 years?", options: ["\"In your seat\"", "\"I don't know\"", "A realistic growth path aligned with the role", "\"Working abroad, hopefully\""], answer: 2, tip: "Show ambition that connects to the company's direction." },
  { q: "The interviewer stays silent after your answer. You should…", options: ["Panic and keep talking randomly", "Apologize for a bad answer", "Wait calmly, then ask if they'd like you to elaborate", "Change the topic"], answer: 2, tip: "Silence is often a test. Calm composure wins it." },
  { q: "Why do you want to work here?", options: ["\"It's close to my home\"", "Reference something specific about the company + connect it to you", "\"My friend told me to apply\"", "\"Honestly, I need a job\""], answer: 1, tip: "Specific company knowledge proves genuine interest." },
  { q: "You don't know the answer to a technical question. You should…", options: ["Make up an impressive-sounding answer", "Say \"I don't know\" and stop", "Think aloud, share related knowledge, and commit to learning it", "Stay silent"], answer: 2, tip: "Reasoning aloud shows problem-solving; honesty shows integrity." },
  { q: "Do you have any questions for us?", options: ["\"No, none\"", "\"What's the salary?\"", "Ask about the team, growth path or a real challenge of the role", "\"How long is the training?\""], answer: 2, tip: "Good questions signal curiosity — always ask at least one." },
];

const TIME_PER_Q = 10;

export default function HotSeat({ onExit }: { onExit?: () => void }) {
  const { addXp, unlock, hasAchievement } = useXp();
  const [stage, setStage] = useState<"intro" | "play" | "done">("intro");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [time, setTime] = useState(TIME_PER_Q);
  const [earned, setEarned] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => clearTimer, []);

  const startTimer = useCallback(() => {
    clearTimer();
    setTime(TIME_PER_Q);
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearTimer();
          setStreak(0);
          setPicked(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const start = () => {
    setIdx(0); setScore(0); setStreak(0); setBestStreak(0); setPicked(null); setEarned(0);
    setStage("play");
    startTimer();
  };

  const finish = useCallback((finalScore: number, best: number) => {
    clearTimer();
    setStage("done");
    const xp = finalScore * 15 + best * 10 + 10;
    setEarned(xp);
    addXp(xp, "Hot Seat complete");
    if (finalScore >= 4) unlock("hot-seat-sharp", "Sharp Shooter · score 4+", 25);
    if (best >= 4) unlock("streak-master", "Streak Master · 4 in a row", 30);
  }, [addXp, unlock]);

  const answer = (i: number) => {
    if (picked !== null) return;
    clearTimer();
    setPicked(i);
    const correct = i === QUESTIONS[idx].answer;
    if (correct) {
      const s = score + 1;
      const st = streak + 1;
      setScore(s);
      setStreak(st);
      if (st > bestStreak) setBestStreak(st);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (idx + 1 >= QUESTIONS.length) {
      finish(score, bestStreak);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
      startTimer();
    }
  };

  /* ── Intro ── */
  if (stage === "intro") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-gradient-to-b from-flame/5 to-white p-8 text-center">
        <span className="text-5xl">🔥</span>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">HR Hot Seat</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
          {QUESTIONS.length} rapid-fire HR questions. {TIME_PER_Q} seconds each. Pick the strongest
          answer — streaks earn bonus XP.
        </p>
        <button type="button" onClick={start} className="btn btn-primary mt-7">
          Enter the Hot Seat →
        </button>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink/35">
          welcome to the hot seat
        </p>
      </div>
    );
  }

  /* ── Results ── */
  if (stage === "done") {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="animate-pop flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-gradient-to-b from-gold/5 to-white p-8 text-center">
        <span className="text-5xl">{pct >= 75 ? "🏆" : pct >= 50 ? "💪" : "🌱"}</span>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">
          {pct >= 75 ? "Interviewer impressed!" : pct >= 50 ? "Solid round!" : "Room to grow!"}
        </h3>
        <p className="mt-2 text-sm text-ink/60">
          {score}/{QUESTIONS.length} best answers · best streak {bestStreak}
        </p>
        <p className="mt-5 font-display text-3xl font-extrabold text-gold">+{earned} XP</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={start} className="btn btn-ghost">Play again</button>
          <button type="button" onClick={onExit} className="btn btn-primary">Back to challenges</button>
        </div>
      </div>
    );
  }

  /* ── Play ── */
  const q = QUESTIONS[idx];
  const timePct = (time / TIME_PER_Q) * 100;

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
      {/* header row */}
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-flame/10 px-2 py-0.5 font-mono text-[10px] font-bold text-flame">
          Q{idx + 1}/{QUESTIONS.length}
        </span>
        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <span className="animate-pop rounded-full bg-gold/15 px-2.5 py-1 font-mono text-[10px] font-bold text-gold">
              🔥 {streak} streak
            </span>
          )}
          <span className="font-display text-sm font-bold text-ink">{score} correct</span>
        </div>
      </div>

      {/* timer bar */}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/8">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${time <= 3 ? "bg-flame" : "bg-volt"}`}
          style={{ width: `${timePct}%` }}
        />
      </div>
      <p className={`mt-1.5 text-right font-mono text-[10px] ${time <= 3 ? "text-flame" : "text-ink/40"}`}>
        {time}s
      </p>

      {/* question */}
      <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
        &ldquo;{q.q}&rdquo;
      </h3>

      {/* options */}
      <div className="mt-5 space-y-2.5">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isPicked = picked === i;
          const revealed = picked !== null;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => answer(i)}
              disabled={revealed}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                revealed && isAnswer
                  ? "border-mint bg-mint/10 text-ink"
                  : isPicked
                    ? "border-flame bg-flame/10 text-ink"
                    : revealed
                      ? "border-ink/10 text-ink/40"
                      : "border-ink/15 text-ink/75 hover:border-volt hover:bg-volt/5"
              }`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${revealed && isAnswer ? "bg-mint text-white" : isPicked ? "bg-flame text-white" : "bg-ink/8 text-ink/50"}`}>
                {revealed && isAnswer ? "✓" : isPicked ? "✗" : String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* feedback + next */}
      {picked !== null && (
        <div className="animate-pop mt-5 rounded-2xl border border-volt/20 bg-volt/5 p-4">
          {picked === -1 && (
            <p className="text-sm font-semibold text-flame">⏰ Time&apos;s up! </p>
          )}
          <p className="text-sm leading-relaxed text-ink/70">
            <span className="font-semibold text-ink">Coach:</span> {q.tip}
          </p>
          <button type="button" onClick={next} className="btn btn-blue mt-4 w-full !py-2.5">
            {idx + 1 >= QUESTIONS.length ? "See results →" : "Next question →"}
          </button>
        </div>
      )}

      {hasAchievement("hot-seat-sharp") && (
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-gold">
          🏆 sharp shooter unlocked
        </p>
      )}
    </div>
  );
}
