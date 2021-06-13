const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const NewQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const changeThemeBtn = document.getElementById("changeThemeBtn");
const body2 = document.querySelector("body");
const fullContainer = document.getElementsByClassName("second")[0];
const lang = document.querySelector("select");
const labelLang = document.querySelector("languageLabel");
const newQuoteBtn = document.querySelector("button#new-quote");


let apiQuotes = [];


//Show loading
function loading(){
    loader.hidden = false;
    fullContainer.classList.toggle("hidden");
} 

//Hide loading

function complete(){
    fullContainer.classList.remove("hidden");
    loader.hidden = true;
}

// Show new Quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //Check if author field is blank and replace it with 'Uknown'
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }
    // Set Quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}

//Change function to take russian quotes from local storage

function newQuoteRus(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random()*localQuotes.length)];
    //Check if author field is blank and replace it with 'Uknown'
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }
    // Set Quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getQuotes() {
    
    loading();
    if(lang === "En"){
        var apiUrl = "https://type.fit/api/quotes"
    } else{
        var apiUrl = "Привет"
    }
        
    var apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

//Night mode toggle

function nightMode(){

}

// Tweet quote
function tweetQuote (){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeneres
NewQuoteBtn.addEventListener('click', function(){
   
    if(lang.value === "En"){
        newQuote();
    }else if(lang.value === "Ru"){
        newQuoteRus();
    }
});
twitterBtn.addEventListener('click', tweetQuote);

changeThemeBtn.addEventListener("click", function(){
    body2.classList.toggle("bodyNight");
    quoteContainer.classList.toggle("quote-container-night");
    twitterBtn.classList.toggle("button-night");
    NewQuoteBtn.classList.toggle("button-night");
    
})
lang.addEventListener("change", function(){
    if(lang.value === "En"){
        languageLabel.textContent = "Choose you language: ";
        newQuoteBtn.textContent = "New quote";
        newQuote();
    }else if(lang.value === "Ru"){
        languageLabel.textContent = "Выбери свой язык: ";
        newQuoteBtn.textContent = "Новая цитата";
        newQuoteRus();
    }
})

// On load

getQuotes();
// loading();
// newQuoteRus();
