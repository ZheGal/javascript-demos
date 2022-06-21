const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const newQuote = () => {
    loading();
    const rand = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[rand];
    localStorage.setItem('currentQuote', JSON.stringify(quote));
    if (quote.author) {
        authorText.textContent = quote.author;
    }
    quoteText.textContent = quote.text;
    complete();
}

const updateQuotes = async () => {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
    } catch (error) {
        alert('Error fetching quotes!');
    }
}

const getQuotes = async () => {
    loading();
    try {
        await updateQuotes();
        newQuote();
    } catch (error) {
        alert('Error fetching quotes!');
    }
}

const checkSavedQuote = () => {
    loading();
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
        complete();
    } catch (err) {
        getQuotes();
    }
}

const tweetQuote = () => {
    const text = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

checkSavedQuote();