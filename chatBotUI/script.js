//algorithm

//access the label in js(basic)
//the label should work on entering(DOM Manipulation)
//the prompt entered to be conveyes to python(flask)(Json method)
//pythons output to be displayed in js UI(flask + js)
//when a prompt is given and entered chatbot should give the corresponding response
//the chatBot should remember the previous prompts

const chatBox = document.getElementById("chatBox");
const chatContainer = document.getElementById("chatContainer");

// Add message to chat UI
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight; // auto-scroll
}

// Handle Enter key
chatBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && chatBox.value.trim() !== "") {
        let userMsg = chatBox.value;
        addMessage(userMsg, "user"); 
        chatBox.value = "";

        // Send message to Flask API
        fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMsg })
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.reply, "bot");
            
        })
        .catch(error => {
            addMessage("⚠️ Error connecting to server.", "bot");
            console.error("Error:", error);
        });
    }
});
