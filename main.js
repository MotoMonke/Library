const myLibrary=[];

const openButton=document.querySelector("[data-open-modal]");
const submitButton=document.querySelector("[data-close-modal]");
const modal=document.querySelector("[data-modal]");
const form=document.querySelector("form");
const container=document.getElementById("container");

function Book(title,author,pages,red,id){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.red=red;
    this.id=id;
}
function addBookToLibrary(title,author,pages,red) {
    myLibrary.push(new Book(title,author,pages,red,crypto.randomUUID()));
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function changeReadStatus(button){
    if(button.id==="read"){
        button.id="not-read"
        button.innerText="Not Read"
    }else{
        button.id="read"
        button.innerText="Read"
    }
}
function changeObjectReadValue(obj){
    if(obj.red===true){
        obj.red=false;
    }else{
        obj.red=true;
    }
}
function updateContainer(){
    myLibrary.forEach(obj=>{
        //creating div for information about book
        const div=document.createElement("div");
        div.className="book-container";
        container.appendChild(div);
        //title
        const title=obj.title;
        const titleText=document.createElement("div");
        titleText.innerText=title;
        div.appendChild(titleText);
        //author
        const author=obj.author;
        const authorText=document.createElement("div");
        authorText.innerText=author;
        div.appendChild(authorText);
        //amount of pages
        const pages=obj.pages;
        const pagesText=document.createElement("div");
        pagesText.innerText=pages;
        div.appendChild(pagesText);
        //readed or not (TODO:update it for yes or no radiobuttons)
        const red=obj.red;
        const button=document.createElement("button");
        if(red===true){
            button.id="read";
            button.innerText="Read";
        }else{
            button.id="not-read";
            button.innerText="Not Read";
        }
        div.appendChild(button);
        button.addEventListener('click',()=>{
            changeReadStatus(button);
            changeObjectReadValue(obj);
        });
        
    });
    console.table(myLibrary);
}

openButton.addEventListener("click",()=>{
    modal.showModal();
});

submitButton.addEventListener("click",()=>{
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

console.table(myLibrary);
