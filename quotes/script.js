const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoader = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoader = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const newQuote = () => {
    showLoader();
    const rand = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[rand];
    localStorage.setItem('currentQuote', JSON.stringify(quote));
    if (quote.author) {
        authorText.textContent = quote.author;
    }
    quoteText.textContent = quote.text;
    hideLoader();
}

const updateQuotes = async () => {
    showLoader();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
    } catch (error) {
        alert('Error fetching quotes!');
    }
}

const getQuotes = async () => {
    showLoader();
    await updateQuotes();
    newQuote();
}

const checkSavedQuote = () => {
    showLoader();
    if (!localStorage.getItem('currentQuote')) {
        return getQuotes();
    }
    try {
        updateQuotes();
        const currentQuote = JSON.parse(localStorage.getItem('currentQuote'));
        if (currentQuote.author) {
            authorText.textContent = currentQuote.author;
        }
        quoteText.textContent = currentQuote.text;
        hideLoader();
    } catch (err) {
        getQuotes();
    }
}

const tweetQuote = () => {
    const text = quoteText.textContent;
    const author = authorText.textContent;
    const tweet = (!author) ? text : `${text} - ${author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweet}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

checkSavedQuote();