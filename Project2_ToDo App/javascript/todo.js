const inputEle=document.getElementById('todo');
const editTodoEle=document.getElementById('edit-todo');
const editingTodoEle=document.getElementById('editing-todo');
const todoListEle=document.getElementById('todo-list');
const cancelEditBtnEle=document.getElementById('cancel');

const todos=localStorage.getItem('todoList');
 if(todos){
  let todosArr = JSON.parse(todos);
 todosArr.forEach((todoItem) => {
  const todoEle=createTodoList(todoItem.name);
  todoListEle.append(todoEle);
  })
 }

inputEle.addEventListener('keyup',function(e){

 if(e.key ==='Enter'){
    const value = inputEle.value;

  if(value.trim()){ 
   const editId = editTodoEle.value;
      if(editId){
        const todoItem=(document.getElementById(editId).innerText= value);
        clearInput();
      todoItem={
         name:value
                }
    setLocalStorage(todoItem);

      }
      else {
        const todoEle=createTodoList(value);
        todoListEle.append(todoEle);
         clearInput(); 
       const todo={
       name:value
      }
      setLocalStorage(todo);
      }
    }
  }
})

todoListEle.addEventListener('click',function(e) 
{
 const isEditClicked = e.target.classList.contains('edit');
 const isDeleteClicked =e.target.classList.contains('delete');

  if(isEditClicked){
    const inputEle = document.getElementById('todo');
    const target= e.target;
    inputEle.value = target.dataset.name;
    editTodoEle.value= target.dataset.id;
    editingTodoEle.style.display= 'inline-block';
    cancelEditBtnEle.style.display= 'inline-block';
  }
  if(isDeleteClicked){
    const target = e.target;
    target.closest('li').remove();
  }
})
cancelEditBtnEle.addEventListener('click',function(e){
  clearInput();
})

function createTodoList(value){  
 const li= document.createElement('li');
 const id= uuid.v4();
 li.innerHTML= `
   <div class='todo-content' >
                <span id='${id}'>
                ${value}
                </span>
                <span>
            <i class='bi bi-pencil-square edit'title="Edit" data-name='${value}' data-id='${id}'></i>
                <i class='bi bi-trash-fill delete' title="Delete" data-id='id'></i>
            </span>
            </div> 
   `;
   return li;
}
function clearInput(){
  
  editingTodoEle.style.display='none';
  cancelEditBtnEle.style.display='none';
  editTodoEle.value= '';
  inputEle.value='';

}
function setLocalStorage(todo){
  const todoList = localStorage.getItem('todoList')
  if(todoList){
      const list = JSON.parse(todoList);
      list.push(todo);
      localStorage.setItem('todoList',JSON.stringify(list))
  }else{
    const todoList= [];
    todoList.push(todo);
    localStorage.setItem('todoList',JSON.stringify(todoList))
  }
}


