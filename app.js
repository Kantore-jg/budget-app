let budget_storage = 0;
let expense_storage = 0;
let income_storage = 0;
const inc_list = []
const exp_list = []


const today = new Date()
const title = document.getElementById("title");
if (title){
title.textContent = `Budget App - ${today.toLocaleString('fr-FR', {month:'long'})} ${today.getFullYear()}`;

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
if (descrEl) descrEl.value = "";
if (valueInput) valueInput.value = "";

}

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
        updateBudget();
    }
}

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
})










