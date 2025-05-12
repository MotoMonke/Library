function saveProjectArray(){
    localStorage.setItem("Books",JSON.stringify(projectsArray));
}
function loadProjectArray() {
    const data = localStorage.getItem("Books");
    return data ? JSON.parse(data) : [];
}