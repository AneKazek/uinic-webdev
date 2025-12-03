import React from 'react';

const PlayIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M11.5 7L0.25 13.9282L0.25 0.0717969L11.5 7Z" fill="currentColor" />
  </svg>
);

const WindowTrafficLights = () => (
  <div className="absolute top-4 left-6 flex gap-[7px]">
    <div className="w-3 h-3 rounded-full bg-[#2D3748]"></div>
    <div className="w-3 h-3 rounded-full bg-[#2D3748]"></div>
    <div className="w-3 h-3 rounded-full bg-[#2D3748]"></div>
  </div>
);

const ProjectsShowcase = () => {
  const projects = [
    { name: "Create a Discord Bot with Python", active: true },
    { name: "Generate a Blog with OpenAI", active: false },
    { name: "Create a GIF with Python", active: false },
  ];

  return (
    <div className="bg-[#0A0E1A] py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="font-accent text-3xl md:text-[32px] text-center text-white tracking-wider leading-tight">
          What you'll build
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-[#B4B4B4]">
          Gain the skills you need to build full-fledged, real-world projects. Plus, receive personalized code reviews from experts who are here to support your journey.
        </p>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel: Projects List */}
          <div className="bg-[#1A1F2E] border border-[#2D3748] rounded-xl shadow-[0_0_30px_rgba(0,166,255,0.07)]">
            <div className="p-8">
              <ul className="space-y-4">
                {projects.map((project, index) => (
                  <li key={index} className="flex items-center gap-4 py-1">
                    <div className="w-6 flex justify-start">
                      {project.active && <PlayIcon />}
                    </div>
                    <span className="text-lg text-white font-medium">
                      {project.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel: Chat Mockup */}
          <div className="bg-[#1A1F2E] border border-[#2D3748] rounded-xl shadow-[0_0_30px_rgba(0,166,255,0.07)] relative">
            <WindowTrafficLights />
            <div className="p-8 pt-16">
              <div className="flex gap-4 items-start">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 bg-[#3F3F46] rounded-lg flex-shrink-0">
                  {/* Mock pixel avatar */}
                </div>
                
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-semibold text-[#E5923A]">hongj77</span>
                    <span className="text-xs text-[#6B7280]">Today at 11:28 PM</span>
                  </div>
                  <p className="mt-1 text-white font-mono text-base">
                    $meme
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;