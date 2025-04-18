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
        const div=document.createElement("div");
        div.className="book-container";
        container.appendChild(div);
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

