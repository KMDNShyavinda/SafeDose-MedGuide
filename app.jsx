const { useState, useEffect } = React;

const DRUGS = [
  {
    name: "Paracetamol",
    dosage: "500 mg every 4-6 hours as needed, do not exceed 4,000 mg in 24 hours.",
    sideEffects: ["Nausea", "Headache", "Allergic rash", "Liver damage at high doses"],
    safetyGuidelines: [
      "Do not exceed recommended daily dose.",
      "Avoid alcohol while taking this medicine.",
      "Consult a doctor if you have liver disease."
    ],
    description: "A common analgesic and fever reducer used for mild to moderate pain management."
  },
  {
    name: "Ibuprofen",
    dosage: "200-400 mg every 6-8 hours with food; maximum 1,200 mg per day without medical supervision.",
    sideEffects: ["Stomach pain", "Heartburn", "Dizziness", "Increased blood pressure"],
    safetyGuidelines: [
      "Take with food or milk to protect your stomach.",
      "Avoid if you have a history of ulcers or gastrointestinal bleeding.",
      "Talk to your doctor if you are pregnant or nursing."
    ],
    description: "A nonsteroidal anti-inflammatory drug (NSAID) used for pain, inflammation, and fever."
  },
  {
    name: "Amoxicillin",
    dosage: "500 mg every 8 hours or 875 mg every 12 hours for most adult infections.",
    sideEffects: ["Diarrhea", "Nausea", "Skin rash", "Yeast infections"],
    safetyGuidelines: [
      "Finish the full course even if you feel better.",
      "Report severe diarrhea or allergic reactions immediately.",
      "Do not share antibiotics with others."
    ],
    description: "A broad-spectrum antibiotic used to treat bacterial infections."
  }
];

function Header() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <a className="brand" href="#">SafeDose</a>
        <ul className="nav-links">
          <li><a href="#drug-search">Search</a></li>
          <li><a href="#drug-details">Details</a></li>
          <li><a href="#chat-form">Chat</a></li>
          <li><a href="#features">About</a></li>
        </ul>
      </nav>
      <div className="header-inner">
        <div className="header-copy">
          <span className="badge">Medicines made simple</span>
          <h1>SafeDose MedGuide</h1>
          <p>Your JavaScript-powered medicine reference with an AI support chatbot.</p>
          <div className="header-notes">
            <div className="note-pill"><span>Trusted dosage</span></div>
            <div className="note-pill note-pill-accent"><span>Clear safety guidance</span></div>
          </div>
        </div>
        <div className="header-visual" aria-hidden="true">
          <div className="visual-card">
            <div className="visual-icon">💊</div>
            <strong>Fast drug lookup</strong>
            <p>Find common medicines instantly with one search.</p>
          </div>
          <div className="visual-card visual-card-soft">
            <div className="visual-icon">🩺</div>
            <strong>AI support chat</strong>
            <p>Ask questions about dosage, side effects, or safety.</p>
          </div>
        </div>
      </div>
      {/* animated decorative pills */}
      <AnimatedPills />
    </header>
  );
}

function AnimatedPills() {
  // decorative floating pills — purely visual
  const pills = [
    { id: 1, cls: 'pill pill--blue', style: { left: '8%', top: '20%', animationDelay: '0s' } },
    { id: 2, cls: 'pill pill--white', style: { left: '22%', top: '10%', animationDelay: '1s' } },
    { id: 3, cls: 'pill pill--capsule', style: { left: '40%', top: '18%', animationDelay: '0.6s' } },
    { id: 4, cls: 'pill pill--blue', style: { left: '62%', top: '8%', animationDelay: '0.2s' } },
    { id: 5, cls: 'pill pill--capsule', style: { left: '78%', top: '22%', animationDelay: '1.2s' } },
  ];

  return (
    <div className="animated-pills" aria-hidden="true">
      {pills.map(p => (
        <div key={p.id} className={p.cls} style={p.style}></div>
      ))}
    </div>
  );
}

function FeatureStrip() {
  return (
    <section id="features" className="feature-strip">
      <article className="feature-card">
        <h3>Medicine details</h3>
        <p>Browse dosage, side effects, and safety recommendations clearly.</p>
      </article>
      <article className="feature-card">
        <h3>Pro-level clarity</h3>
        <p>Professional interface with clean, readable drug information.</p>
      </article>
      <article className="feature-card">
        <h3>Quick support</h3>
        <p>Instant chatbot guidance for common medication questions.</p>
      </article>
    </section>
  );
}

function PhotoGallery() {
  // looks for images in assets/photos/photo1.jpg ... photo4.jpg
  const photos = [1,2,3,4].map(i => `assets/photos/photo${i}.jpg`);
  return (
    <section className="photo-gallery">
      {photos.map((src, i) => (
        <div className="photo-item" key={i}>
          <img src={src} alt={`Gallery ${i+1}`} onError={(e)=>{e.target.style.opacity=0.16}} />
        </div>
      ))}
    </section>
  );
}

function DrugCard({ drug, onSelect, active }) {
  return (
    <div className={`drug-card ${active ? 'active' : ''}`} onClick={() => onSelect(drug)}>
      <h3>{drug.name}</h3>
      <p>{drug.description}</p>
    </div>
  );
}

function DrugDetails({ drug }) {
  if (!drug) return (
    <article className="drug-details">
      <h2>Medicine details</h2>
      <p>Select a drug from the list or search to view dosage, side effects, and safety guidelines.</p>
    </article>
  );

  return (
    <article className="drug-details">
      <h2>{drug.name}</h2>
      <section>
        <h3>Description</h3>
        <p>{drug.description}</p>
      </section>
      <section>
        <h3>Dosage</h3>
        <p>{drug.dosage}</p>
      </section>
      <section>
        <h3>Side Effects</h3>
        <ul>{drug.sideEffects.map((s,i) => <li key={i}>{s}</li>)}</ul>
      </section>
      <section>
        <h3>Safety Guidelines</h3>
        <ul>{drug.safetyGuidelines.map((g,i) => <li key={i}>{g}</li>)}</ul>
      </section>
    </article>
  );
}

function Chat({ onAsk }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{role:'bot', text:"Hello! I'm your AI support assistant. Ask me about medicine dosage, side effects, or safety guidance."}]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, {role:'user', text}]);
    setInput('');
    const reply = getAIReply(text);
    setTimeout(() => setMessages(m => [...m, {role:'bot', text: reply}]), 250);
    if (onAsk) onAsk(text);
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      send();
    }
  }

  function getAIReply(message) {
    const normalized = message.trim().toLowerCase();
    if (!normalized) return "Please type your question so I can help.";
    const drug = DRUGS.find(d => normalized.includes(d.name.toLowerCase()));
    if (drug) return `Here is a quick overview for ${drug.name}: Dosage: ${drug.dosage} Side effects: ${drug.sideEffects.join(', ')} Safety guidelines: ${drug.safetyGuidelines.join(' ')}`;
    if (normalized.includes('dose') || normalized.includes('dosage')) return "To find dosage information, search for a specific drug name and then view its details.";
    if (normalized.includes('side effect')) return "I can provide common side effects for many medicines. Search by drug name and ask about side effects for that drug.";
    if (normalized.includes('safety') || normalized.includes('safe')) return "Safety guidelines are available for each medicine. Search a drug name to review precautions, interactions, and usage tips.";
    return "I'm here to help with medicine information. Try asking about Paracetamol, Ibuprofen, or Amoxicillin, or enter a drug name in the search box.";
  }

  return (
    <aside className="panel chat-panel">
      <h2>AI Support Chatbot</h2>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.role==='user' ? 'user' : 'bot'}`}>{m.text}</div>
        ))}
      </div>
      <div className="chat-form">
        <input id="chat-input" value={input} onKeyDown={onKey} onChange={e=>setInput(e.target.value)} placeholder="Ask about dosage, side effects, or safety" />
        <button onClick={send}>Send</button>
      </div>
    </aside>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(DRUGS);
  const [selected, setSelected] = useState(DRUGS[0]);

  useEffect(() => {
    setFiltered(DRUGS);
    setSelected(DRUGS[0]);
  }, []);

  function search(q) {
    const result = DRUGS.filter(d => d.name.toLowerCase().includes(q.toLowerCase()));
    setFiltered(result);
    setSelected(result[0] || null);
  }

  return (
    <div>
      <Header />
      <FeatureStrip />
      <PhotoGallery />

      <main className="app-grid">
        <section className="panel info-panel">
          <div className="search-box">
            <label htmlFor="drug-search">Search medicine</label>
            <input id="drug-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){search(query);}}} placeholder="Enter drug name" />
            <button id="search-button" onClick={()=>search(query)}>Search</button>
          </div>

          <div id="drug-list" className="drug-list">
            {filtered.length ? filtered.map(d => (
              <DrugCard key={d.name} drug={d} onSelect={setSelected} active={selected && selected.name===d.name} />
            )) : <p>No medicines found. Try another search term.</p>}
          </div>

          <DrugDetails drug={selected} />
        </section>

        <Chat onAsk={(q)=>{ /* placeholder for future integration */ }} />
      </main>

      <section className="task-bar">
        <div className="task-item">
          <h4>Quick search</h4>
          <p>Find medicine details with one click.</p>
          <a href="#drug-search" className="task-button">Search now</a>
        </div>
        <div className="task-item">
          <h4>AI assistance</h4>
          <p>Ask the chatbot for dosage and safety guidance.</p>
          <a href="#chat-input" className="task-button task-button-accent">Ask now</a>
        </div>
        <div className="task-item">
          <h4>View details</h4>
          <p>See recommended dosage, side effects, and precautions.</p>
          <a href="#drug-details" className="task-button">View details</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <div>
            <p className="footer-brand">SafeDose MedGuide</p>
            <p>Reliable medicine insights designed for clinicians, pharmacists, and caregivers.</p>
          </div>
          <div className="footer-links">
            <a href="#drug-search">Search</a>
            <a href="#chat-input">AI Chat</a>
            <a href="#drug-details">Drug details</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
