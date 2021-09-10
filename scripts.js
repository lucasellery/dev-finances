// 1ª formar de abrir e fechar modal
const modal = {
  open() {
    document
      .querySelector(".modal-overlay") // documento, pesquisa pelo seletor que quero colocar
      .classList // prop que tem todas as classes
      .add("active"); // adiciona à lista de classes ao modal-overlay
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

// 2ª formar de abrir e fechar modal
function toggleModal() {
  let hasModal = document.querySelector(".modal-overlay");
  if (hasModal) {
    hasModal.classList.toggle("active");
  }
}

// Incomes and expenses

const transactions = [
  {
    description: "Luz",
    amount: -500,
    date: "23/01/2021",
  },
  {
    description: "Criação de website",
    amount: 5000,
    date: "23/01/2021",
  },
  {
    description: "Internet",
    amount: -8000.0,
    date: "23/01/2021",
  },
  {
    description: "App",
    amount: 20000,
    date: "23/01/2021",
  },
];

const Transaction = {
  all : transactions,

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },
  
  incomes() {
    let income = 0;
    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    })

    return income;
  },

  expenses() {
    let expenses = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0) {
        expenses += transaction.amount;
      }
    })

    return expenses;
  },
  total() {
    return Transaction.incomes() + Transaction  .expenses();
  },
};

// Switch HTMl data to JS data

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction) {
    const CSSClasses = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSClasses}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação" />
      </td>
    `;

    return html;
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes());
    
      document
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses());
      
      document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total());
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  }
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    
    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = value?.toLocaleString("pt-BR", {
      style: "currency",
      currency: 'BRL'
    })
    
    return signal + value
  }
}

const App = {
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction);
    })

    DOM.updateBalance()
  },
  reload(){
    DOM.clearTransactions();
    App.init();
  },
}


App.init()
