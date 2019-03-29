var searchInput = document.getElementById('#search-input');
var teamsFormContainer = document.getElementById('#teams-form-container');
var searchButton = document.getElementById('#search-button');

searchButton.style.display = 'none';

var inputEventHandler = async function (e) {
    var res = await fetch('/search', {
        method: 'POST',
        body: JSON.stringify({
            search: e.target.value
        })
    });

    var html = await res.text();
    removeChildren(teamsFormContainer);
    teamsFormContainer.insertAdjacentHTML('afterbegin', html)
};

var debounce = (fn, wait) => {
    var timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    };
};

searchInput.addEventListener("input", debounce(inputEventHandler, 300));

function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}