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
    const cardBlocks = data.reading.match(/Card \d:.*?(?=(?:Card \d:|$))/gs);
  
    const formatted = cardBlocks?.map((block, i) => {
      const label = `Card ${i + 1}`;
  
      const match = block.match(/^Card \d:\s*([\w\s]+?)(?=\s|$)/);
      const cardName = match?.[1]?.trim() || label;
  
      const imageUrl = tarotImages[cardName] || "";
  
      const body = block.replace(/^Card \d:\s*[\w\s]+/, "").trim();
  
      return `
        <div class="card-block">
          <strong>${label}: ${cardName}</strong><br><br>
          ${imageUrl ? `<img src="${imageUrl}" alt="${cardName}" class="tarot-img">` : ""}
          <p>${body}</p>
        </div>
      `;
    }).join('');
  
    resultEl.innerHTML = formatted || "<em>Could not format the reading.</em>";
  }


    else {
      resultEl.innerHTML = "<em>No reading returned. Please try again.</em>";
    }

  } catch (err) {
    console.error("Fetch error:", err);
    resultEl.innerHTML = "<em>Sorry, something went wrong. Try again later.</em>";
  }
});
