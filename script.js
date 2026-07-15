/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const apiKey = OPENAI_API_KEY; // Make sure to name your secret OPENAI_API

async function getChatCompletion() {
  const endpoint = "https://api.openai.com/v1/chat/completions";
}

async function fetchOpenAIResponse(messages) {
  // Send a POST request to the OpenAI API with the messages array
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
      "Authorization": `Bearer ${apiKey}`, // Include the API key for authorization 
    },
    // Send the messages array in the request body
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Tell me a fun fact about moose' }]
    })
  });

  // Parse the response JSON and return the AI's message content
  const data = await response.json();
  return data.choices[0].message.content;
}

// Function to handle user input and get response from OpenAI API
async function handleUserInput(userMessage) {
  // Add user message to chat window
  chatWindow.innerHTML += `<div class="user-message">You: ${userMessage}</div>`;

  // Prepare messages for OpenAI API
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: userMessage },
  ];

  // Fetch response from OpenAI API
  const aiResponse = await fetchOpenAIResponse(messages);

  // Add AI response to chat window
  chatWindow.innerHTML += `<div class="ai-message">AI: ${aiResponse}</div>`;
} 

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

/* Handle form submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // When using Cloudflare, you'll need to POST a `messages` array in the body,
  // and handle the response using: data.choices[0].message.content

  // Show message
  chatWindow.innerHTML = "Connect to the OpenAI API for a response!";
});

// Call the fetch function
fetchOpenAIResponse(messages)