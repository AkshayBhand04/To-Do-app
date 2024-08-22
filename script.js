const todo_value = document.querySelector(".todo-value");
const btn = document.querySelector(".btn")
const list = document.querySelector(".todo-list")

let tododata_arr = []

const getloacalData = () => {
    return JSON.parse(localStorage.getItem('tododata_arr')) || []//parse bcz we take data from local storage in their original form
}
const addDataToLocalStorage = (data) => {
    return localStorage.setItem('tododata_arr', JSON.stringify(data))//data must be in a string format
}
const addtodolist = (e) => {//we need to pass this e
    e.preventDefault();//we need to use this bcz form has their own behaviour which is ,when we click on button of the form which is related to form ,then the form refresh automatically

    let newtodo = todo_value.value.trim();//trim() methods trim the unwanted spaces before data so no one can add data with onlt spaces
    if (newtodo) {//if the vlaue is present inside the input only then the lielem is added without value nothing happens
        //getting data from localstorage
        let tododata_arr = getloacalData()
        tododata_arr.push(newtodo)
        tododata_arr = [... new Set(tododata_arr)]//not getting duplicate values
        addDataToLocalStorage(tododata_arr);
        todo_value.value = ''; // Clear input field after adding
        showtodolist()
    }
}
const showtodolist = () => {
    //Clear the current list to avoid duplicate entries
    list.innerHTML = '';
    let tododata_arr = getloacalData()
    tododata_arr.forEach(elem => {
        const lielem = document.createElement("li")
        lielem.setAttribute("class", "work")//for giving css to lielem 
        lielem.innerHTML = elem//here we targetting the value attribute of input tag to get the value written inside it
        list.appendChild(lielem);
    });

}

const removetodolist = (e) => {
    console.log(e.target.textContent)//for getting text inside that  targeted value
    let todolocalarr = JSON.parse(localStorage.getItem("tododata_arr"))
    updatedtodolist = todolocalarr.filter(currenttodo =>  currenttodo != e.target.textContent )
    // console.log(updatedtodolist)
    addDataToLocalStorage(updatedtodolist);
    showtodolist()

}


btn.addEventListener("click", (e) => {
    addtodolist(e);//when any user click on the button this function gets called
})
showtodolist()

list.addEventListener("click", (e) =>{ removetodolist(e)})

