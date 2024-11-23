// variabili per prendre gli input
let n = document.getElementById("name");
let f = document.getElementById("film");
// variabile per fare in modod che i campi vengano compilati
let stupid = document.getElementById("stupid");
// array dei film
let movies = [];

// agginge alla lista
function add() {
    // se i campi non sono compilati ti dice di compilarli
    if (!n.value || !f.value) {
        stupid.innerText = "inserisici entrambi i parametri!";
        stupid.classList.remove("d-none");
    } else {
        stupid.classList.add("d-none");
        newObj()
    }
}

function newObj() {
    // crea un oggetto con i dati inseriti
    let obj ={};
    obj["name"] = `${n.value}`;
    obj["film"] = `${f.value}`;
    obj["id"] = movies.length ;
    movies.push(obj);
    console.log("Nuovo nome e film aggiunti ", movies);
    // va alla creazione della riga
    newRow()
}

function newRow() {
    // crea la riga  gli mette l'id con il nome
    let row = document.getElementById("pull")
    .appendChild(document.createElement("tr"));
    row.setAttribute("id", `N${movies.length - 1}`);
    // asterisco
    let newAs = row.appendChild(document.createElement("th"));
    newAs.innerHTML = '<i class="bi bi-asterisk"></i>';
    // nome
    let newName = row.appendChild(document.createElement("th"));
    newName.textContent = "Anonimo";
    // film
    let newFilm = row.appendChild(document.createElement("th"));
    newFilm.textContent = "Sorpresa...";
    // elimina
    let newTrash = row.appendChild(document.createElement("th"));
    newTrash.innerHTML = '<th><i onclick="cancel()" class= "btn bi bi-trash text-danger"></i></th>';
    // pulisce e scrolla sotto
    clean()
    newAs.scrollIntoView({behavior: "smooth", block: "center"});
    console.log("Nuova riga aggiunta: ", row);
    
}
// pulisce gli input
function clean() {
    n.value = "";
    f.value = "";
}
// cancella la riga
async function cancel() {
    try {
        if (movies.length > 1) {
            // riga da togliere
            let oldTag = await event.target.parentElement.parentElement; 
            let temp = oldTag.id;
            // id della riga
            let oldId = temp.replace("N", "");
            // Number(oldId);
            console.log("Stai cancellando l'id: ", oldId);
            console.log(oldTag);
            oldTag.remove();
            newCount(oldId);
        } else {
            movies.length = 0;
            console.log("ora l'elenco è: ", movies);
        }
    } catch (error) {
        alert("errore nel cancellare la riga");
        console.log(error);
        
    }
}
// per ricontare gli elementi
function newCount(oldId) {
    movies.splice(oldId, 1)
    console.log("ora l'elenco è: ", movies);
    movies.forEach(el => {
        console.log("Modificando oggetto: ", el);
        let temp = document.getElementById(`N${el.id}`)
        console.log("Modificando tag: ", temp);
        temp.removeAttribute("id");
        temp.setAttribute("id", `N${movies.indexOf(el)}`);
        console.log("nuovo tag: ", temp);
        el.id = movies.indexOf(el);
        console.log("nuovo id: ", el);
        
        
    });
    console.log("Elenco: ", movies);
    
    
}

// per resettare tutta la tabella
function reset() {
    let res = document.getElementById("pull");
    res.innerHTML = "";
    movies.length = 0;
    clean()
    stupid.classList.add("d-none");
}

//sceglie e rivela il vincitore
function reveal() {
    let win = Math.floor(Math.random() * movies.length);
    console.log("vincerà: ", win);
    
    movies.forEach(el => {
        let luck = document.querySelector(`#N${el.id}`);
        console.log("rivelano: " , luck);
        
        luck.children[1].innerText = el.name;
        luck.children[2].innerText = el.film;
        luck.children[3].firstChild.classList.add("disabled");
        
        if (el.id === win) {
            luck.classList.add("table-success")
            luck.children[0].innerHTML = '<i class="bi bi-trophy-fill"></i>';
        }
        
    });
}
