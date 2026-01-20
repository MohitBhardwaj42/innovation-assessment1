import { useState } from "react";
import "./App.css";

/* ---------------- TYPES ---------------- */

type Pillar = "Strategy" | "Capacity" | "Discipline" | "Performance";

type FrameworkSection = {
  pillar: Pillar;
  questions: string[];
};

type Responses = Record<string, number>;
type Scores = Record<Pillar, number>;

/* ---------------- OPTIONS ---------------- */

const options = [
  { label: "Not at all", value: 2 },
  { label: "To some extent", value: 5 },
  { label: "To a moderate extent", value: 7 },
  { label: "To a great extent", value: 9 },
];

/* ---------------- FRAMEWORK ---------------- */

const framework: FrameworkSection[] = [
  {
    pillar: "Strategy",
    questions: [
      "Do you understand how innovation aligns with your long-term career objectives",
      "Are you aware of the problems or gaps you want to solve through innovation",
      "How well do your focus areas match your skills and expertise",
      "Are your focus areas aligned with current or future industry trends",
      "Do you maintain a balance between incremental and radical innovations",
      "Do you set timelines and milestones for innovation initiatives",
    ],
  },
  {
    pillar: "Capacity",
    questions: [
      "How clearly do you define problem statements before ideation",
      "Do you break innovation work into stages (idea → prototype → test → improve)",
      "How effectively do you collaborate with others on innovation projects",
      "How comfortable are you working in cross-functional teams",
      "How effectively do you utilize available resources",
      "Do you regularly invest in learning new tools or technologies",
    ],
  },
  {
    pillar: "Discipline",
    questions: [
      "Do you take initiative to lead innovation efforts without being asked",
      "How well do you align innovation activities with broader goals",
      "How consistently do you track progress on innovation activities",
      "Do you maintain a balance between incremental and radical innovations",
      "How accountable are you for innovation results",
      "Do you define clear success criteria for innovation initiatives",
    ],
  },
  {
    pillar: "Performance",
    questions: [
      "How effectively do your ideas address real user or business problems",
      "How consistently do you deliver measurable value through innovation",
      "Do you understand how your innovations create economic or strategic value",
      "Do your solutions continue to generate value over time",
      "How well do you understand AI concepts relevant to your work",
      "How aware are you of ethical considerations in AI usage",
    ],
  },
];

/* ---------------- HELPERS ---------------- */

const getRecommendation = (pillar: Pillar, score: number): string => {
  if (score <= 3)
    return {
      Strategy: "Your innovation strategy is unclear.",
      Capacity: "Your innovation capacity is limited.",
      Discipline: "Innovation discipline is weak.",
      Performance: "Innovation performance is low.",
    }[pillar];

  if (score <= 6)
    return {
      Strategy: "Your innovation strategy is developing.",
      Capacity: "Your innovation capacity is moderate.",
      Discipline: "Innovation discipline exists.",
      Performance: "Innovation performance is moderate.",
    }[pillar];

  if (score <= 8)
    return {
      Strategy: "Your innovation strategy is strong.",
      Capacity: "You have good innovation capacity.",
      Discipline: "Your innovation discipline is solid.",
      Performance: "Your innovation performance is strong.",
    }[pillar];

  return {
    Strategy: "Excellent innovation strategy.",
    Capacity: "Excellent innovation capacity.",
    Discipline: "Excellent innovation discipline.",
    Performance: "Excellent innovation performance.",
  }[pillar];
};

const getMaturityLevel = (score: number): string => {
  if (score <= 3) return "Early Stage";
  if (score <= 6) return "Developing";
  if (score <= 8) return "Advanced";
  return "Leading";
};

/* ---------------- DASHBOARD ---------------- */

const AssessmentDashboard = ({
  step,
  pillarIndex,
  responses,
  form,
}: {
  step: number;
  pillarIndex: number;
  responses: Responses;
  form: Record<string, string>;
}) => {
  // Calculate total questions in all pillars
  const totalQuestions = framework.reduce(
    (acc, section) => acc + section.questions.length,
    0
  );

  // Count answered questions
  const answeredQuestions = Object.keys(responses).length;

  // Step 1 fields
  const orgFields = Object.values(form).filter((v) => v.trim() !== "").length;
  const totalOrgFields = Object.keys(form).length;

  // Total progress: step1 + step2 answered questions
  let progress =
    step === 1
      ? (orgFields / totalOrgFields) * 100
      : (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="dashboard">
      <h3>Assessment Overview</h3>

      {framework.map((section, index) => (
        <div key={section.pillar} className="dashboard-section">
          <strong
            style={{
              color:
                step === 2 && pillarIndex === index
                  ? "#4f46e5"
                  : "#333",
            }}
          >
            {section.pillar}
          </strong>
          <span className="count">({section.questions.length})</span>
        </div>
      ))}

      <div className="step-indicator">
        {step === 1 && "Organisation Info"}
        {step === 2 && framework[pillarIndex].pillar}
        {step === 3 && "Results"}
      </div>

      {/* PROGRESS BAR */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">{progress.toFixed(0)}% Completed</div>
    </div>
  );
};

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const [step, setStep] = useState(1);
  const [pillarIndex, setPillarIndex] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [notes, setNotes] = useState<Record<Pillar, string>>({
    Strategy: "",
    Capacity: "",
    Discipline: "",
    Performance: "",
  });
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    Organisation: "",
    Email: "",
    ExperienceYears: "",
    Innovation: "",
    EmployeesNo: "",
    Location: "",
    Notes: "",
  });

  const validateStep1 = () => {
    if (Object.values(form).some((v) => v.trim() === "")) {
      setError("All fields are required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const calculateScores = (): Scores => {
    const scores = {} as Scores;
    framework.forEach((section) => {
      const values = section.questions.map(
        (_, i) => responses[`${section.pillar}-${i}`] ?? 0
      );
      scores[section.pillar] =
        values.reduce((a, b) => a + b, 0) / values.length;
    });
    return scores;
  };

  const scores = calculateScores();
  const currentSection = framework[pillarIndex];

  return (
    <div className="app-container">
      <div className="layout">
        <AssessmentDashboard
          step={step}
          pillarIndex={pillarIndex}
          responses={responses}
          form={form}
        />

        <div className="card">
          <h1 className="title">Innovation Assessment Survey</h1>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2>Organisation Information</h2>
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  className="input"
                  placeholder={key}
                  value={form[key as keyof typeof form]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                />
              ))}
              {error && <p className="error-text">{error}</p>}
              <button
                className="primary-btn"
                onClick={() => {
                  if (validateStep1()) {
                    setPillarIndex(0);
                    setStep(2);
                  }
                }}
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h2>{currentSection.pillar} Assessment</h2>

              {/* USER EDITABLE NOTES */}
              <div className="info-note">
                <label className="note-label">Notes (optional)</label>
                <textarea
                  className="note-textarea"
                  placeholder={`Add your notes for ${currentSection.pillar}...`}
                  value={notes[currentSection.pillar]}
                  onChange={(e) =>
                    setNotes({
                      ...notes,
                      [currentSection.pillar]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="section-box">
                {currentSection.questions.map((q, i) => (
                  <div key={i} className="question">
                    <p>{q}</p>
                    <div className="radio-group">
                      {options.map((opt) => (
                        <label key={opt.value} className="radio-option">
                          <input
                            type="radio"
                            name={`${currentSection.pillar}-${i}`}
                            checked={
                              responses[
                                `${currentSection.pillar}-${i}`
                              ] === opt.value
                            }
                            onChange={() =>
                              setResponses({
                                ...responses,
                                [`${currentSection.pillar}-${i}`]:
                                  opt.value,
                              })
                            }
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                {pillarIndex > 0 && (
                  <button
                    className="secondary-btn"
                    onClick={() => setPillarIndex(pillarIndex - 1)}
                  >
                    Previous
                  </button>
                )}
                {pillarIndex < framework.length - 1 ? (
                  <button
                    className="primary-btn"
                    onClick={() => setPillarIndex(pillarIndex + 1)}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="primary-btn"
                    onClick={() => setStep(3)}
                  >
                    View Results
                  </button>
                )}
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h2>Results</h2>
              {Object.entries(scores).map(([pillar, score]) => (
                <div key={pillar} className="section-box">
                  <h3>
                    {pillar} — {score.toFixed(1)} ({getMaturityLevel(score)})
                  </h3>
                  <p>{getRecommendation(pillar as Pillar, score)}</p>
                  {notes[pillar as Pillar] && (
                    <div className="info-note">
                      <strong>Your Notes:</strong>
                      <p>{notes[pillar as Pillar]}</p>
                    </div>
                  )}
                </div>
              ))}

              <button
                className="secondary-btn"
                onClick={() => {
                  setResponses({});
                  setNotes({
                    Strategy: "",
                    Capacity: "",
                    Discipline: "",
                    Performance: "",
                  });
                  setPillarIndex(0);
                  setStep(1);
                }}
              >
                Restart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

