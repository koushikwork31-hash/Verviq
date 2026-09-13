"use client";

import { useCallback, useMemo, useState } from "react";
import { useXp } from "./XpContext";

type Piece = { id: number; text: string; kind: "S" | "T" | "A" | "R" | "X" };

const PUZZLES: { question: string; pieces: Piece[] }[] = [
  {
    question: "“Tell me about a time you led a team under pressure.”",
    pieces: [
      { id: 1, text: "As our fest's tech lead, our main sponsor booth's demo broke the night before.", kind: "S" },
      { id: 2, text: "I had to keep a 6-person team focused and re-plan overnight.", kind: "T" },
      { id: 3, text: "I split the team: one pair rebuilt the demo, I called the sponsor to reset expectations, two others prepped a backup.", kind: "A" },
      { id: 4, text: "The booth ran flawlessly — the sponsor renewed at a higher tier.", kind: "R" },
      { id: 5, text: "I'm generally a very good leader in all situations.", kind: "X" },
      { id: 6, text: "Everyone panicked and argued, honestly it was chaos.", kind: "X" },
      { id: 7, text: "Our team once wore matching t-shirts for the fest.", kind: "X" },
    ],
  },
  {
    question: "“Describe a conflict you faced in a team project.”",
    pieces: [
      { id: 1, text: "In our 4-person capstone team, two members disagreed on the tech stack, stalling us for a week.", kind: "S" },
      { id: 2, text: "As the coordinator, I had to resolve it before our review deadline.", kind: "T" },
      { id: 3, text: "I ran a 30-min call where each side listed pros/cons, then we scored options against the deadline together.", kind: "A" },
      { id: 4, text: "We picked a hybrid approach, delivered on time, and both members presented parts they owned.", kind: "R" },
      { id: 5, text: "I told them to stop arguing because I was the team lead.", kind: "X" },
      { id: 6, text: "Conflicts never happen with me, I avoid teams that argue.", kind: "X" },
      { id: 7, text: "We eventually just submitted whatever we had.", kind: "X" },
    ],
  },
  {
    question: "“Tell me about a failure and what you learned.”",
    pieces: [
      { id: 1, text: "In my first semester, I crammed for exams and failed two subjects.", kind: "S" },
      { id: 2, text: "I had to recover my GPA without dropping activities I cared about.", kind: "T" },
      { id: 3, text: "I built a weekly review system, joined a study group, and taught concepts to juniors to test my own understanding.", kind: "A" },
      { id: 4, text: "I cleared both papers next term with distinction — and kept the system since.", kind: "R" },
      { id: 5, text: "I've never really failed at anything important.", kind: "X" },
      { id: 6, text: "It was the teacher's fault honestly, nobody understood.", kind: "X" },
      { id: 7, text: "Failures are just stepping stones, that's all I'll say.", kind: "X" },
    ],
  },
];

const ORDER: Piece["kind"][] = ["S", "T", "A", "R"];

const LETTER_META: Record<string, { label: string; cls: string }> = {
  S: { label: "Situation", cls: "bg-volt/10 text-volt" },
  T: { label: "Task", cls: "bg-gold/10 text-gold" },
  A: { label: "Action", cls: "bg-flame/10 text-flame" },
  R: { label: "Result", cls: "bg-mint/10 text-mint" },
  X: { label: "Distractor", cls: "bg-ink/8 text-ink/50" },
};

export default function StarBuilder({ onExit }: { onExit?: () => void }) {
  const { addXp, unlock } = useXp();
  const [stage, setStage] = useState<"intro" | "play" | "done">("intro");
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [slots, setSlots] = useState<(Piece | null)[]>([null, null, null, null]);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [earned, setEarned] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const puzzle = PUZZLES[puzzleIdx];
  const pool = useMemo(
    () => puzzle.pieces.filter((p) => !slots.some((s) => s?.id === p.id)),
    [puzzle, slots]
  );
  const nextSlot = slots.findIndex((s) => s === null);

  const reset = useCallback(() => {
    setSlots([null, null, null, null]);
    setMessage(null);
    setMistakes(0);
  }, []);

  const start = () => {
    reset();
    setPuzzleIdx(0);
    setStage("play");
  };

  const finish = useCallback((m: number) => {
    const xp = Math.max(30, 60 - m * 10);
    setEarned(xp);
    addXp(xp, "STAR answer built");
    unlock("star-builder", "STAR Builder · first answer", 25);
    setStage("done");
  }, [addXp, unlock]);

  const pick = (piece: Piece) => {
    if (nextSlot === -1) return;
    if (piece.kind === ORDER[nextSlot]) {
      const newSlots = [...slots];
      newSlots[nextSlot] = piece;
      setSlots(newSlots);
      setMessage(null);
      if (nextSlot === 3) finish(mistakes);
    } else {
      setMistakes((m) => m + 1);
      const why: Record<string, string> = {
        X: "That's a distractor — it sounds okay but proves nothing. Build with evidence.",
        S: "Not yet — set the Situation first.",
        T: "The Situation comes before your Task.",
        A: "Show the Task before jumping to your Actions.",
        R: "Actions first — then land the Result.",
      };
      setMessage({ text: why[piece.kind], ok: false });
    }
  };

  /* ── Intro ── */
  if (stage === "intro") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-gradient-to-b from-mint/5 to-white p-8 text-center">
        <span className="text-5xl">🧩</span>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">STAR Builder</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
          Behavioral questions are won with structure. Build a strong answer by picking pieces in
          <span className="font-semibold text-ink"> Situation → Task → Action → Result</span> order —
          while rejecting the distractors that sink real interviews.
        </p>
        <button type="button" onClick={start} className="btn btn-primary mt-7">
          Start building →
        </button>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink/35">
          structure is a superpower
        </p>
      </div>
    );
  }

  /* ── Done ── */
  if (stage === "done") {
    return (
      <div className="animate-pop flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-gradient-to-b from-mint/5 to-white p-8 text-center">
        <span className="text-5xl">✅</span>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">STAR answer complete!</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
          {mistakes === 0
            ? "Flawless — not a single distractor fooled you. That's interview-grade structure."
            : `Built with ${mistakes} misstep${mistakes > 1 ? "s" : ""}. In a real interview, structure is what keeps you out of the weeds.`}
        </p>
        <p className="mt-5 font-display text-3xl font-extrabold text-gold">+{earned} XP</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {puzzleIdx < PUZZLES.length - 1 ? (
            <button
              type="button"
              onClick={() => {
                reset();
                setPuzzleIdx((i) => i + 1);
                setStage("play");
              }}
              className="btn btn-ghost"
            >
              Next question →
            </button>
          ) : (
            <button type="button" onClick={start} className="btn btn-ghost">Play again</button>
          )}
          <button type="button" onClick={onExit} className="btn btn-primary">Back to challenges</button>
        </div>
      </div>
    );
  }

  /* ── Play ── */
  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-mint/10 px-2 py-0.5 font-mono text-[10px] font-bold text-mint">
          Puzzle {puzzleIdx + 1}/{PUZZLES.length}
        </span>
        <span className="font-mono text-[10px] text-ink/40">mistakes: {mistakes}</span>
      </div>

      <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink">{puzzle.question}</h3>

      {/* STAR slots */}
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {ORDER.map((k, i) => {
          const filled = slots[i];
          const meta = LETTER_META[k];
          return (
            <div
              key={k}
              className={`rounded-xl border px-4 py-3 transition-all ${
                filled ? "border-ink/15 bg-cream" : "border-dashed border-ink/25 bg-ink/[0.02]"
              }`}
            >
              <span className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ${meta.cls}`}>
                {k} · {meta.label}
              </span>
              <p className={`mt-1.5 text-[13px] leading-snug ${filled ? "text-ink" : "text-ink/30"}`}>
                {filled ? filled.text : i === nextSlot ? "Pick this next…" : "Locked"}
              </p>
            </div>
          );
        })}
      </div>

      {message && (
        <p className={`animate-pop mt-4 rounded-xl px-4 py-2.5 text-sm font-medium ${message.ok ? "bg-mint/10 text-mint" : "bg-flame/10 text-flame"}`}>
          {message.text}
        </p>
      )}

      {/* piece pool */}
      <p className="mt-6 font-display text-xs font-bold uppercase tracking-wider text-ink/50">
        Choose the next piece:
      </p>
      <div className="mt-3 space-y-2">
        {pool.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => pick(p)}
            className="w-full rounded-xl border border-ink/15 px-4 py-3 text-left text-sm text-ink/75 transition-all hover:border-volt hover:bg-volt/5"
          >
            {p.text}
          </button>
        ))}
      </div>

      <button type="button" onClick={onExit} className="btn btn-ghost mt-6 w-full !py-2.5">
        Exit puzzle
      </button>
    </div>
  );
}
