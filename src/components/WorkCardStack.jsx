import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkCardStack = ({ activeProject, projects, activeIndex }) => {
  const [cardHovered, setCardHovered] = useState(false);
  const navigate = useNavigate();
  const isAI = activeProject.badgeColor === '#00E5A0';

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-full max-w-sm md:max-w-md">

        {/* Background stacked cards */}
        {projects.slice(0, 4).map((project, idx) =>
          idx !== activeIndex ? (
            <div
              key={project.id}
              className="absolute w-full h-full bg-[#0D0D0D] border border-[#1E1E1E] p-5"
              style={{
                transform: `translateY(${(idx - activeIndex) * 6}px) translateX(${(idx - activeIndex) * 5}px) rotate(${(idx - activeIndex) * 1.5}deg)`,
                zIndex: idx,
                opacity: idx < 3 ? 0.45 - idx * 0.12 : 0,
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs px-2 py-1 border border-[#333] text-[#555]">
                  {project.badge}
                </span>
                <span className="text-5xl font-bold text-[#1A1A1A]">
                  {String(project.id).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#444]">{project.title}</h3>
            </div>
          ) : null
        )}

        {/* Active card */}
        <div
          className="relative bg-[#111] p-6 transition-all duration-500"
          style={{
            zIndex: 10,
            border: "1.5px solid #222",
            boxShadow: isAI
              ? "0 0 35px rgba(0, 229, 160, 0.22)"
              : "0 0 35px rgba(255,255,255,0.04)",
          }}
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
        >
          {/* Badge */}
          <div className="flex justify-between items-start mb-4">
            <span
              className="text-xs px-2 py-1 border"
              style={{
                color: isAI ? "#00E5A0" : "#FF9533",
                borderColor: isAI ? "#00E5A0" : "#FF9533",
              }}
            >
              {activeProject.badge}
            </span>
            <span className="text-7xl font-bold text-[#1A1A1A]">
              {String(activeProject.id).padStart(2, "0")}
            </span>
          </div>

          {/* Category */}
          <p className="text-sm uppercase tracking-widest text-[#555] mb-3">
            {activeProject.category}
          </p>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-5">
            {activeProject.title}
          </h3>

          {/* Screen mockup */}
          <div className="bg-[#0A0A0A] border border-[#222] rounded-lg overflow-hidden mb-6">
            <div className="bg-[#1A1A1A] px-3 py-1.5 flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
            </div>

            {/* Shorter + slower scroll-shot + bottom padding */}
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(120px, 24vw, 180px)" }}
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transformOrigin: "top center",
                  animation: cardHovered
                    ? "scrollShotSlow 14s ease-in-out infinite"
                    : "none",
                }}
              />

              {/* Invisible padding to allow more scroll */}
              <div style={{ height: "60px" }}></div>

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.55)",
                  opacity: cardHovered ? 0 : 1,
                  transition: "opacity 600ms ease",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Tool pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {activeProject.tools.map((tool, idx) => (
              <span
                key={idx}
                className="text-sm px-3 py-1.5 border border-[#333] text-[#888]"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() =>
              activeProject.external
                ? window.open(activeProject.route, "_blank")
                : navigate(activeProject.route)
            }
            className="mt-3 px-6 py-2.5 text-sm font-bold tracking-wider border bg-white text-black border-white hover:bg-[#FF9533] hover:border-[#FF9533] hover:text-white transition-colors"
          >
            {activeProject.external ? "View Live →" : "View Project →"}
          </button>
        </div>
      </div>

      {/* Slower + shorter scroll animation */}
      <style>
        {`
          @keyframes scrollShotSlow {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20%); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default WorkCardStack;
