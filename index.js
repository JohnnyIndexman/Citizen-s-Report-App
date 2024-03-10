//firebase part
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://emmergency-report-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const appData = ref(database, 'Emergency-report')

const first = document.getElementById('front');
const report = document.querySelector('.report');
const view = document.querySelector('.view');
const _secondSection = document.querySelector('#report');
const _sectionThird = document.querySelector('#display');
const button = document.querySelector('button');
const _nameInput = document.querySelector('.name-input');
const _dateInput = document.querySelector('.date-input'); 
const small = document.querySelectorAll('.error');
const returned = document.querySelectorAll('.fa')
const containDisplay = document.querySelector('.contain-display')


const textArea = document.querySelector('#text');

// Functions
report.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '#report';
    _secondSection.style.display = 'flex';
    first.style.display = 'none';
});

view.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '#display';
    _sectionThird.style.display = 'block';
    first.style.display = 'none';
});

// Functions for reporting
button.addEventListener('click', handleClick);

function create() {
    let newDiv = document.createElement('div');
    let newP = document.createElement('p');
    let newh4 = document.createElement('h4');
    let newSmall = document.createElement('small');
    let newi = document.createElement('i');
    console.log(newi)

    

    newDiv.classList.add('display-contain');
    newP.classList.add('report-disp');
    newh4.classList.add('author');
    newSmall.classList.add('dates');
    newi.classList.add('fa-solid', 'fa-trash-can');
    

    
    _sectionThird.append(newDiv);
    newDiv.append(newSmall);
    newDiv.append(newP);
    newDiv.append(newh4);
    newDiv.append(newi);

    let n = _nameInput.value;
    let t = textArea.value;
    let d = _dateInput.value;
    newSmall.textContent = d;
    newP.textContent = t; 
    newh4.textContent = n;

    return {
        author: n,
        report: t,
        date: d
    };


}

function validation(){
    let n = _nameInput.value;
    let t = textArea.value;
    let d = _dateInput.value;
    let isValid = true
    if (n === '') {
        small[0].innerHTML = 'Empty space... fill.';
        small[0].style.color = 'red'; 
        isValid=false
    }

    else if (t === '') {
        small[2].innerHTML = 'Empty space... drop a report.';
        small[2].style.color = 'red';
        isValid=false
    }

    else if (d === '' || !d.includes('/') || d.length > 8) {
        small[1].innerHTML = 'Empty space... add a date.';
        small[1].style.color = 'red'; 
        isValid=false
    } else {
       return isValid
    }
}

function clearForm() {
    _nameInput.value = '';
    textArea.value = '';
    _dateInput.value = '';
    small.forEach(error => error.innerHTML = '');
}

function handleClick(e) {
    e.preventDefault();
    if(validation()){
        const data = create();
        clearForm();
        _sectionThird.style.display = 'block';
        window.location.href = '#display';
        _secondSection.style.display = 'none'

        push(appData, data);
    }
    
}

returned.forEach(r => r.addEventListener('click', () => {
    window.location.href = '#front';
    first.style.display = 'flex';  
    _secondSection.style.display = 'none';
    _sectionThird.style.display = 'none'
}));


onValue(appData, function(snapshot){

    if(snapshot.exists()){
        const repData = Object.entries(snapshot.val())
    containDisplay.innerHTML = '';
    

    repData.forEach(rep => {
        let repVal = rep[1]
        let repId = rep[0]
        console.log(repId)
        displayReport(repVal, repId)
        });

        //const deleteIcons = document.querySelectorAll('.delete-icon');
        
        document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-icon')) {
        console.log('you just clicked me');
        let repId = e.target.dataset.repId;
        let exactLocation = ref(database, `Emergency-report/${repId}`);
        remove(exactLocation).catch(error => console.error("Error removing document: ", error));
    }
});
    }
    

    //reproduction(rep)
    
   
    
})



function displayReport(data, repId) {
    let newDiv = document.createElement('div');
    let newP = document.createElement('p');
    let newh4 = document.createElement('h4');
    let newSmall = document.createElement('small');
    let newi = document.createElement('i');
    
    

    newDiv.classList.add('display-contain');
    newP.classList.add('report-disp');
    newh4.classList.add('author');
    newSmall.classList.add('dates');
    newi.classList.add('fa-solid', 'fa-trash-can');
    newi.classList.add('delete-icon');
    newi.dataset.repId = repId;
    

    
    containDisplay.append(newDiv);
    newDiv.append(newSmall);
    newDiv.append(newP);
    newDiv.append(newh4);
    newDiv.append(newi);

    newSmall.textContent = data.date;
    newP.textContent = data.report;
    newh4.textContent = data.author;

}

