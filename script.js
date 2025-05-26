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

    if (data.reading) {
      const formatted = data.reading
        .split(/(?:The|the) (first|second|third) card drawn is/i)
        .filter(Boolean)
        .map((text, i) => {
          const label = ["Card 1", "Card 2", "Card 3"][i] || "Summary";
    
          const match = text.trim().match(/^([\w\s:,'-]+?)\.\s+(.*)/s);
    
          if (match) {
            const [_, cardName, meaning] = match;
            return `
              <p>
                <strong>${label}: ${cardName}</strong><br><br>
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
