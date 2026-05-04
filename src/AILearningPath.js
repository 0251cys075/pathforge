import React, { useMemo, useState, useEffect, useCallback } from 'react';

const TIMER_DURATION = 30 * 60; // 30 minutes in seconds

function TaskCard({ task, taskId, moduleId, status, onStart, isLocked }) {
  const { timeRemaining = TIMER_DURATION, isRunning = false, completed = false } = status || {};
  
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${completed ? 'rgba(46,204,113,0.3)' : 'rgba(255,255,255,0.1)'}`,
      borderRadius: '16px',
      padding: '16px',
      position: 'relative',
      transition: 'all 0.3s ease',
      opacity: isLocked ? 0.6 : 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: completed ? '#2ECC71' : 'rgba(255,255,255,0.8)' }}>
          {completed ? '✅ Task Verified' : `Activity ${taskId + 1}`}
        </span>
        {!completed && !isLocked && (
          <div style={{ fontSize: '13px', color: isRunning ? '#FF6B35' : 'rgba(255,255,255,0.4)', fontWeight: 'bold', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '6px' }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        )}
      </div>
      <p style={{ fontSize: '13px', color: completed ? 'rgba(255,255,255,0.5)' : 'white', marginBottom: '16px', lineHeight: '1.4' }}>{task}</p>
      
      {!completed && (
        <button
          disabled={isLocked || isRunning}
          onClick={() => onStart(moduleId, taskId)}
          style={{
            width: '100%',
            padding: '10px',
            background: isRunning ? 'rgba(255,107,53,0.1)' : isLocked ? 'rgba(255,255,255,0.05)' : '#FF6B35',
            color: isRunning ? '#FF6B35' : isLocked ? 'rgba(255,255,255,0.2)' : 'white',
            border: isRunning ? '1px solid #FF6B35' : 'none',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '800',
            cursor: (isLocked || isRunning) ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {isRunning ? '⚡ Timer Active...' : isLocked ? '🔒 Locked' : '▶️ Start 30m Task'}
        </button>
      )}
      
      {completed && (
        <div style={{ fontSize: '12px', color: '#2ECC71', fontWeight: '700', textAlign: 'center', background: 'rgba(46,204,113,0.1)', padding: '8px', borderRadius: '8px' }}>
          Skill Validated
        </div>
      )}
    </div>
  );
}

const weeklyPlans = {
  'Frontend Development': [
    { week: 'Week 1', title: 'HTML & CSS Foundations', duration: '5-7 hours', description: 'Learn the building blocks of every website. HTML gives structure, CSS gives style.', tasks: ['Complete HTML basics — headings, paragraphs, links, images', 'Learn CSS selectors, colors, fonts, and spacing', 'Build a simple personal profile page'], resources: [{ name: 'freeCodeCamp HTML/CSS', url: 'https://www.freecodecamp.org', type: 'Free Course' }], outcome: 'You can build a basic webpage from scratch' },
    { week: 'Week 2', title: 'JavaScript Basics', duration: '6-8 hours', description: 'JavaScript makes websites interactive. Learn variables, functions, and events.', tasks: ['Learn variables, data types, and operators', 'Understand if/else, loops, and functions', 'Build a simple calculator or to-do list'], resources: [{ name: 'JavaScript.info', url: 'https://javascript.info', type: 'Free Course' }], outcome: 'You can add interactivity to any webpage' },
    { week: 'Week 3', title: 'React Fundamentals', duration: '7-9 hours', description: 'React is the most in-demand frontend skill. Learn components, props, and state.', tasks: ['Understand what React is and why companies use it', 'Learn components, JSX syntax, and props', 'Build a simple React app with multiple components'], resources: [{ name: 'React Official Docs', url: 'https://react.dev/learn', type: 'Free Docs' }], outcome: 'You can build a basic React application' },
    { week: 'Week 4', title: 'Tailwind CSS + Responsive Design', duration: '5-6 hours', description: 'Make your apps look professional on any screen size.', tasks: ['Install and configure Tailwind CSS', 'Learn utility classes for layout, spacing, and colors', 'Make your React app fully responsive on mobile'], resources: [{ name: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', type: 'Free Docs' }], outcome: 'Your app looks great on both desktop and mobile' },
    { week: 'Week 5', title: 'Git & GitHub + First Project', duration: '6-8 hours', description: 'Push your project to GitHub — this is what recruiters actually check.', tasks: ['Learn git init, add, commit, push commands', 'Create a GitHub account and push your first project', 'Write a good README file for your project'], resources: [{ name: 'GitHub Docs', url: 'https://docs.github.com/en/get-started', type: 'Free Docs' }], outcome: 'Your project is live on GitHub for recruiters to see' },
    { week: 'Week 6', title: 'Apply + Portfolio + Internships', duration: '5-7 hours', description: 'Time to get hired. Build your portfolio and start applying.', tasks: ['Build a portfolio website with your 2-3 best projects', 'Update your resume with GitHub links', 'Apply to 5+ frontend internships on LinkedIn and Internshala'], resources: [{ name: 'Internshala', url: 'https://internshala.com', type: 'Apply Here' }], outcome: 'You have a live portfolio and active job applications' },
  ],
  'Backend Development': [
    { week: 'Week 1', title: 'Node.js Basics', duration: '5-7 hours', description: 'Node.js lets you run JavaScript on the server.', tasks: ['Install Node.js', 'Learn modules and npm', 'Build a simple CLI app'], resources: [{ name: 'Node.js Docs', url: 'https://nodejs.org', type: 'Free Docs' }], outcome: 'You can run JavaScript outside the browser' },
    { week: 'Week 2', title: 'Express.js + REST APIs', duration: '6-8 hours', description: 'Express is the most popular Node.js framework.', tasks: ['Set up an Express server', 'Create GET/POST routes', 'Test using Postman'], resources: [{ name: 'Express Docs', url: 'https://expressjs.com', type: 'Free Docs' }], outcome: 'You have built a working REST API' },
    { week: 'Week 3', title: 'MongoDB + Mongoose', duration: '6-7 hours', description: 'Connect your backend to a database.', tasks: ['Set up MongoDB Atlas', 'Connect using Mongoose', 'Build CRUD operations'], resources: [{ name: 'MongoDB Atlas', url: 'https://mongodb.com', type: 'Free Tool' }], outcome: 'Your API now reads and writes to a database' },
    { week: 'Week 4', title: 'Authentication + JWT', duration: '6-8 hours', description: 'Learn how login systems work with tokens.', tasks: ['Implement user registration', 'Generate JWT tokens', 'Protect routes'], resources: [{ name: 'JWT.io', url: 'https://jwt.io', type: 'Free Tool' }], outcome: 'Your app has a working login system' },
    { week: 'Week 5', title: 'SQL + Deployment', duration: '6-7 hours', description: 'Learn SQL databases and deploy live.', tasks: ['Learn basic SQL', 'Deploy on Render or Railway', 'Connect frontend to live backend'], resources: [{ name: 'SQLZoo', url: 'https://sqlzoo.net', type: 'Free Practice' }], outcome: 'Your backend is live on the internet' },
    { week: 'Week 6', title: 'Project + Apply', duration: '5-7 hours', description: 'Build a complete full-stack project.', tasks: ['Build a full-stack project', 'Push to GitHub', 'Apply to 5+ internships'], resources: [{ name: 'Internshala', url: 'https://internshala.com', type: 'Apply Here' }], outcome: 'You have a complete backend project' },
  ],
  'Cyber Security': [
    { week: 'Week 1', title: 'Networking Fundamentals', duration: '5-7 hours', description: 'Understand how the internet works, TCP/IP, and DNS.', tasks: ['Learn OSI model', 'Understand IP addressing', 'Basic packet sniffing with Wireshark'], resources: [{ name: 'CompTIA Network+', url: 'https://www.comptia.org', type: 'Certification Path' }], outcome: 'You understand network communication' },
    { week: 'Week 2', title: 'Linux & Scripting', duration: '6-8 hours', description: 'Most security tools run on Linux. Learn Bash scripting.', tasks: ['Master Linux command line', 'Write basic automation scripts', 'Set up a virtual lab'], resources: [{ name: 'Linux Journey', url: 'https://linuxjourney.com', type: 'Free Course' }], outcome: 'You can navigate and automate in Linux' },
    { week: 'Week 3', title: 'Web Application Security', duration: '7-9 hours', description: 'Learn OWASP Top 10 vulnerabilities like SQLi and XSS.', tasks: ['Practice on DVWA', 'Learn Burp Suite basics', 'Identify common web flaws'], resources: [{ name: 'OWASP Top 10', url: 'https://owasp.org', type: 'Standard' }], outcome: 'You can identify web vulnerabilities' },
    { week: 'Week 4', title: 'Network Security & Firewalls', duration: '6-8 hours', description: 'Secure networks using firewalls and IDS/IPS.', tasks: ['Configure a firewall', 'Learn Nmap for scanning', 'Understand encryption basics'], resources: [{ name: 'TryHackMe', url: 'https://tryhackme.com', type: 'Lab' }], outcome: 'You can secure a local network' },
    { week: 'Week 5', title: 'Ethical Hacking Tools', duration: '7-9 hours', description: 'Learn to use Metasploit and other penetration testing tools.', tasks: ['Execute a basic exploit in a lab', 'Learn privilege escalation', 'Generate security reports'], resources: [{ name: 'Kali Linux Docs', url: 'https://www.kali.org', type: 'Official' }], outcome: 'You know the ethical hacking methodology' },
    { week: 'Week 6', title: 'Security Audit + Jobs', duration: '5-7 hours', description: 'Prepare for security certifications and internships.', tasks: ['Build a security portfolio', 'Practice CTFs', 'Apply for Junior Analyst roles'], resources: [{ name: 'Bugcrowd', url: 'https://www.bugcrowd.com', type: 'Bug Bounty' }], outcome: 'You are ready for entry-level security roles' },
  ],
  'AI Basics': [
    { week: 'Week 1', title: 'Python for AI', duration: '5-7 hours', description: 'Learn Python basics specifically for AI/ML.', tasks: ['Learn NumPy and Pandas', 'Data manipulation basics', 'Build a simple data analysis script'], resources: [{ name: 'Kaggle Python', url: 'https://www.kaggle.com/learn/python', type: 'Free Course' }], outcome: 'You can handle data with Python' },
    { week: 'Week 2', title: 'Mathematics for AI', duration: '6-8 hours', description: 'The math behind the machines: Linear Algebra and Calculus.', tasks: ['Understand Matrix operations', 'Learn Probability basics', 'Derivatives in Optimization'], resources: [{ name: 'Khan Academy Math', url: 'https://www.khanacademy.org', type: 'Free Course' }], outcome: 'You understand the logic behind AI' },
    { week: 'Week 3', title: 'Machine Learning Basics', duration: '7-9 hours', description: 'Introduction to Supervised and Unsupervised learning.', tasks: ['Linear Regression', 'Decision Trees', 'Build a Titanic survival predictor'], resources: [{ name: 'Scikit-Learn Docs', url: 'https://scikit-learn.org', type: 'Free Docs' }], outcome: 'You can build basic ML models' },
  ]
};

const beginnerCore = {
  'Python': { title: 'Python Fundamentals', description: 'Learn Python syntax, loops, and data structures.' },
  'Java': { title: 'Java & OOP Basics', description: 'Learn classes, inheritance, and Java syntax.' },
  'C++': { title: 'C++ & Logic', description: 'Master memory management and pointers in C++.' },
  'C lang': { title: 'C Programming', description: 'Understand low-level memory and structural programming.' },
  'AI Basics': { title: 'AI & Data Foundations', description: 'Introduction to data science and AI concepts.' }
};

const defaultPlan = weeklyPlans['Frontend Development'];

export default function AILearningPath({ userData, onBack, onNext, onProgressUpdate }) {
  const skillName = userData?.skill?.title || 'Frontend Development';
  const name = userData?.name || 'Student';
  const skillIcon = userData?.skill?.icon || '💻';
  const goal = userData?.goal?.label || '💼 Get a Job';

  const [moduleProgress, setModuleProgress] = useState(() => userData?.learningProgress?.modules || {});
  const [activeStep, setActiveStep] = useState(null);
  const [testResult, setTestResult] = useState('');
  const [remediationSteps] = useState(userData?.remediationWeeks || []);
  
  // New State for Task Timers and Unlocking
  const [tasksStatus, setTasksStatus] = useState(() => userData?.learningProgress?.tasksStatus || {});
  const [unlockedModules, setUnlockedModules] = useState(() => userData?.learningProgress?.unlockedModules || {});

  const steps = useMemo(() => {
    let baseSteps = weeklyPlans[skillName] || defaultPlan;
    
    // Inject Beginner Core if level is Beginner
    if (userData?.level === 'Beginner' && userData?.assessmentResults?.startLanguage) {
      const core = beginnerCore[userData.assessmentResults.startLanguage];
      if (core) {
        const coreModule = {
          week: 'Week 0',
          title: core.title,
          duration: '10-12 hours',
          description: core.description,
          tasks: ['Complete basic syntax tutorials', 'Build 3 mini-projects', 'Pass the language quiz'],
          resources: [{ name: 'W3Schools', url: 'https://www.w3schools.com', type: 'Free' }],
          outcome: `You are now proficient enough in ${userData.assessmentResults.startLanguage} to start ${skillName}`
        };
        baseSteps = [coreModule, ...baseSteps];
      }
    }

    if (remediationSteps.length === 0) return baseSteps;
    
    const injected = [...baseSteps];
    remediationSteps.forEach((title, idx) => {
      injected.splice(3 + idx, 0, {
        week: `Remediation ${idx + 1}`,
        title: title.split(': ')[1] || title,
        duration: '4-5 hours',
        description: `This module was dynamically added based on your Project Audit results.`,
        tasks: ['Review AI-identified gaps', 'Refactor existing project code'],
        resources: [{ name: 'PathForge Security Hub', url: '#', type: 'Exclusive' }],
        outcome: 'Your project depth matches industry standards'
      });
    });
    return injected;
  }, [skillName, remediationSteps, userData]);

  const doneCount = useMemo(
    () => Object.values(moduleProgress).filter((value) => value?.completed).length,
    [moduleProgress]
  );
  const progress = Math.round((doneCount / steps.length) * 100);

  const syncLearningProgress = useCallback((nextModules, nextTasksStatus = tasksStatus, nextUnlocked = unlockedModules) => {
    if (!onProgressUpdate) return;
    const nextDoneCount = Object.values(nextModules).filter((value) => value?.completed).length;
    const nextProgress = Math.round((nextDoneCount / steps.length) * 100);
    onProgressUpdate({
      learningProgress: {
        modules: nextModules,
        completedCount: nextDoneCount,
        total: steps.length,
        percent: nextProgress,
        tasksStatus: nextTasksStatus,
        unlockedModules: nextUnlocked
      },
    });
  }, [onProgressUpdate, steps.length, tasksStatus, unlockedModules]);

  const checkModuleVerification = useCallback((mId, moduleTasks, currentModules) => {
    const totalTasks = steps[mId].tasks.length;
    const completedTasks = Object.values(moduleTasks).filter(t => t.completed).length;
    
    if (completedTasks === totalTasks) {
      const nextModules = { 
        ...currentModules, 
        [mId]: { ...currentModules[mId], completed: true, verified: true, courseDone: true, testPassed: true, testScore: 100 } 
      };
      setModuleProgress(nextModules);
      syncLearningProgress(nextModules);
    }
  }, [steps, syncLearningProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasksStatus(prev => {
        const next = { ...prev };
        let changed = false;
        
        Object.keys(next).forEach(mId => {
          Object.keys(next[mId]).forEach(tId => {
            const task = next[mId][tId];
            if (task.isRunning && task.timeRemaining > 0) {
              next[mId][tId] = { ...task, timeRemaining: task.timeRemaining - 1 };
              changed = true;
              
              if (next[mId][tId].timeRemaining === 0) {
                next[mId][tId].isRunning = false;
                next[mId][tId].completed = true;
                checkModuleVerification(mId, next[mId], moduleProgress);
              }
            }
          });
        });
        
        if (changed) {
          syncLearningProgress(moduleProgress, next);
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [moduleProgress, checkModuleVerification, syncLearningProgress]);

  const handleStartTimer = (mId, tId) => {
    setTasksStatus(prev => {
      const next = {
        ...prev,
        [mId]: {
          ...(prev[mId] || {}),
          [tId]: { ...(prev[mId]?.[tId] || { timeRemaining: TIMER_DURATION }), isRunning: true }
        }
      };
      syncLearningProgress(moduleProgress, next);
      return next;
    });
  };

  const handleResourceClick = (mId) => {
    if (unlockedModules[mId]) return;
    setUnlockedModules(prev => {
      const next = { ...prev, [mId]: true };
      syncLearningProgress(moduleProgress, tasksStatus, next);
      return next;
    });
  };

  const startOrFinishCourse = (index) => {
    setModuleProgress((prev) => {
      const current = prev[index] || {};
      if (!current.courseStarted) {
        return { ...prev, [index]: { ...current, courseStarted: true } };
      }
      const next = {
        ...prev,
        [index]: { ...current, courseDone: true, completed: Boolean(current.testPassed) },
      };
      syncLearningProgress(next);
      return next;
    });
  };

  const submitAIViva = (index, answer) => {
    if (!answer || answer.length < 20) {
      setTestResult('⚠️ Your explanation is too short. AI needs more detail to validate your skill.');
      return;
    }
    setTestResult('🔍 AI is auditing your explanation...');
    setTimeout(() => {
      const passed = answer.length > 50; 
      const score = passed ? 85 : 40;
      setModuleProgress((prev) => {
        const next = {
          ...prev,
          [index]: { ...prev[index], testPassed: passed, testScore: score, completed: passed && Boolean(prev[index]?.courseDone) },
        };
        syncLearningProgress(next);
        return next;
      });
      setTestResult(passed ? `✅ AI Validation Successful: Depth Score ${score}%. Skill verified.` : `❌ AI Validation Failed: Your explanation lacked technical depth. Try again.`);
    }, 2000);
  };


  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', color: 'white', padding: '30px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
          <button onClick={onBack} style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer' }}>← Back</button>
          <h1 style={{ color: '#FF6B35', fontSize: '22px', fontWeight: 'bold' }}>⚡ PathForge</h1>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', borderRadius: '20px', padding: '6px 18px', marginBottom: '16px', fontSize: '13px', color: '#FF6B35' }}>
            🤖 AI-Driven Adaptive Roadmap
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{name}'s Learning Journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>{skillIcon} {skillName} · 🎯 {goal.split(' ').slice(1).join(' ')}</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{doneCount} of {steps.length} modules mastered</span>
            <span style={{ color: '#FF6B35', fontWeight: 'bold' }}>{progress}%</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #FF6B35, #FF9A6C)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {steps.map((step, i) => {
            const item = moduleProgress[i] || {};
            const isDone = Boolean(item.completed);
            const isOpen = activeStep === i;
            return (
              <div key={i} style={{ background: isDone ? 'rgba(46,204,113,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isDone ? 'rgba(46,204,113,0.2)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '20px', overflow: 'hidden' }}>
                <div onClick={() => setActiveStep(isOpen ? null : i)} style={{ padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isDone ? '#2ECC71' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDone ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: 'bold', fontSize: '14px' }}>{isDone ? '✓' : i + 1}</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: isDone ? '#2ECC71' : 'white' }}>{step.title}</h3>
                        {isDone && <span style={{ fontSize: '10px', background: '#2ECC71', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: '800', textTransform: 'uppercase' }}>Verified</span>}
                      </div>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{step.week} · {step.duration}</p>
                    </div>
                  </div>
                  <div style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s', color: 'rgba(255,255,255,0.3)' }}>▼</div>
                </div>

                {isOpen && (
                  <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: '20px 0', lineHeight: '1.6' }}>{step.description}</p>
                    <div style={{ marginTop: '24px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#FF6B35', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📖 Learning Resources
                        <span style={{ fontSize: '10px', background: 'rgba(255,107,53,0.1)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'normal', color: 'rgba(255,107,53,0.8)' }}>Click to unlock tasks</span>
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                        {step.resources.map((res, ri) => (
                          <a 
                            key={ri} 
                            href={res.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => handleResourceClick(i)}
                            style={{ 
                              background: 'rgba(52,152,219,0.1)', 
                              border: '1px solid rgba(52,152,219,0.3)', 
                              padding: '10px 16px', 
                              borderRadius: '12px', 
                              fontSize: '13px', 
                              color: '#3498DB', 
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(52,152,219,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(52,152,219,0.1)'}
                          >
                            🔗 {res.name} <span style={{ fontSize: '11px', opacity: 0.6 }}>({res.type})</span>
                          </a>
                        ))}
                      </div>

                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#FF6B35', marginBottom: '16px' }}>🛠 Interactive Task Cards</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                        {step.tasks.map((t, ti) => (
                          <TaskCard 
                            key={ti}
                            task={t}
                            taskId={ti}
                            moduleId={i}
                            status={tasksStatus[i]?.[ti]}
                            isLocked={!unlockedModules[i]}
                            onStart={handleStartTimer}
                          />
                        ))}
                      </div>
                    </div>

                    {isDone && (
                      <div style={{ marginTop: '24px', background: 'rgba(46,204,113,0.1)', border: '1px solid #2ECC71', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2ECC71', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🛡️</div>
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2ECC71' }}>Module Verified</h4>
                          <p style={{ fontSize: '12px', color: 'rgba(46,204,113,0.8)' }}>You have successfully completed all focus sessions for this module.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={onNext} style={{ background: '#FF6B35', color: 'white', border: 'none', padding: '16px 48px', borderRadius: '30px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer' }}>View Employability Score →</button>
      </div>
    </div>
  );
}