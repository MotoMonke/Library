const openButton=document.querySelector("[data-open-modal]");
const submitButton=document.querySelector("[data-close-modal]");
const modal=document.querySelector("[data-modal]");
const form=document.querySelector("form");
const container=document.getElementById("container");
const closeDialog=document.getElementById("close-dialog");

class Book{
    constructor(title,author,pages,red,id){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.red=red;
        this.id=id;
    }
}
//local storage functions

function saveBooksArray(){
    localStorage.setItem("Books",JSON.stringify(myLibrary));
}
function loadBooksArray() {
    const data = localStorage.getItem("Books");
    return data ? JSON.parse(data) : [];
}
const myLibrary=loadBooksArray();
/////
function createBoockCard(obj){
    //creating div for information about book
    const div=document.createElement("div");
    div.className="book-container";
    container.appendChild(div);
    //title
    const title=obj.title;
    const titleText=document.createElement("div");
    titleText.innerText="Title: "+title;
    div.appendChild(titleText);
    //author
    const author=obj.author;
    const authorText=document.createElement("div");
    authorText.innerText="Author: "+author;
    div.appendChild(authorText);
    //amount of pages
    const pages=obj.pages;
    const pagesText=document.createElement("div");
    pagesText.innerText="Pages: "+pages;
    div.appendChild(pagesText);
    
    const red=obj.red;
    const button=document.createElement("button");
    if(red===true){
        button.className="read";
        button.innerText="Read";
    }else{
        button.className="not-read";
        button.innerText="Not Read";
    }
    div.appendChild(button);
    button.addEventListener("click",()=>{
        changeReadStatus(button);
        changeObjectReadValue(obj);
    });
    //delete button
    const deleteButton=document.createElement("button");
    deleteButton.className="deleteButton";
    deleteButton.innerText="Delete";
    deleteButton.addEventListener("click",()=>{
        removeObj(obj,div);
    })
    div.appendChild(deleteButton);
}
function changeReadStatus(button){
    if(button.className==="read"){
        button.className="not-read"
        button.innerText="Not Read"
    }else{
        button.className="read"
        button.innerText="Read"
    }
}
function changeObjectReadValue(obj){
    if(obj.red===true){
        obj.red=false;
    }else{
        obj.red=true;
    }
    saveBooksArray();
}
function removeObj(obj,div){
    div.parentNode.removeChild(div);
    const index=myLibrary.indexOf(obj);
    myLibrary.splice(index,1);
    removeAllChildNodes(container);
    updateContainer();
    saveBooksArray();
}
/////
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function addBookToLibrary(title,author,pages,red) {
    myLibrary.push(new Book(title,author,pages,red,crypto.randomUUID()));
    saveBooksArray();
}
function updateContainer(){
    myLibrary.forEach(obj=>{
        createBoockCard(obj);
    });
    
}


(function(){
    openButton.addEventListener("click",()=>{
        modal.showModal();
    });
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const title=document.getElementById("title").value;
        const author=document.getElementById("author").value;
        const pages=document.getElementById("pages").value;
        const readed=document.getElementById("red");
        addBookToLibrary(title,author,pages,(readed.checked===true?true:false));
        form.reset();
        modal.close();
        removeAllChildNodes(container);
        updateContainer();
    });
    closeDialog.addEventListener("click",()=>{
        modal.close();
    })
})();
updateContainer();



