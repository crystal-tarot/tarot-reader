document.getElementById("tarotForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = document.getElementById("userQuestion").value.trim();
  const resultEl = document.getElementById("result");

  if (!question) {
    resultEl.textContent = "Please enter a question.";
    return;
  }

  resultEl.textContent = "Shuffling the cards... 🔮";

  try {
    const response = await fetch("https://twilight-cloud-e10e.0023mansi.workers.dev/", {
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
      resultEl.textContent = data.reading;
    } else {
      resultEl.textContent = "No reading returned. Please try again.";
    }

  } catch (err) {
    console.error("Fetch error:", err);
    resultEl.textContent = "Sorry, something went wrong. Try again later.";
  }
});
