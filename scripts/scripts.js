var people = [];
const peopleContainer = document.getElementById('people-container');

function getApi(url){
    fetch(url)
    .then(res => res.json())
    .then(data =>
    {
        people = data.results;
        printPeople();
    })
    .catch(err => console.log(err))
}

function printPeople(){
    peopleContainer.innerHTML = '';
    let ul = document.createElement('ul');

    ul.classList.add('list-group');
    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        const personElement = document.createElement('li');
        personElement.classList.add('list-group-item');
        personElement.classList.add('btn');
        personElement.classList.add('btn-info');
        personElement.innerHTML = `${person.name}`;
        personElement.onclick = function(id){
            console.log("Clicked on person: " + person.uid);
            printPersonToCard(person.uid);
        }
        ul.appendChild(personElement);
    }
    peopleContainer.appendChild(ul);
}

function printPersonToCard(id){
    fetch('https://www.swapi.tech/api/people/' + id)
    .then(res => res.json())
    .then(data =>
    {
        let person = data.result;
        let cardBody = document.getElementById('card-body');
        cardBody.innerHTML = '';
        let ul = document.createElement('ul');
        ul.classList.add('list-group');
        for (let property in person.properties) {
            if(property == 'created' || property == 'edited' || property == 'homeworld' || property == 'url'){
                continue;
            }
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            let propertyName = property;
            if(propertyName.includes('_')){
                propertyName = propertyName.replace('_', ' ');
            }
            propertyName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
            li.textContent = `${propertyName}: ${person.properties[property]}`;
            ul.appendChild(li);
        }
        cardBody.appendChild(ul);
    })
    .catch(err => console.log(err))
}

getApi('https://www.swapi.tech/api/people');