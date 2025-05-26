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
        .replace(/Card (\d+):/g, '<strong>Card $1:</strong>')
        .replace(/\n/g, '<br><br>');

      resultEl.innerHTML = formatted;
    } else {
      resultEl.innerHTML = "<em>No reading returned. Please try again.</em>";
    }

  } catch (err) {
    console.error("Fetch error:", err);
    resultEl.innerHTML = "<em>Sorry, something went wrong. Try again later.</em>";
  }
});
