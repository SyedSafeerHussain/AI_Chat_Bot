document.getElementById("send-btn").addEventListener("click", sendMessage);

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    appendMessage("You: " + userInput, "user");
    document.getElementById("user-input").value = "";

    try {
        let response = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userInput })
        });

        let data = await response.json();
        appendMessage("Bot: " + data.response, "bot");
    } catch (error) {
        appendMessage("Bot: Error connecting to server", "bot");
    }
}

function appendMessage(message, sender) {
    let chatBox = document.getElementById("chat-box");
    let msgElement = document.createElement("div");
    msgElement.className = "message " + sender;
    msgElement.textContent = message;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
