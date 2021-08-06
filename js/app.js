'use strict';
const API_URL = 'http://localhost:9999/api';

const showLoader = (parentEl) => {
    parentEl.innerHTML = `
<div class="loading-indicator"></div>
`;
};

const loadAccount = (parentEl, data, err) => {
    if (err) {
        parentEl.innerHTML = `
        <div class="info">Произошла ошибка.</div>
        <button class="retry">Повторить запрос</button>
        `;
        const retryEl = parentEl.querySelector('.retry');
        retryEl.onclick = (evt) => {
            showLoader(accountsEl);
            loadAccountServer(evt);
        };

        return;
    }
    parentEl.innerHTML = `
    <div class = "name">${data.account.name}</div>
    <div class = "number">${data.account.number}</div>
    <div class="balance"><span class="amount">${(data.account.amount).toString().replace('.', ',')}</span> ₽</div>
    `;
};


const loadAccountServer = () => {

    fetch(`${API_URL}/hw16`)

        .then((response) => {
            if (!response.ok) {
                throw new Error('err.server');
            }
            return response.json();
        })
        .then((data) => {
                loadAccount(accountsEl, data);
            }
        )
        .catch((e) => {
            loadAccount(accountsEl, null, 'err.common');
        });
}

const accountsEl = document.getElementById('accounts-and-cards');
showLoader(accountsEl);
loadAccountServer();