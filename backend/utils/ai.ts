const responses = [
  "Hello! How can I help?",
  "That's interesting!",
  "Tell me more.",
  "Why do you think that?",
  "Sounds good to me.",
];

export const getAIResponse = () => {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};
