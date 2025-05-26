document.getElementById("tarotForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const question = document.getElementById("userQuestion").value;
    const resultEl = document.getElementById("result");
  
    resultEl.textContent = "Shuffling the cards... 🔄";
  
    try {
      const response = await fetch("https://your-backend-url.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question })
      });
  
      const data = await response.json();
      resultEl.textContent = data.reading;
    } catch (err) {
      resultEl.textContent = "Sorry, something went wrong. Try again later.";
      console.error(err);
    }
  });  