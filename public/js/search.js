const searchInput = document.querySelector('#search-input');
const teamsFormContainer = document.querySelector('#teams-form-container');
const searchButton = document.querySelector('#search-button');

searchButton.style.display = 'none';

const inputEventHandler = async function (e) {
    const res = await fetch('/search', {
        method: 'POST',
        body: JSON.stringify({
            search: e.target.value
        })
    });

    const html = await res.text();
    removeChildren(teamsFormContainer);
    teamsFormContainer.insertAdjacentHTML('afterbegin', html)
};

const debounce = (fn, wait) => {
    let timeout;
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