import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const WorkCardStack = ({ activeProject, projects, activeIndex, isHinted }) => {
  const [cardHovered, setCardHovered] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const isAI = activeProject.badgeColor === '#00E5A0';

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-full max-w-sm md:max-w-md">

        {/* Background stacked cards — tinted to match the active project's accent */}
        {projects.slice(0, 4).map((project, idx) =>
          idx !== activeIndex ? (
            <div
              key={project.id}
              className="absolute w-full h-full border p-5 transition-colors duration-500"
              style={{
                backgroundColor: isDark
                  ? isAI ? '#061a0f' : '#1a0900'
                  : isAI ? '#f0fdf8' : '#fff7f0',
                borderColor: isDark ? '#1E1E1E' : isAI ? '#c6f0e4' : '#fde8cc',
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

        {/* Active card — entire card is clickable */}
        <div
          className="relative p-6 cursor-pointer transition-all duration-500"
          style={{
            zIndex: 10,
            backgroundColor: isDark
              ? isAI ? '#061a0f' : '#1a0900'
              : isAI ? '#f0fdf8' : '#fff7f0',
            border: cardHovered
              ? `1.5px solid ${isAI ? '#00E5A0' : '#FF9533'}`
              : isHinted
                ? `1.5px solid ${isAI ? '#00E5A066' : '#FF953366'}`
                : isDark ? "1.5px solid #555555" : "1.5px solid #d1d5db",
            boxShadow: cardHovered
              ? isAI ? "0 0 35px rgba(0, 229, 160, 0.30)" : "0 0 35px rgba(255, 149, 51, 0.25)"
              : isHinted
                ? isAI ? "0 0 0 3px rgba(0,229,160,0.18), 0 0 25px rgba(0,229,160,0.10)" : "0 0 0 3px rgba(255,149,51,0.18), 0 0 25px rgba(255,149,51,0.10)"
                : isAI ? "0 0 35px rgba(0, 229, 160, 0.22)" : isDark ? "0 0 35px rgba(255,255,255,0.04)" : "0 0 20px rgba(0,0,0,0.06)",
          }}
          onClick={() =>
            activeProject.external
              ? window.open(activeProject.route, "_blank")
              : navigate(activeProject.route)
          }
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
        >
          {/* Badge */}
          <div className="mb-4">
            <span
              className="text-xs px-2 py-1 border"
              style={{
                color: isAI ? "#00E5A0" : "#FF9533",
                borderColor: isAI ? "#00E5A0" : "#FF9533",
              }}
            >
              {activeProject.badge}
            </span>
          </div>

          {/* Category */}
          <p className="text-sm uppercase tracking-widest text-[#555] mb-2">
            {activeProject.category}
          </p>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4">
            {activeProject.title}
          </h3>

          {/* Screen mockup */}
          <div className="bg-[#0A0A0A] border border-[#222] rounded-lg overflow-hidden mb-4">
            <div className="bg-[#1A1A1A] px-3 py-1.5 flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
            </div>

            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(90px, 16vw, 130px)" }}
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                  transition: "transform 14s ease-in-out",
                  transform: cardHovered ? "translateY(-15%)" : "translateY(0)",
                }}
              />

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  opacity: cardHovered ? 0 : 1,
                  transition: "opacity 600ms ease",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Tool pills */}
          <div className="flex flex-wrap gap-2">
            {activeProject.tools.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 border border-[#333] text-[#888]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCardStack;
