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
  },
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100;
    
    return value;
  },
  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  }
}

const Form = {
  description : document.querySelector('input#description'),
  amount : document.querySelector('input#amount'),
  date : document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value, 
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    // trim: removes the blank spaces
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault(); 

    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction);

      Form.clearFields();
      modal.close();

    } catch (error) {
      alert(error.message);
    }
    
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

// 2h12min