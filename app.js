let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB"; // Correct locale for Indian Hindi
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    } else {
        speak("How can I help you?");
    }
}

window.addEventListener("load", () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = 'En-IN'; // Correct for Hindi if desired

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    if (event.results && event.results[currentIndex] && event.results[currentIndex][0]) {
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    }
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("What can I help you with");
    } 
    else if (message.includes("who are you")) {
        speak("I am your virtual assistant");
    } 
    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com");
        
    } 
    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://google.com");
        
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://facebook.com");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter");
        window.open("https://x.com/?lang=en");
    } else if (message.includes("open chatgpt")) {
        speak("Opening ChatGPT");
        window.open("https://www.chatgpt.com");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://www.whatsapp.com");
    } else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com", "_blank");
    } else {
        speak(`${message}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
