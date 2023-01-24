function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

function generateName(val) {
   const names = ["abandoned", "able", "rocky"];

   const surnames = ["people", "history", "way", "Tom", "Lieuwe"];

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

const persone = []
const generatePersons = (quantity) => {
   for (let i = 0; i < quantity; i++) {
      persone.push(new Person(generateName(1), generateName("surname"), getRandomInt(10, 50)))
      showResults(persone)
   }
}
const aggiungiPersona = () => {
   let nuovoNome = document.getElementById("name")
   let nuovoCognome = document.getElementById("surname")
   let nuovaEta = document.getElementById("eta")
   if (nuovoNome.value && nuovoCognome.value && nuovaEta.value) {
      persone.push(new Person(nuovoNome.value, nuovoCognome.value, Number(nuovaEta.value)))
      console.log(persone)
      showResults(persone)
   } else {
      alert("Devi compilare tutti i campi!")
   }
}

const showResults = (array) => {
   let tabella = document.getElementById("utenti")
   tabella.innerHTML = ''

   for (let i = 0; i < array.length; i++) {
      nuovaRiga = document.createElement('tr');
      nuovaRiga.innerHTML = `<th scope="row">${i}</th>
      <td> ${array[i].name}</td>
      <td>${array[i].surname}</td>
      <td>${array[i].age}</td>`;
      tabella.appendChild(nuovaRiga)
   }
}



generatePersons(2)
document.querySelector("#newPerson").addEventListener("click", aggiungiPersona);