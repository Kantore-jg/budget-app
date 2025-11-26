let budget_storage = 0;
let expense_storage = 0;
let income_storage = 0;
const inc_list = []
const exp_list = []


const today = new Date()
const title = document.getElementById("title");
if (title){
<<<<<<< HEAD
title.textContent = `Budget App - ${today.toLocaleString('fr-FR', {month:'long'})} ${today.getFullYear()}`;
=======
title.textContent = `Budget App - ${today.toLocaleString('fr-FR',{month:'long'})} ${today.getFullYear()}`;
>>>>>>> 6c9b5b8 (first commit)

}



function updateBudget(){
const expense = document.getElementById("EXPENSES");
if (expense){
    expense.textContent = "Expenses: -"+ expense_storage.toFixed(2);
}
const income = document.getElementById("INCOME");
if (income){
    income.textContent = "Income: +"+ income_storage.toFixed(2);
}
const budget = document.getElementById("budget");
if (budget){
    budget_storage = income_storage - expense_storage;
    const sign = budget_storage >= 0 ? "+" : "";
    budget.textContent = sign + budget_storage.toFixed(2);
}

}
function option_selection(){
const option_choice = document.getElementById("add_descr");
const option_select = option_choice.value;
// option_choice ? option_choice.value:null;

const descrEl = document.getElementById("add_description");
const descr = descrEl ? descrEl.value : "";

const valueInput = document.getElementById("value");
let value = parseFloat(valueInput ? valueInput.value : 0);

if (isNaN(value) || value <= 0) {
        alert("Veuillez entrer un montant positif valide !");
        return; 
    }
const budget_dict = {
<<<<<<< HEAD
        "description": descrEl.value,
        "value":value.toFixed(2)
    }
if (option_select === "plus"){
    inc_list.push(budget_dict);
    const ulInc = document.getElementById("ListeInc");
        const li = document.createElement("li");
        li.textContent = budget_dict.description +" : "+ budget_dict.value
        ulInc.appendChild(li)
    
    income_storage += value;
}else{
    exp_list.push(budget_dict);
    const ulexp = document.getElementById("ListeExp");
        const li = document.createElement("li");
        li.textContent = budget_dict.description +" : -"+ budget_dict.value;
        ulexp.appendChild(li)
    
    expense_storage += value;
}updateBudget();
=======
        "description": descr,
        "value":value.toFixed(2)
    }
const li = document.createElement("li");
let transactionText = budget_dict.description +" : ";



if (option_select === "plus"){
    inc_list.push(budget_dict);
    income_storage += value;
    transactionText += "+" + value.toFixed(2);

    const ulInc = document.getElementById("ListeInc");
        ulInc.appendChild(li)
    
}else{
    exp_list.push(budget_dict);
    expense_storage += value;
    transactionText += "-" + value.toFixed(2);

    const ulexp = document.getElementById("ListeExp");
        ulexp.appendChild(li)
    
}
li.innerHTML = `
        <span class="list-content">${transactionText}</span>
        <button class="delete-btn"><i class="far fa-times-circle"></i></button>
    `;


updateBudget();
>>>>>>> 6c9b5b8 (first commit)
if (descrEl) descrEl.value = "";
if (valueInput) valueInput.value = "";

}

<<<<<<< HEAD
function deleteTransaction(event) {
    // Vérifie si l'élément cliqué est bien un bouton de suppression
    if (event.target.classList.contains('delete-btn')) {
        const button = event.target;
        const listType = button.dataset.list; // 'inc' ou 'exp'
        const itemIndex = parseInt(button.dataset.index); // L'index dans le tableau

        let valueToRemove = 0;

        if (listType === 'inc') {
            // Récupérer la valeur avant de la supprimer
            valueToRemove = parseFloat(inc_list[itemIndex].value);
            // Supprimer l'élément du tableau (méthode splice)
            inc_list.splice(itemIndex, 1);
            // Mettre à jour le stockage de revenus
            income_storage -= valueToRemove; 
            
        } else if (listType === 'exp') {
            valueToRemove = parseFloat(exp_list[itemIndex].value);
            exp_list.splice(itemIndex, 1);
            expense_storage -= valueToRemove; 
        }

        // Supprimer l'élément <li> de l'interface
        button.parentElement.remove();

        // Réajuster les index des éléments restants dans la liste (nécessaire après splice)
        // C'est la partie la plus critique et la plus complexe, car tous les index suivants changent.
        // Pour simplifier ici, nous allons recharger entièrement les listes après la suppression.
        
        // RECHARGEMENT DES LISTES (Plus simple et plus robuste pour l'indexation)
        redrawLists();
        
        // Mettre à jour l'affichage des totaux
=======

function deleteTransaction(event){
    const deleteButton = event.target.closest(".delete-btn");

    if (deleteButton){
        const listItem = deleteButton.closest("li");

        const listTextElement = listItem.querySelector(".list-content");
        if (!listTextElement) return;

        const listText = listTextElement.textContent.trim();

        const isIncome = listText.includes(": +");

        const amountText = listText.split(": ")[1].replace("+", "").replace("-", "");
        const amount = parseFloat(amountText);

        if (isIncome){
            income_storage -= amount;
            const index = inc_list.findIndex(item => (item.description + ": -"+ item.value) === listText);
            if (index !== -1) 
                inc_list.splice(index, 1);
    }else{
            expense_storage -= amount;
            const index = exp_list.findIndex(item => (item.description + ": -"+ item.value) === listText);
            if (index !== -1)
                exp_list.splice(index, 1);

    }
        listItem.remove();
>>>>>>> 6c9b5b8 (first commit)
        updateBudget();
    }
}

<<<<<<< HEAD
// Fonction pour reconstruire les listes après une suppression (pour corriger les index)
function redrawLists() {
    const ulInc = document.getElementById("ListeInc");
    const ulexp = document.getElementById("ListeExp");
    
    // Vider les listes HTML actuelles
    ulInc.innerHTML = '';
    ulexp.innerHTML = '';

    // Reconstruire les revenus
    inc_list.forEach((item, index) => {
        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.dataset.list = "inc";
        deleteBtn.dataset.index = index; // Nouvel index
        li.textContent = `${item.description} : +${item.value} €`;
        li.appendChild(deleteBtn);
        ulInc.appendChild(li);
    });

    // Reconstruire les dépenses
    exp_list.forEach((item, index) => {
        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.dataset.list = "exp";
        deleteBtn.dataset.index = index; // Nouvel index
        li.textContent = `${item.description} : -${item.value} €`;
        li.appendChild(deleteBtn);
        ulexp.appendChild(li);
    });
}



document.addEventListener("DOMContentLoaded",function(){
    updateBudget();
    var button_validate = document.getElementById("validation");
    if (button_validate){
    button_validate.addEventListener("click", option_selection);
    }
    document.body.addEventListener('click', deleteTransaction);
=======

document.addEventListener("DOMContentLoaded",function(){
    updateBudget(); 
    const button_validate = document.getElementById("validation");
    if (button_validate){
        button_validate.addEventListener("click", option_selection);
    }
        document.addEventListener('click', deleteTransaction); 
    
>>>>>>> 6c9b5b8 (first commit)
})








<<<<<<< HEAD


=======
>>>>>>> 6c9b5b8 (first commit)
