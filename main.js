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
function updateContainer(){
    myLibrary.forEach(obj=>{
        //creating div for information about book
        const div=document.createElement("div");
        div.className="book-container";
        container.appendChild(div);
        //title
        const title=obj.title;
        const titleText=document.createElement("span");
        titleText.innerText=title;
        div.appendChild(titleText);
        //author
        const author=obj.author;
        const authorText=document.createElement("span");
        authorText.innerText=author;
        div.appendChild(authorText);
        //amount of pages
        const pages=obj.pages;
        const pagesText=document.createElement("span");
        pagesText.innerText=pages;
        div.appendChild(pagesText);
        //red or not (TODO:update it for yes or no radiobuttons)
        const red=obj.red;
        const redText=document.createElement("span");
        redText.innerText=red;
        div.appendChild(redText);

    });
}

openButton.addEventListener("click",()=>{
    modal.showModal();
});

submitButton.addEventListener("click",()=>{
    const title=document.getElementById("title").value;
    const author=document.getElementById("author").value;
    const pages=document.getElementById("pages").value;
    const red=document.getElementById("red").value;
    addBookToLibrary(title,author,pages,red);
    form.reset();
    modal.close();
    removeAllChildNodes(container);
    updateContainer();
});
console.table(myLibrary);

