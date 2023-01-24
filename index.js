function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

function generateName(val) {
   const names = ["Leonardo",
      "Francesco",
      "Alessandro",
      "Lorenzo",
      "Mattia",
      "Tommaso",
      "Gabriele",
      "Andrea",
      "Riccardo",
      "Edoardo"];

   const surnames = ["Rossi",
      "Ferrari",
      "Russo",
      "Bianchi",
      "Romano",
      "Gallo",
      "Costa",
      "Fontana",
      "Conti",
      "Barbieri",
      "Lombardi",
      "Giordano",
      "Cassano",
      "Colombo",
      "Mancini",
      "Longo",
      "Leone",
      "Martinelli"];

   const name = names[getRandomInt(0, names.length)]
   const surname = surnames[getRandomInt(0, surnames.length)]

   if (val === "surname") {
      return surname;
   }
   else {
      return name
   }

}

class Person {
   constructor(name, surname, age) {
      this.name = name;
      this.surname = surname;
      this.age = age
   }

   static ageDiff(p1, p2) {
      if (p1.age > p2.age) {
         return p1.name + ' è più grande di ' + p2.name
      } else if (p1.age < p2.age) {
         return p2.name + ' è più grande di ' + p1.name
      } else {
         return p1.name + ' e ' + p2.name + ' hanno la stessa età.'
      }
   }

}

Person.id = 0

const persone = []
const generatePersons = (quantity) => {
   for (let i = 0; i < quantity; i++) {
      persone.push(new Person(generateName(1), generateName("surname"), getRandomInt(10, 50)))
      persone[i].id = i
   }
   showResults(persone)
}
const aggiungiPersona = () => {
   let nuovoNome = document.getElementById("name")
   let nuovoCognome = document.getElementById("surname")
   let nuovaEta = document.getElementById("eta")
   if (nuovoNome.value && nuovoCognome.value && nuovaEta.value) {
      posizione = persone.length
      persone.push(new Person(nuovoNome.value, nuovoCognome.value, Number(nuovaEta.value)))
      persone[posizione].id = posizione
      nuovoNome.value = ''
      nuovoCognome.value = ''
      nuovaEta.value = ''
      console.log(persone)
      showResults(persone)
      selectPage(persone, "last")
   } else {
      alert("Devi compilare tutti i campi!")
   }
}

const showResults = (array) => {
   let tabella = document.getElementById("utenti")
   tabella.innerHTML = ''

   for (let i = 0; i < array.length; i++) {
      nuovaRiga = document.createElement('tr');
      nuovaRiga.innerHTML = `<th scope="row">${array[i].id}</th>
      <td> ${array[i].name}</td>
      <td>${array[i].surname}</td>
      <td>${array[i].age}</td>`;
      tabella.appendChild(nuovaRiga)
   }
}

const pagination = (items, pageSize = 10) => {
   if (items.length > pageSize) {
      let totalItemsQty = items.length
      let totalPages = 0
      while (totalItemsQty > pageSize) {
         totalItemsQty -= pageSize
         totalPages++
      }
      console.log(totalPages)
      let selettore = document.getElementById('pageSel')
      selettore.innerHTML = ''
      for (let i = 0; i < totalPages + 1; i++) {
         selettore.innerHTML += `<option value="${i}">${i + 1}</option>`
      }
      return totalPages
   }
}

const selectPage = (items, activePage = 0, pageSize = 10) => {
   if (activePage === "last") {
      activePage = pagination(items, pageSize)
      document.querySelector('#pageSel > option:last-child').setAttribute("selected", "")
   }
   itemsInPage = []
   itemsInPage = [...items]
   if (activePage > 0) {
      showResults(itemsInPage.slice((pageSize * activePage), (pageSize * activePage) + pageSize))
   } else {
      showResults(itemsInPage.slice(0, pageSize))
   }
}

generatePersons(29)
selectPage(persone, "last")

document.querySelector("#newPerson").addEventListener("click", aggiungiPersona);
document.getElementById('pageSel').onchange = function () {
   paginaScelta = document.getElementById('pageSel').value
   selectPage(persone, paginaScelta)
}

document.getElementById("checkDiff").onclick = function () {
   p1 = document.getElementById("p1")
   p2 = document.getElementById("p2")
   if (p1.value > -1 && p2.value > -1 && p1.value < persone.length && p2.value < persone.length && p1.value && p2.value) {
      document.getElementById("repDiff").innerHTML = Person.ageDiff(persone[p1.value], persone[p2.value])
   } else {
      alert("Non hai inserito un id o hai messo valori non validi!")
   }
}