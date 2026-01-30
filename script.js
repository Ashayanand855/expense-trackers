document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseListUl = document.getElementById('expense-list-ul');
    const expenseData = localStorage.getItem('expenseData') || JSON.stringify([]);

    // Load expense data from local storage
    let expenses = JSON.parse(expenseData);

    // Function to add an expense
    function addExpense(expense) {
        expenses.push(expense);
        localStorage.setItem('expenseData', JSON.stringify(expenses));
        renderExpenses();
    }

    // Function to render expenses in the list
    function renderExpenses() {
        expenseListUl.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.date} - ${expense.category}: ${expense.amount} - Paid To: ${expense.paid_to} - Paid From: ${expense.paid_from}`;
            expenseListUl.appendChild(li);
        });
    }

    // Event listener for form submission
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const paidTo = document.getElementById('paid_to').value;
        const paidFrom = document.getElementById('paid_from').value;

        const newExpense = {
            date: date,
            amount: amount,
            category: category,
            description: description,
            paid_to: paidTo,
            paid_from: paidFrom,
            notes: ""
        };

        addExpense(newExpense);

        // Clear the form
        document.getElementById('expense-form').reset();
    });

    // Initial rendering of expenses
    renderExpenses();
});
