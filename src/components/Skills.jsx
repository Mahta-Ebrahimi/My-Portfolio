import React from 'react';

const CATEGORIES = [
  {
    label: 'Design',
    accent: '#FF9533',
    skills: [
      'Figma',
      'Design Systems',
      'UI/UX Design',
      'Usability testsing',
      'SEO Analyses',
      'AI Heatmaps',
      'Wireframing',
      'Prototyping',
      'Responsive Design',
    ],
  },
  // 'Galileo AI'
  {
    label: 'AI Tools',
    accent: '#00E5A0',
    sub: [
      {
        sublabel: 'AI Design',
        skills: ['Figma Make', 'Claude Design','Uizard', 'Google Stitch', 'UX Pilot'],
      },
      {
        sublabel: 'AI Development',
        skills: ['Cursor', 'GitHub Copilot', 'v0 by Vercel', 'Claude AI'],
      },
      // , 'Bolt.new'
    ],
  },
  {
    label: 'Frontend',
    accent: '#9CA3AF',
    skills: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'ShadCN',
    ],
  },
];

const OTHER = ['Git', 'GitHub', 'VS Code', 'Vercel', 'WordPress', 'Photoshop', 'Illustrator'];

const Pill = ({ label, accent }) => (
  <span
    className='text-xs px-3 py-1.5 border bg-[#0D0D0D] font-medium tracking-wide'
    style={{ borderColor: accent + '33', color: accent }}
  >
    {label}
  </span>
);

const Skills = () => {
  return (
    <div name='skills' id='skills' className='w-full bg-black text-gray-300 py-16 px-4'>
      <div className='max-w-[1100px] mx-auto'>

        {/* Heading */}
        <div className='text-center mb-12'>
          <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#444] mb-2'>Capabilities</p>
          <h2 className='text-3xl sm:text-4xl font-bold text-white'>Skills & Tools</h2>
        </div>

        {/* Three columns */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

          {/* Design */}
          <div className='bg-[#0D0D0D] border border-[#1A1A1A] p-6'>
            <div className='flex items-center gap-2 mb-5'>
              <div className='w-1 h-5' style={{ background: '#FF9533' }} />
              <p className='text-sm font-bold tracking-wider uppercase' style={{ color: '#FF9533' }}>
                Design
              </p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {CATEGORIES[0].skills.map(s => (
                <Pill key={s} label={s} accent='#FF9533' />
              ))}
            </div>
          </div>

          {/* AI Tools — middle, highlighted */}
          <div
            className='border p-6'
            style={{ background: '#040F0A', borderColor: '#00E5A044' }}
          >
            <div className='flex items-center gap-2 mb-5'>
              <div className='w-1 h-5' style={{ background: '#00E5A0' }} />
              <p className='text-sm font-bold tracking-wider uppercase' style={{ color: '#00E5A0' }}>
                AI Tools
              </p>
            </div>

            {CATEGORIES[1].sub.map(({ sublabel, skills }) => (
              <div key={sublabel} className='mb-4'>
                <p className='text-[10px] uppercase tracking-widest text-[#2A5A4A] mb-2'>{sublabel}</p>
                <div className='flex flex-wrap gap-2'>
                  {skills.map(s => (
                    <Pill key={s} label={s} accent='#00E5A0' />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Frontend */}
          <div className='bg-[#0D0D0D] border border-[#1A1A1A] p-6'>
            <div className='flex items-center gap-2 mb-5'>
              <div className='w-1 h-5 bg-[#9CA3AF]' />
              <p className='text-sm font-bold tracking-wider uppercase text-[#b2c1db]'>
                Frontend
              </p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {CATEGORIES[2].skills.map(s => (
                <Pill key={s} label={s} accent='#9CA3AF' />
              ))}
            </div>
          </div>
        </div>

        {/* Other Tools */}
        <div className='mt-4 bg-[#0D0D0D] border border-[#1A1A1A] px-6 py-5'>
          <p className='text-[10px] uppercase tracking-widest text-[#b2a8a8] mb-3'>Other Tools</p>
          <div className='flex flex-wrap gap-2'>
            {OTHER.map(s => (
              <span
                key={s}
                className='text-xs px-3 py-1.5 border border-[#222] text-[#9a9393] bg-[#0A0A0A]'
              >
                {s}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Skills;
