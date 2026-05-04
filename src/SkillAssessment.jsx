import React, { useState } from 'react';

const SkillAssessment = ({ onComplete, onBack, userData }) => {
  const [step, setStep] = useState('level'); // 'level', 'beginner-config', 'quiz', 'result'
  const [targetLevel, setTargetLevel] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const testQuestions = {
    Intermediate: [
      { q: "Which of the following is used to manage state in React?", options: ["useState", "useEffect", "useLink"], ans: "useState" },
      { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Transfer Main Logic"], ans: "Hyper Text Markup Language" },
      { q: "Which command is used to initialize a git repository?", options: ["git start", "git init", "git new"], ans: "git init" }
    ],
    Advanced: [
      { q: "What is the time complexity of searching in a Hash Map (average)?", options: ["O(n)", "O(log n)", "O(1)"], ans: "O(1)" },
      { q: "Which design pattern ensures a class has only one instance?", options: ["Factory", "Singleton", "Observer"], ans: "Singleton" },
      { q: "What is a Closure in JavaScript?", options: ["A function with its lexical environment", "A method to close a database", "A way to terminate a loop"], ans: "A function with its lexical environment" }
    ]
  };

  const handleLevelSelect = (level) => {
    setTargetLevel(level);
    if (level === 'Beginner') {
      setStep('beginner-config');
    } else {
      setStep('quiz');
    }
  };

  const handleBeginnerComplete = () => {
    if (!selectedLang || !selectedField) {
      alert("Please select both a language and a field.");
      return;
    }
    onComplete({
      level: 'Beginner',
      startLanguage: selectedLang,
      field: selectedField,
      skipModules: 0
    });
  };

  const handleQuizAnswer = (selectedOption) => {
    const isCorrect = selectedOption === testQuestions[targetLevel][currentQuestion].ans;
    if (isCorrect) setScore(s => s + 1);

    if (currentQuestion + 1 < testQuestions[targetLevel].length) {
      setCurrentQuestion(q => q + 1);
    } else {
      setStep('result');
    }
  };

  const finishAssessment = () => {
    // If score is high enough, skip first 2 weeks
    const skipCount = score >= 2 ? 2 : 0;
    onComplete({
      level: targetLevel,
      field: targetLevel === 'Intermediate' ? 'Frontend Development' : 'Backend Development', // Defaulting for now
      skipModules: skipCount
    });
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    fontFamily: 'var(--font-main)',
    color: 'white'
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '32px',
    padding: '50px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
  };

  const buttonStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    padding: '20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '700',
    transition: 'all 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {step === 'level' && (
          <>
            <div style={{ fontSize: '60px', marginBottom: '24px' }}>🎯</div>
            <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px' }}>Choose Your Path</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>Where are you starting from today?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {[
                { id: 'Beginner', label: 'Fresh Start (Beginner)', desc: 'Start from absolute scratch', icon: '🌱' },
                { id: 'Intermediate', label: 'Level Up (Intermediate)', desc: 'I know some basics', icon: '🚀' },
                { id: 'Advanced', label: 'Master Class (Advanced)', desc: 'I am ready for the industry', icon: '⚡' }
              ].map(level => (
                <button
                  key={level.id}
                  onClick={() => handleLevelSelect(level.id)}
                  style={buttonStyle}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.1)'; e.currentTarget.style.borderColor = '#FF6B35'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <span style={{ fontSize: '24px' }}>{level.icon}</span>
                  <div>
                    <div style={{ color: 'white' }}>{level.label}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: '400' }}>{level.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'beginner-config' && (
          <>
            <div style={{ fontSize: '60px', marginBottom: '24px' }}>🌱</div>
            <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '32px' }}>Beginner Setup</h2>
            
            <div style={{ textAlign: 'left', marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#FF6B35', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>Pick a starting language</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {['Python', 'Java', 'C++', 'C lang', 'AI Basics'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    style={{ 
                      padding: '12px', 
                      borderRadius: '12px', 
                      border: selectedLang === lang ? '2px solid #FF6B35' : '1px solid rgba(255,255,255,0.1)',
                      background: selectedLang === lang ? 'rgba(255,107,53,0.2)' : 'rgba(255,255,255,0.03)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '700'
                    }}
                  >{lang}</button>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '40px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#FF6B35', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>Career Interest</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {['Frontend', 'Backend', 'Cyber Security', 'Data Science'].map(field => (
                  <button 
                    key={field}
                    onClick={() => setSelectedField(field)}
                    style={{ 
                      padding: '12px', 
                      borderRadius: '12px', 
                      border: selectedField === field ? '2px solid #FF6B35' : '1px solid rgba(255,255,255,0.1)',
                      background: selectedField === field ? 'rgba(255,107,53,0.2)' : 'rgba(255,255,255,0.03)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '700'
                    }}
                  >{field}</button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleBeginnerComplete}
              style={{ 
                width: '100%', 
                padding: '18px', 
                borderRadius: '16px', 
                background: '#FF6B35', 
                color: 'white', 
                border: 'none', 
                fontSize: '16px', 
                fontWeight: '800', 
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(255,107,53,0.3)'
              }}
            >Generate Beginner Roadmap</button>
          </>
        )}

        {step === 'quiz' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: '800' }}>QUESTION {currentQuestion + 1}/{testQuestions[targetLevel].length}</span>
              <div style={{ height: '4px', width: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginLeft: '12px', flex: 1 }}>
                <div style={{ height: '100%', width: `${((currentQuestion + 1) / testQuestions[targetLevel].length) * 100}%`, background: '#FF6B35', borderRadius: '2px', transition: 'width 0.3s' }} />
              </div>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '40px', lineHeight: '1.4' }}>{testQuestions[targetLevel][currentQuestion].q}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {testQuestions[targetLevel][currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(opt)}
                  style={{ 
                    padding: '18px', 
                    borderRadius: '16px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: 'white', 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >{opt}</button>
              ))}
            </div>
          </>
        )}

        {step === 'result' && (
          <>
            <div style={{ fontSize: '60px', marginBottom: '24px' }}>{score >= 2 ? '🎉' : '📚'}</div>
            <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px' }}>Assessment Result</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '30px' }}>You scored {score} out of {testQuestions[targetLevel].length}</p>
            
            <div style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '20px', padding: '24px', marginBottom: '40px', textAlign: 'left' }}>
              <h4 style={{ color: '#FF6B35', margin: '0 0 8px 0' }}>{score >= 2 ? 'Expert Status!' : 'Solid Foundation'}</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                {score >= 2 
                  ? "Based on your performance, you can skip the introductory modules and dive straight into advanced projects." 
                  : "We recommend starting from the beginning to ensure you have a strong foundation for the complex topics ahead."}
              </p>
            </div>

            <button 
              onClick={finishAssessment}
              style={{ 
                width: '100%', 
                padding: '18px', 
                borderRadius: '16px', 
                background: '#FF6B35', 
                color: 'white', 
                border: 'none', 
                fontSize: '16px', 
                fontWeight: '800', 
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(255,107,53,0.3)'
              }}
            >Start My Personalized Journey</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillAssessment;
