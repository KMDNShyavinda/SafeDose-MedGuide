const drugs = [
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

const drugSearch = document.getElementById("drug-search");
const searchButton = document.getElementById("search-button");
const drugList = document.getElementById("drug-list");
const drugDetails = document.getElementById("drug-details");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function renderDrugList(items) {
  drugList.innerHTML = items.length
    ? items.map((drug, index) => `<div class="drug-card" data-index="${index}"><h3>${drug.name}</h3><p>${drug.description}</p></div>`).join("")
    : "<p>No medicines found. Try another search term.</p>";
}

function renderDrugDetails(drug) {
  if (!drug) {
    drugDetails.innerHTML = `<h2>Medicine details</h2><p>Select a drug from the list or search to view dosage, side effects, and safety guidelines.</p>`;
    return;
  }

  drugDetails.innerHTML = `
    <h2>${drug.name}</h2>
    <section>
      <h3>Description</h3>
      <p>${drug.description}</p>
    </section>
    <section>
      <h3>Dosage</h3>
      <p>${drug.dosage}</p>
    </section>
    <section>
      <h3>Side Effects</h3>
      <ul>${drug.sideEffects.map(effect => `<li>${effect}</li>`).join("")}</ul>
    </section>
    <section>
      <h3>Safety Guidelines</h3>
      <ul>${drug.safetyGuidelines.map(item => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;
}

function filterDrugs(query) {
  return drugs.filter(drug => drug.name.toLowerCase().includes(query.toLowerCase()));
}

function showBotMessage(message) {
  const bubble = document.createElement("div");
  bubble.className = "chat-message bot";
  bubble.textContent = message;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showUserMessage(message) {
  const bubble = document.createElement("div");
  bubble.className = "chat-message user";
  bubble.textContent = message;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIReply(message) {
  const normalized = message.trim().toLowerCase();

  if (!normalized) {
    return "Please type your question so I can help with drug dosage, side effects, or safety guidance.";
  }

  const drug = drugs.find(drugItem => normalized.includes(drugItem.name.toLowerCase()));
  if (drug) {
    return `Here is a quick overview for ${drug.name}: Dosage: ${drug.dosage} Side effects: ${drug.sideEffects.join(", ")} Safety guidelines: ${drug.safetyGuidelines.join(" ")}`;
  }

  if (normalized.includes("dose") || normalized.includes("dosage")) {
    return "To find dosage information, search for a specific drug name and then view its details. If you need help with a medicine, type its name.";
  }

  if (normalized.includes("side effect") || normalized.includes("side-effect")) {
    return "I can provide common side effects for many medicines. Search by drug name and ask about side effects for that drug.";
  }

  if (normalized.includes("safety") || normalized.includes("safe") || normalized.includes("guideline")) {
    return "Safety guidelines are available for each medicine. Search a drug name to review precautions, interactions, and usage tips.";
  }

  return "I'm here to help with medicine information. Try asking about Paracetamol, Ibuprofen, or Amoxicillin, or enter a drug name in the search box.";
}

function handleDrugCardClick(event) {
  const card = event.target.closest(".drug-card");
  if (!card) return;
  const index = Number(card.dataset.index);
  const selectedDrug = filteredDrugs[index];
  document.querySelectorAll(".drug-card").forEach(el => el.classList.remove("active"));
  card.classList.add("active");
  renderDrugDetails(selectedDrug);
}

let filteredDrugs = [...drugs];

searchButton.addEventListener("click", () => {
  filteredDrugs = filterDrugs(drugSearch.value);
  renderDrugList(filteredDrugs);
  renderDrugDetails(filteredDrugs[0]);
});

drugSearch.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

drugList.addEventListener("click", handleDrugCardClick);

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  showUserMessage(message);
  chatInput.value = "";

  const reply = getAIReply(message);
  setTimeout(() => showBotMessage(reply), 250);
});

renderDrugList(filteredDrugs);
renderDrugDetails(filteredDrugs[0]);
showBotMessage("Hello! I'm your AI support assistant. Ask me about medicine dosage, side effects, or safety guidance.");
