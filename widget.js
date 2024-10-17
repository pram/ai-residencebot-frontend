(function() {
    // Create the style element and add CSS
    var style = document.createElement('style');
    style.innerHTML = `
    /* Import Google font - Poppins */
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }
    body {
      background: #E3F2FD;
    }
    .chatbot-toggler {
      position: fixed;
      bottom: 30px;
      right: 35px;
      outline: none;
      border: none;
      height: 50px;
      width: 50px;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #0f7500;
      transition: all 0.2s ease;
    }
    body.show-chatbot .chatbot-toggler {
      transform: rotate(90deg);
    }
    .chatbot-toggler span {
      color: #fff;
      position: absolute;
    }
    .chatbot-toggler span:last-child,
    body.show-chatbot .chatbot-toggler span:first-child  {
      opacity: 0;
    }
    body.show-chatbot .chatbot-toggler span:last-child {
      opacity: 1;
    }
    .chatbot {
      position: fixed;
      right: 35px;
      bottom: 90px;
      width: 420px;
      background: #fff;
      border-radius: 15px;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.5);
      transform-origin: bottom right;
      box-shadow: 0 0 128px 0 rgba(0,0,0,0.1),
                  0 32px 64px -48px rgba(0,0,0,0.5);
      transition: all 0.1s ease;
    }
    body.show-chatbot .chatbot {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1);
    }
    .chatbot header {
      padding: 16px;
      position: relative;
      text-align: center;
      color: #fff;
      background: #ae0303;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .chatbot header span {
      position: absolute;
      right: 15px;
      top: 50%;
      display: none;
      cursor: pointer;
      transform: translateY(-50%);
    }
    header h2 {
      font-size: 1.4rem;
    }
    .chatbot .chatbox {
      overflow-y: auto;
      height: 400px;
      padding: 20px;
      background: #f9f9f9;
    }
    .chatbox .chat {
      display: flex;
      list-style: none;
      margin-bottom: 15px;
    }
    .chatbox .incoming {
      align-items: flex-start;
    }
    .chatbox .incoming span {
      width: 40px;
      height: 40px;
      color: #fff;
      background: #ae0303;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    .chatbox .incoming p {
      background: #f2f2f2;
      color: #333;
      border-radius: 10px;
      padding: 10px 15px;
      max-width: 75%;
      word-wrap: break-word;
      font-size: 0.95rem;
      white-space: pre-wrap; /* Ensures newlines are respected */
    }
    .chatbox .outgoing {
      justify-content: flex-end;
    }
    .chatbox .outgoing p {
      background: #ae0303;
      color: #fff;
      border-radius: 10px;
      padding: 10px 15px;
      max-width: 75%;
      word-wrap: break-word;
      font-size: 0.95rem;
      white-space: pre-wrap; /* Ensures newlines are respected */
    }
    .chatbox .outgoing p.error {
      background: #f8d7da;
      color: #721c24;
    }
    /* Styling for the chat input area */
    .chatbot .chat-input {
      display: flex;
      padding: 10px;
      background: #fff;
      border-top: 1px solid #ddd;
    }
    .chat-input textarea {
      flex: 1;
      height: 40px;
      border: none;
      outline: none;
      resize: none;
      padding: 10px;
      border-radius: 20px;
      background: #fff;
      font-size: 1rem;
      overflow: hidden; /* Removes scroll arrows */
    }
    .chat-input textarea:focus {
      overflow: hidden;
    }
    .chat-input span {
      margin-left: 10px;
      align-self: center;
      color: #0f7500;
      cursor: pointer;
      font-size: 1.5rem;
    }

    @media (max-width: 490px) {
      .chatbot-toggler {
        right: 20px;
        bottom: 20px;
      }
      .chatbot {
        right: 0;
        bottom: 0;
        height: 100%;
        border-radius: 0;
        width: 100%;
      }
      .chatbot .chatbox {
        height: 90%;
        padding: 15px;
      }
    }
  `;
    document.head.appendChild(style);

    // Create the HTML for the chatbot
    var container = document.createElement('div');
    container.innerHTML = `
    <button class="chatbot-toggler">
      <span class="material-symbols-rounded">help</span>
      <span class="material-symbols-outlined">close</span>
    </button>
    <div class="chatbot">
      <header>
        <h2>ResidenceBot</h2>
        <span class="close-btn material-symbols-outlined">close</span>
      </header>
      <ul class="chatbox">
        <li class="chat incoming">
          <span class="material-symbols-outlined">smart_toy</span>
          <p>Hi there <br>How can I help you today?</p>
        </li>
      </ul>
      <div class="chat-input">
        <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
        <span id="send-btn" class="material-symbols-rounded">send</span>
      </div>
    </div>
  `;
    document.body.appendChild(container);

    // JavaScript logic (from script.js)
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage = null; // Variable to store user's message
    const inputInitHeight = chatInput.scrollHeight;

    const API_URL = "http://localhost:8080/api/chat";

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    }

    const generateResponse = async (chatElement) => {
        const messageElement = chatElement.querySelector("p");
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message);
            messageElement.textContent = data.payload;
        } catch (error) {
            messageElement.classList.add("error");
            messageElement.textContent = error.message;
        } finally {
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;

        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
})();
