function scanURL() {
    const url = document.getElementById("urlInput").value.trim();
    const analyzed = document.getElementById("analyzed");
    const result = document.getElementById("result");

    if (url === "") {
        result.innerText = "⚠ Please enter a URL";
        result.style.color = "orange";
        analyzed.innerText = "";
        return;
    }

    analyzed.innerHTML = `<b>Analyzed URL:</b> ${url}`;

    const phishingKeywords = [
        "login", "verify", "update", "secure",
        "account", "signin", "confirm", "password"
    ];

    const fakeDomains = [
        "micosoft", "paypa1", "g00gle",
        "faceb00k", "amaz0n", "micr0soft"
    ];

    let score = 0;

    // Rule 1: HTTP (not secure)
    if (url.startsWith("http://")) score++;

    // Rule 2: Phishing keywords
    phishingKeywords.forEach(word => {
        if (url.toLowerCase().includes(word)) score++;
    });

    // Rule 3: Fake domains
    fakeDomains.forEach(domain => {
        if (url.toLowerCase().includes(domain)) score += 2;
    });

    // Rule 4: Very long URL
    if (url.length > 75) score++;

    // Rule 5: Too many dots (subdomain abuse)
    const dotCount = (url.match(/\./g) || []).length;
    if (dotCount > 4) score++;

    // Final decision
    if (score >= 4) {
        result.innerText = "Verdict: Phishing 🔴";
        result.style.color = "red";
    } else if (score >= 2) {
        result.innerText = "Verdict: Suspicious 🟡";
        result.style.color = "gold";
    } else {
        result.innerText = "Verdict: Safe 🟢";
        result.style.color = "green";
    }
}