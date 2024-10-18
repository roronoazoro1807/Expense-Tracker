document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpensesTolocal();
      renderExpenses();
      updateTotal();

      // Clear input fields
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.classList.add(
        "bg-gray-700", 
        "p-4",
        "flex", 
        "justify-between",
        "items-center", 
        "rounded-lg", 
        "hover:bg-gray-600",
        "transition-colors" 
      );

      li.innerHTML = `
        <span>${expense.name} - $${expense.amount.toFixed(2)}</span>
        <button data-id="${expense.id}" class="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-500 transition-colors">Delete</button>
      `;
      expenseList.appendChild(li);
    });
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function saveExpensesTolocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);

      saveExpensesTolocal();
      renderExpenses();
      updateTotal();
    }
  });
});
