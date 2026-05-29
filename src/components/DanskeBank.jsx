import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCode, FaUser, FaCalendar, FaTag } from 'react-icons/fa';
import danskeBank from '../assets/danskeBank.png';

const projectData = {
  title: 'Danske Bank DevSecAI',
  subtitle: 'Workflow Automation Platform',
  description: 'A comprehensive workflow automation platform built for Bank, featuring DevSecAI integration for secure and efficient business process management.',
  fullDescription: `This project demonstrates a modern approach to workflow automation in the banking sector.
  The application provides a seamless interface for managing complex business processes while maintaining
  strict security standards required in the financial industry.`,
  image: danskeBank,
  demoLink: 'https://danske-bank-workflow-demo.vercel.app/',
  codeLink: 'https://github.com/Mahta-Ebrahimi/Danske-Bank-Workflow-Demo',
  technologies: ['React', 'JavaScript', 'Tailwind CSS', 'API Integration'],
  // role: 'Lead Developer',
  // duration: '3 months',
  features: [
    'Workflow automation with drag-and-drop interface',
    'DevSecAI integration for security scanning',
    'Real-time process monitoring',
    'Role-based access control',
    'Audit logging and compliance tracking'
  ]
};

const DanskeBank = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${projectData.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/80 to-transparent"></div>
        </div>

        {/* Back Button */}
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#FF9533] hover:text-white transition-colors"
          >
            <FaArrowLeft /> Back to Work
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1000px] mx-auto px-4 -mt-20 relative z-10 pb-16">
        {/* Title Card */}
        <div className="bg-[#111] rounded-lg p-8 mb-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {projectData.title}
          </h1>
          <p className="text-xl text-[#FF9533] mb-4">{projectData.subtitle}</p>
          <p className="text-lg leading-relaxed">{projectData.description}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <FaUser className="text-[#FF9533]" />
              <span>{projectData.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-[#FF9533]" />
              <span>{projectData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTag className="text-[#FF9533]" />
              <span>Front-end</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <a
            href={projectData.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FF9533] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#e6852a] transition-colors"
          >
            <FaExternalLinkAlt /> Live Demo
          </a>
          <a
            href={projectData.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2d4a9a] transition-colors"
          >
            <FaGithub /> View Code
          </a>
        </div>

        {/* Description */}
        <div className="bg-[#111] rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
          <p className="leading-relaxed">{projectData.fullDescription}</p>
        </div>

        {/* Technologies */}
        <div className="bg-[#111] rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {projectData.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-black text-[#FF9533] px-4 py-2 rounded text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#111] rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
          <ul className="space-y-3">
            {projectData.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[#FF9533] mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DanskeBank;
