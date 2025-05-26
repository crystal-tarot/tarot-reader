document.getElementById("tarotForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = document.getElementById("userQuestion").value.trim();
  const resultEl = document.getElementById("result");

  if (!question) {
    resultEl.innerHTML = "<em>Please enter a question.</em>";
    return;
  }

  resultEl.innerHTML = "Shuffling the cards... 🔮";

  try {
    const response = await fetch("https://twilight-cloud-e10e.0023mansi.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: question })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    const tarotImages = {
      "The Fool": "https://upload.wikimedia.org/wikipedia/en/9/90/RWS_Tarot_00_Fool.jpg",
      "The Magician": "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg",
      "The High Priestess": "https://upload.wikimedia.org/wikipedia/en/8/88/RWS_Tarot_02_High_Priestess.jpg",
      "The Empress": "https://upload.wikimedia.org/wikipedia/en/d/d2/RWS_Tarot_03_Empress.jpg",
      "The Emperor": "https://upload.wikimedia.org/wikipedia/en/c/c3/RWS_Tarot_04_Emperor.jpg",
      "The Hierophant": "https://upload.wikimedia.org/wikipedia/en/8/8d/RWS_Tarot_05_Hierophant.jpg",
      "The Lovers": "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
      "The Chariot": "https://upload.wikimedia.org/wikipedia/en/3/3a/The_Chariot.jpg",
      "Strength": "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
      "The Hermit": "https://upload.wikimedia.org/wikipedia/en/4/4d/RWS_Tarot_09_Hermit.jpg",
      "The Wheel of Fortune": "https://upload.wikimedia.org/wikipedia/en/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
      "Justice": "https://upload.wikimedia.org/wikipedia/en/e/e0/RWS_Tarot_11_Justice.jpg",
      "The Hanged Man": "https://upload.wikimedia.org/wikipedia/en/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
      "Death": "https://upload.wikimedia.org/wikipedia/en/d/d7/RWS_Tarot_13_Death.jpg",
      "Temperance": "https://upload.wikimedia.org/wikipedia/en/f/f8/RWS_Tarot_14_Temperance.jpg",
      "The Devil": "https://upload.wikimedia.org/wikipedia/en/5/55/RWS_Tarot_15_Devil.jpg",
      "The Tower": "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg",
      "The Star": "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_17_Star.jpg",
      "The Moon": "https://upload.wikimedia.org/wikipedia/en/7/7f/RWS_Tarot_18_Moon.jpg",
      "The Sun": "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg",
      "Judgement": "https://upload.wikimedia.org/wikipedia/en/d/dd/RWS_Tarot_20_Judgement.jpg",
      "The World": "https://upload.wikimedia.org/wikipedia/en/f/ff/RWS_Tarot_21_World.jpg"
    };

    if (data.reading) {
      const formatted = data.reading
        .split(/(?:The|the) (first|second|third) card drawn is/i)
        .filter(Boolean)
        .map((text, i) => {
          const label = ["Card 1", "Card 2", "Card 3"][i] || "Summary";
    
          const match = text.trim().match(/^([\w\s:,'-]+?)\.\s+(.*)/s);
    
          if (match) {
            const [_, cardName, meaning] = match;
        
            const imageUrl = tarotImages[cardName.trim()] || null;
        
            return `
              <p>
                <strong>${label}: ${cardName}</strong><br><br>
                ${imageUrl ? `<img src="${imageUrl}" alt="${cardName}" style="max-width:100%; margin: 12px 0; border-radius: 10px;">` : ""}
                ${meaning.trim()}
              </p>
            `;
          }
    
          return `<p><strong>${label}:</strong><br><br>${text.trim()}</p>`;
        })
        .join('');
    
      resultEl.innerHTML = formatted;
    }

    else {
      resultEl.innerHTML = "<em>No reading returned. Please try again.</em>";
    }

  } catch (err) {
    console.error("Fetch error:", err);
    resultEl.innerHTML = "<em>Sorry, something went wrong. Try again later.</em>";
  }
});
