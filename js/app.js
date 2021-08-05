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
        <div>Произошла ошибка.</div>
        `;
        return;
    }
    console.log(data);
    parentEl.innerHTML = `
    <div class = "name">${data.account.name}</div>
    <div class = "number">${data.account.number}</div>
    <div class="balance"><span class="amount">${(data.account.amount).toString().replace('.', ',')}</span> ₽</div>
    
    `;
};


const accountsEl = document.getElementById('accounts-and-cards');
showLoader(accountsEl);


fetch(`${API_URL}/hw15`)

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


