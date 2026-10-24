import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  UserRound, Plus, Stethoscope, Activity, LayoutDashboard,
  ClipboardList, ScanLine, MessageCircle, Menu, HeartPulse,
  ChevronRight, CheckCircle2
} from 'lucide-react';

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <div className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 100 100" role="img">
          <path d="M48 17 C35 20 24 35 20 52 C17 66 22 78 33 77 C42 76 45 64 46 51 C47 39 46 27 48 17Z" />
          <path d="M52 17 C65 20 76 35 80 52 C83 66 78 78 67 77 C58 76 55 64 54 51 C53 39 54 27 52 17Z" />
          <path d="M50 12 L50 81 M31 34 L45 43 M69 34 L55 43 M27 56 L43 57 M73 56 L57 57 M38 74 L47 68 M62 74 L53 68" />
          <path d="M50 82 C46 90 39 90 34 86 M50 82 C54 90 61 90 66 86" />
          <circle cx="31" cy="63" r="2.2" /><circle cx="68" cy="63" r="2.2" />
        </svg>
      </div>
      <span>RespiraAI</span>
    </div>
  );
}

function Welcome() {
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  const continueToApp = () => {
    navigate('/clinical-assessment', { state: { role } });
  };

  return (
    <main className="welcome-page">
      <header className="welcome-heading">
        <h1>Welcome to RespiraAI</h1>
        <p>Select your account type to continue</p>
      </header>

      <section className="role-list" aria-label="Choose account type">
        <button
          type="button"
          className={`role-card patient-card ${role === 'patient' ? 'selected' : ''}`}
          onClick={() => setRole('patient')}
          aria-pressed={role === 'patient'}
        >
          <span className="role-icon patient-icon"><UserRound size={66} strokeWidth={1.35} /></span>
          <span className="role-copy">
            <strong>Patient / General User</strong>
            <span>Check symptoms, upload X-rays<br className="desktop-break" /> and connect with doctors.</span>
          </span>
          <span className="role-check"><CheckCircle2 size={22} /></span>
        </button>

        <button
          type="button"
          className={`role-card doctor-card ${role === 'doctor' ? 'selected' : ''}`}
          onClick={() => setRole('doctor')}
          aria-pressed={role === 'doctor'}
        >
          <span className="role-icon doctor-icon"><Plus size={66} strokeWidth={1.4} /><span className="doctor-smile" /></span>
          <span className="role-copy">
            <strong>Healthcare Doctor</strong>
            <span>Manage patient reports,<br className="desktop-break" /> review AI predictions &amp; slots.</span>
          </span>
          <span className="role-check"><CheckCircle2 size={22} /></span>
        </button>
      </section>

      <div className="welcome-action">
        <button className="continue-button" onClick={continueToApp}>
          Continue <ChevronRight size={21} />
        </button>
      </div>
      <div className="welcome-footer"><span>RespiraAI</span><span>Respiratory care, made clearer.</span></div>
    </main>
  );
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assessment', label: 'Clinical Assessment', icon: ClipboardList },
    { id: 'xray', label: 'X-Ray Scan Upload', icon: ScanLine },
    { id: 'chatbot', label: 'AI Medical Chatbot', icon: MessageCircle },
  ];
  return (
    <>
      {mobileOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand"><Brand compact /></div>
        <nav className="side-nav" aria-label="Main navigation">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={`nav-item ${active === id ? 'active' : ''}`}
              onClick={() => { setActive(id); setMobileOpen(false); }}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-help-icon"><HeartPulse size={20} /></div>
          <p><strong>Your health matters</strong><span>Screening support, whenever you need it.</span></p>
        </div>
      </aside>
    </>
  );
}

function Field({ label, placeholder, type = 'text', value, onChange, options, required = false }) {
  return (
    <label className="form-field">
      <span className="field-label">{label}{required && <i> *</i>}</span>
      {options ? (
        <select value={value} onChange={onChange} required={required}>
          <option value="">{placeholder}</option>
          {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} />
      )}
    </label>
  );
}

function ClinicalAssessment() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'patient';
  const [active, setActive] = useState('assessment');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({
    age: '', gender: '', symptoms: '', spo2: '', smoking: '', risks: '', history: ''
  });
  const [saved, setSaved] = useState(false);

  const update = (key) => (event) => {
    setForm(current => ({ ...current, [key]: event.target.value }));
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // UI-only handoff: store the assessment locally for the next page/team integration.
    sessionStorage.setItem('respiraai-assessment', JSON.stringify(form));
    setSaved(true);
  };

  const pageTitles = {
    dashboard: 'Dashboard',
    assessment: 'Patient Clinical Assessment',
    xray: 'X-Ray Scan Upload',
    chatbot: 'AI Medical Chatbot'
  };

  return (
    <div className="dashboard-layout">
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="dashboard-main">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={23} /></button>
          <h1>{pageTitles[active]}</h1>
          <button className="profile-pill" type="button" onClick={() => navigate('/')}>
            <span className="profile-avatar"><UserRound size={18} /></span>
            <span>{role === 'doctor' ? 'Doctor' : 'Patient'}</span>
          </button>
        </header>

        <main className="assessment-content">
          {active === 'assessment' ? (
            <>
              <div className="content-heading">
                <div>
                  <span className="eyebrow"><Activity size={15} /> RESPIRATORY HEALTH</span>
                  <h2>Enter Your Medical &amp; Symptoms Information</h2>
                  <p>Please fill out your vital signs and symptoms to generate an initial health evaluation.</p>
                </div>
              </div>
              <form className="assessment-card" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <Field label="AGE" placeholder="e.g., 35" type="number" value={form.age} onChange={update('age')} required />
                  <Field label="GENDER" placeholder="Select gender" value={form.gender} onChange={update('gender')} options={['Male', 'Female', 'Prefer not to say']} required />
                  <Field label="PRIMARY SYMPTOMS" placeholder="e.g., Cough, Shortness of breath, Fever" value={form.symptoms} onChange={update('symptoms')} required />
                  <Field label="VITAL SIGNS / O₂ SATURATION" placeholder="e.g., SpO₂: 95%" value={form.spo2} onChange={update('spo2')} />
                  <Field label="SMOKING HISTORY" placeholder="Select smoking history" value={form.smoking} onChange={update('smoking')} options={['Non-smoker', 'Smoker', 'Ex-smoker']} />
                  <Field label="RISK FACTORS & CHRONIC CONDITIONS" placeholder="Asthma, Diabetes, etc." value={form.risks} onChange={update('risks')} />
                </div>
                <label className="form-field history-field">
                  <span className="field-label">DETAILED MEDICAL HISTORY</span>
                  <textarea rows="4" placeholder="Enter previous treatments, chronic conditions, or related notes..." value={form.history} onChange={update('history')} />
                </label>
                <div className="form-footer">
                  <p className="privacy-note"><span className="privacy-dot" /> Enter accurate information for a more useful preliminary screening.</p>
                  <button className="save-button" type="submit">
                    {saved ? <><CheckCircle2 size={18} /> Data Saved</> : <>Save Data &amp; Proceed to X-Ray Scan <ChevronRight size={18} /></>}
                  </button>
                </div>
                {saved && <div className="success-message" role="status">Your information has been saved in this browser session. You can now continue with the X-ray upload when that feature is connected.</div>}
                <p className="medical-disclaimer">RespiraAI provides preliminary screening support only and does not replace professional medical advice or diagnosis.</p>
              </form>
            </>
          ) : (
            <section className="placeholder-card">
              <div className="placeholder-icon">{active === 'xray' ? <ScanLine size={30} /> : active === 'chatbot' ? <MessageCircle size={30} /> : <LayoutDashboard size={30} />}</div>
              <h2>{pageTitles[active]}</h2>
              <p>This section will be connected by the project team. Your two assigned screens are ready to integrate.</p>
              <button className="back-to-assessment" onClick={() => setActive('assessment')}>Back to Clinical Assessment</button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/clinical-assessment" element={<ClinicalAssessment />} />
      <Route path="*" element={<Welcome />} />
    </Routes>
  );
}