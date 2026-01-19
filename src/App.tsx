import { useState } from "react";
import "./App.css";

const framework = [
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
const getRecommendation = (pillar, score) => {
  if (score <= 3) {
    switch (pillar) {
      case "Strategy":
        return "Your innovation strategy is unclear. Focus on defining innovation intent, identifying priority areas, and aligning innovation with long-term goals.";
      case "Capacity":
        return "Your innovation capacity is limited. Strengthen basic processes, invest in skills, and build collaboration.";
      case "Discipline":
        return "Innovation discipline is weak. Improve leadership ownership, experimentation, and simple performance tracking.";
      case "Performance":
        return "Innovation performance is low. Focus on solving real problems and delivering small, measurable wins.";
      default:
        return "";
    }
  }

  if (score <= 6) {
    switch (pillar) {
      case "Strategy":
        return "You have a developing innovation strategy. Improve focus area prioritization and strengthen portfolio balance.";
      case "Capacity":
        return "Your innovation capacity is moderate. Enhance collaboration, execution discipline, and resource utilization.";
      case "Discipline":
        return "Innovation discipline exists but lacks consistency. Strengthen accountability, leadership behaviors, and metrics.";
      case "Performance":
        return "Innovation performance is moderate. Improve value realization and scale successful initiatives.";
      default:
        return "";
    }
  }

  if (score <= 8) {
    switch (pillar) {
      case "Strategy":
        return "Your innovation strategy is strong. Continue refining focus areas and actively managing your innovation portfolio.";
      case "Capacity":
        return "You have good innovation capacity. Optimize processes, deepen partnerships, and invest in advanced tools.";
      case "Discipline":
        return "Your innovation discipline is solid. Reinforce metrics, leadership practices, and a learning culture.";
      case "Performance":
        return "Your innovation performance is strong. Focus on sustained value creation and improved value capture.";
      default:
        return "";
    }
  }

  switch (pillar) {
    case "Strategy":
      return "Excellent innovation strategy. You demonstrate clear intent, strong focus, and a well-balanced portfolio.";
    case "Capacity":
      return "Excellent innovation capacity. You effectively leverage processes, people, and resources to execute innovation.";
    case "Discipline":
      return "Excellent innovation discipline. Your leadership, culture, and metrics strongly support sustained innovation.";
    case "Performance":
      return "Excellent innovation performance. You consistently create and capture value and effectively leverage AI.";
    default:
      return "";
  }
};
const getMaturityLevel = (score) => {
  if (score <= 3) return "Early Stage";
  if (score <= 6) return "Developing";
  if (score <= 8) return "Advanced";
  return "Leading";
};

export default function App() {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({});

  const calculateScores = () => {
    const scores = {};
    framework.forEach((section) => {
      const values = section.questions.map(
        (_, i) => responses[`${section.pillar}-${i}`] || 0
      );
      scores[section.pillar] =
        values.reduce((a, b) => a + b, 0) / values.length;
    });
    return scores;
  };

  const scores = calculateScores();

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Innovation Assessment Survey</h1>

        {/* SECTION 1 */}
        {step === 1 && (
          <>
            <h2>Section 1: Profile & Context</h2>
            <input className="input" placeholder="Organization Name" />
            <input className="input" placeholder="Industry" />
            <input className="input" placeholder="Role / Designation" />

            <button className="primary-btn" onClick={() => setStep(2)}>
              Continue to Assessment
            </button>
          </>
        )}

        {/* SECTION 2 */}
        {step === 2 && (
          <>
            <h2>Section 2: Individual Assessment</h2>

            {framework.map((section) => (
              <div key={section.pillar} className="section-box">
                <h3>{section.pillar}</h3>

                {section.questions.map((q, i) => (
                  <div key={i} className="question">
                    <p>{q}</p>
                    <div className="options">
                      {[0, 2, 4, 6, 8, 10].map((val) => (
                        <label key={val}>
                          <input
                            type="radio"
                            name={`${section.pillar}-${i}`}
                            onChange={() =>
                              setResponses({
                                ...responses,
                                [`${section.pillar}-${i}`]: val,
                              })
                            }
                          />
                          {val}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <button className="primary-btn" onClick={() => setStep(3)}>
              View Results
            </button>
          </>
        )}

        {/* SECTION 3 */}
        {step === 3 && (
          <>
            <h2>Section 3: Personalized Recommendations</h2>

            {Object.entries(scores).map(([pillar, score]) => (
              <div key={pillar} className="section-box">
                <h3>
                  {pillar} — {score.toFixed(1)} / 10 (
                  {getMaturityLevel(score)})
                </h3>
                <p>{getRecommendation(pillar, score)}</p>
              </div>
            ))}

            <button className="secondary-btn" onClick={() => setStep(1)}>
              Restart Assessment
            </button>
          </>
        )}
      </div>
    </div>
  );
}
