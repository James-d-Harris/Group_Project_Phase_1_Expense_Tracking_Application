const fullDate = new Date();
const today = new Date(Date.UTC(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate()));
const oneMonthAgo = new Date(today);
oneMonthAgo.setUTCMonth(today.getUTCMonth() - 1);

let categoryColors = {
    "Rent": "#FF0000",
    "Food": "#FF5733",
    "Maintenance": "#0000FF",
    "Fun": "#FF00FF",
    "Misc": "#FFFF00",
    "Deposit": "#00FF00"
};

let expenses = [
    { category: "Fun", location: "Netflix", description: "Subscription", amount: -15.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2) },
    { category: "Food", location: "Walmart", description: "Groceries", amount: -97.35, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2) },
    { category: "Maintenance", location: "Jiffy Lube", description: "Oil Change", amount: -25.19, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10) },
    { category: "Maintenance", location: "Circle K", description: "Gas", amount: -43.82, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 12) },
    { category: "Rent", location: "Apartment", description: "Monthly Rent", amount: -1200.00, date: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() - 5) },
    { category: "Food", location: "Trader Joe's", description: "Groceries", amount: -45.60, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8) },
    { category: "Fun", location: "Movie Theater", description: "Movie Tickets", amount: -25.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15) },
    { category: "Misc", location: "Amazon", description: "Online Shopping", amount: -50.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 20) },
    { category: "Food", location: "Whole Foods", description: "Groceries", amount: -89.75, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 25) },
    { category: "Maintenance", location: "Car Wash", description: "Car Wash", amount: -12.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 28) },
    { category: "Fun", location: "Hulu", description: "Subscription", amount: -12.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3) },
    { category: "Food", location: "Costco", description: "Groceries", amount: -150.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7) },
    { category: "Fun", location: "Bowling Alley", description: "Bowling Night", amount: -30.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14) },
    { category: "Misc", location: "Best Buy", description: "Electronics", amount: -100.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 18) },
    { category: "Food", location: "Safeway", description: "Groceries", amount: -65.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 22) },
    { category: "Maintenance", location: "Mechanic", description: "Car Repair", amount: -250.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 27) },
    { category: "Fun", location: "Spotify", description: "Subscription", amount: -10.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1) },
    { category: "Food", location: "Trader Joe's", description: "Groceries", amount: -45.60, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9) },
    { category: "Fun", location: "Concert", description: "Concert Tickets", amount: -75.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13) },
    { category: "Misc", location: "Home Depot", description: "Home Improvement", amount: -80.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 16) },
    { category: "Food", location: "Trader Joe's", description: "Groceries", amount: -45.60, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 21) },
    { category: "Fun", location: "Gym", description: "Monthly Membership", amount: -50.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 26) },
    { category: "Maintenance", location: "Mechanic", description: "Tire Change", amount: -80.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30) },
    { category: "Rent", location: "Apartment", description: "Monthly Rent", amount: -1200.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate()) },
    { category: "Fun", location: "Disney+", description: "Subscription", amount: -7.99, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2) },
    { category: "Food", location: "Trader Joe's", description: "Groceries", amount: -45.60, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4) },
    { category: "Fun", location: "Amusement Park", description: "Entry Tickets", amount: -100.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8) },
    { category: "Misc", location: "Walmart", description: "Household Items", amount: -20.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6) },
    { category: "Deposit", location: "Bank", description: "Salary", amount: 2000.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1) },
    { category: "Deposit", location: "Bank", description: "Freelance Work", amount: 500.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10) },
];

let currentEditIndex = null;

function getFilteredExpenses() {
    return expenses.filter(expense => expense.date >= oneMonthAgo).sort((a, b) => b.date - a.date);
}

function getAllExpenses() {
    return expenses.sort((a, b) => b.date - a.date);
}

function formatDate(date) {
    return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
}

function formatAmount(amount) {
    if (amount > 0) {
        return `<span class="amount-positive">+${amount.toFixed(2)}</span>`;
    } else {
        return `<span class="amount-negative">${amount.toFixed(2)}</span>`;
    }
}

function populateExpenses() {
    const expensesList = document.getElementById('expenses-list');
    expensesList.innerHTML = '';

    const recentExpenses = getAllExpenses();

    recentExpenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="category-badge" style="background-color: ${categoryColors[expense.category] || '#FFFFFF'};">${expense.category}</span></td>
            <td>${expense.location}</td>
            <td>${expense.description}</td>
            <td>${formatAmount(expense.amount)}</td>
            <td>${formatDate(expense.date)}</td>
            <td>
                <button class="edit-expense-button" onclick="editExpense(${index})">Edit</button>
                <button class="edit-expense-button" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expensesList.appendChild(row);
    });
}

function calculateCategoryTotals() {
    const categoryTotals = {};

    getFilteredExpenses().forEach(expense => {
        if (expense.category !== "Deposit") {
            if (!categoryTotals.hasOwnProperty(expense.category)) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += Math.abs(expense.amount);
        }
    });

    return categoryTotals;
}

function calculateIncomeExpenseDifference() {
    let totalIncome = 0;

    getFilteredExpenses().forEach(expense => {
        totalIncome += expense.amount;
    });

    return totalIncome;
}

let barChart;
let pieChart;

function setupCharts() {
    const barCtx = document.getElementById('bar-chart').getContext('2d');
    const pieCtx = document.getElementById('pie-chart').getContext('2d');

    if (barChart) barChart.destroy();
    if (pieChart) pieChart.destroy();

    const categoryTotals = calculateCategoryTotals();
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const colors = categories.map(category => categoryColors[category]);
    const textColor = getComputedStyle(document.querySelector('.monthly-report h2')).color;

    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        }
    });

    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        }
    });

    const difference = calculateIncomeExpenseDifference();
    const differenceElement = document.getElementById('income-expense-difference');
    differenceElement.innerHTML = `Net Change: ${difference.toFixed(2)}`;
    if (difference > 0) {
        differenceElement.className = 'amount-positive';
    } else {
        differenceElement.className = 'amount-negative';
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function populateCategoryOptions() {
    const datalist = document.getElementById('categories');
    datalist.innerHTML = ''; // Clear existing options

    for (const category in categoryColors) {
        const option = document.createElement('option');
        option.value = category;
        datalist.appendChild(option);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateCategoryOptions();
    populateExpenses();
    setupCharts();

    // Set today's date as the default date for the date input field
    document.getElementById('date').value = today.toISOString().split('T')[0];

    document.getElementById('expense-form').addEventListener('submit', event => {
        event.preventDefault();
        let category = document.getElementById('category').value;
        if (!categoryColors[category]) {
            categoryColors[category] = getRandomColor();
            populateCategoryOptions(); // Refresh category options to include the new custom category
        }
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = new Date(document.getElementById('date').value);

        if (currentEditIndex !== null) {
            expenses[currentEditIndex] = { category, location, description, amount, date };
            currentEditIndex = null;
        } else {
            expenses.push({ category, location, description, amount, date });
        }

        populateExpenses();
        setupCharts();
        document.getElementById('expense-form').reset();
        document.getElementById('date').value = today.toISOString().split('T')[0];
    });
});

function editExpense(index) {
    const filtered = getAllExpenses();
    const expense = filtered[index];
    currentEditIndex = expenses.indexOf(expense);

    const row = document.getElementById('expenses-list').children[index];
    row.innerHTML = `
        <td><input type="text" value="${expense.category}" id="edit-category-${index}" class="edit-expense-input"></td>
        <td><input type="text" value="${expense.location}" id="edit-location-${index}" class="edit-expense-input"></td>
        <td><input type="text" value="${expense.description}" id="edit-description-${index}" class="edit-expense-input"></td>
        <td><input type="number" value="${expense.amount}" id="edit-amount-${index}" class="edit-expense-input"></td>
        <td><input type="date" value="${expense.date.toISOString().split('T')[0]}" id="edit-date-${index}" class="edit-expense-input"></td>
        <td>
            <button class="edit-expense-button" onclick="saveEditExpense(${index})">Save</button>
            <button class="edit-expense-button" onclick="cancelEditExpense(${index})">Cancel</button>
        </td>
    `;
}

function saveEditExpense(index) {
    const category = document.getElementById(`edit-category-${index}`).value;
    const location = document.getElementById(`edit-location-${index}`).value;
    const description = document.getElementById(`edit-description-${index}`).value;
    const amount = parseFloat(document.getElementById(`edit-amount-${index}`).value);
    const date = new Date(document.getElementById(`edit-date-${index}`).value);

    expenses[currentEditIndex] = { category, location, description, amount, date };
    currentEditIndex = null;

    populateExpenses();
    setupCharts();
}

function cancelEditExpense(index) {
    currentEditIndex = null;
    populateExpenses();
}

function deleteExpense(index) {
    const filtered = getAllExpenses();
    const expenseIndex = expenses.indexOf(filtered[index]);
    if (expenseIndex > -1) {
        expenses.splice(expenseIndex, 1);
    }
    populateExpenses();
    setupCharts();
}