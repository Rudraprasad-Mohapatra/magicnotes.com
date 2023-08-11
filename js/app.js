showNotes();
let addBtn = document.getElementById('addBtn');
let totalNotes= document.getElementById('totalNotes');
let sideElement=document.createElement('span');
totalNotes.appendChild(sideElement);
sideElement.classList.add('d-inline','text-primary','mx-2');
if(notesObj.length==0)
    sideElement.innerHTML=`You have no note!`
    else if(notesObj.length==1)
    sideElement.innerHTML=`You have only ${notesObj.length} note!`
    else
sideElement.innerHTML=`You have total ${notesObj.length} notes !`
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('exampleFormControlTextarea1');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if((addTitle.value != "") && (addTxt.value != "")){
        let myObj={
            title : addTitle.value,
            text : addTxt.value
        }
        notesObj.push(myObj);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value= "";
    console.log(notesObj);
    if(notesObj.length==0)
    sideElement.innerHTML=`You have no note!`
    else if(notesObj.length==1)
    sideElement.innerHTML=`You have only ${notesObj.length} note!`
    else
    sideElement.innerHTML=`You have total ${notesObj.length} notes !`
    showNotes();
});
//Function for show notes inside of local storage
function showNotes(e) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // if(notesObj.length==1)
    //  alert('Congrats You have added your 1st Note!');
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card d-inline-block m-auto" style="width: 14rem;">
        <div class="card-body">
            <h5 class="card-title">${index+1} : ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h6>Nothing to Show! Use the above "Add a Note" section above to add notes.<div class='text-center'>thank you !</div></h6> `;
    }
}
//Function to deletenote
function deleteNote(index) {
    console.log('I am deleting', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    if(notesObj.length==0)
    sideElement.innerHTML=`You have no note!`
    else if(notesObj.length==1)
    sideElement.innerHTML=`You have only ${notesObj.length} note!`
    else
    sideElement.innerHTML=`You have total ${notesObj.length} notes !`
    showNotes();
}
//Searching
let searchtext = document.getElementById('searchTxt');
searchtext.addEventListener("input", function () {
    let inputVal = searchtext.value.toLowerCase();
    if(inputVal=="")
    showNotes();
    //console.log(inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    // console.log(noteCards);
    Array.from(noteCards).forEach(function (el) {
        let cardTxt = el.getElementsByTagName("p")[0].innerText;
        console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            el.classList.add("d-block");
        }
        else {
            el.classList.add("d-none");
        }
        // console.log(cardTxt);
    });
});

