"use stric";
document.addEventListener("DOMContentLoaded", getLocalNotes);
//selectors
const search = document.getElementById("search");
const create = document.getElementById("create");
const noterHome = document.querySelector(".noter-home");
const createArea = document.querySelector(".firstHide");

search.addEventListener("click", startSearch);
create.addEventListener("click", startNewNote);

function getLocalNotes() {
  const notes = document.querySelector(".notes");
  notes.innerHTML = localStorage.getItem("notes");

  if (notes.innerHTML == "") {
    document.querySelector(".nothing").style.display = "unset";
  }
  const expand = document.querySelectorAll(".open");
  const expandLess = document.querySelectorAll(".close");
  const deletebutton = document.querySelectorAll(".delete");
  const edit = document.querySelectorAll(".edit");

  for (let i = 0; i < expand.length; i++) {
    expand[i].addEventListener("click", openNote);
  }
  for (let i = 0; i < expandLess.length; i++) {
    expandLess[i].addEventListener("click", closeNote);
  }
  for (let i = 0; i < deletebutton.length; i++) {
    deletebutton[i].addEventListener("click", deleteNote);
  }
  for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener("click", editNote);
  }
}
function saveLocalNotes(note) {
  localStorage.setItem("notes", note.parentElement.innerHTML);
}
//FUNCTIONS
//startnewNote Note
function startNewNote() {
  document.querySelector(".nothing").style.display = "none";

  createArea.innerHTML = "";
  noterHome.style.display = "none";
  createArea.classList.add("createArea");
  createArea.style.backgroundColor = "#c9eaef";
  const colors = document.createElement("div");
  colors.classList.add("colors");
  createArea.appendChild(colors);
  const arr = ["blue", "green", "yellow", "red", "purple", "pink"];
  const mycolors = [
    "rgb(201, 234, 239)",
    "rgb(122, 243, 158)",
    "rgb(249, 226, 152)",
    "rgb(249, 180, 180)",
    "rgb(164, 156, 241)",
    "rgb(245, 153, 239)",
  ];
  for (let i = 0; i < arr.length; i++) {
    let color = document.createElement("div");
    if (i == 0) color.classList.add("selected");
    color.classList.add("color", arr[i]);
    color.dataset.color = mycolors[i];
    colors.appendChild(color);
  }
  const title = document.createElement("textarea");
  title.classList.add("create-title");
  title.placeholder = "Title";
  title.maxLength = 43;
  title.rows = 1;
  title.cols = 1;

  createArea.appendChild(title);

  const text = document.createElement("textarea");
  text.classList.add("create-text");
  text.placeholder = "Text...";
  createArea.appendChild(text);

  const bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottom-dev");

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.innerText = "Cancel";
  bottomDiv.appendChild(cancelBtn);
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("save-btn");
  saveBtn.innerText = "Save";
  bottomDiv.appendChild(saveBtn);
  createArea.appendChild(bottomDiv);
  title.onkeyup = () => {
    if (title.value.length >= 43) {
      alert("Maximum length for title have reached");
    }
  };
  //Event Listener for bg Colors
  const bgColors = document.querySelectorAll(".color");
  for (let i = 0; i < bgColors.length; i++) {
    bgColors[i].onclick = selectBg;
  }

  //event listerner for Save Notes
  saveBtn.onclick = saveNote;
  // Cancel Notes
  cancelBtn.onclick = cancelNote;
}

//Pick bg color
function selectBg() {
  const bgColors = document.querySelectorAll(".color");
  for (let i = 0; i < bgColors.length; i++) {
    bgColors[i].classList.remove("selected");
    this.classList.add("selected");
  }
  document.querySelector(".create-text").style.backgroundColor =
    this.dataset.color;
  document.querySelector(".create-title").style.backgroundColor =
    this.dataset.color;
  createArea.style.backgroundColor = this.dataset.color;
}

// Cancel Notes creation
function cancelNote() {
  createArea.classList.remove("createArea");
  noterHome.style.display = "unset";
  getLocalNotes();
}

//Save Notes
function saveNote() {
  const title = document.querySelector(".create-title").value;
  const text = document.querySelector(".create-text").value;
  let bgColor = (document.querySelector(".createArea").dataset.bgColor =
    createArea.style.backgroundColor);
  const newDate = new Date();
  const date = newDate.getMonth() + 1 + ":" + newDate.getDate();
  const note = Note(title, text, date, bgColor);
  noterHome.children[1].appendChild(note);
  saveLocalNotes(note);
  createArea.classList.remove("createArea");
  noterHome.style.display = "unset";
  getLocalNotes();
}
//Note
function Note(title, text, date, bgColor) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.style.backgroundColor = bgColor;
  const edit = document.createElement("img");
  edit.classList.add("edit", "hide");
  edit.src = "images/add.svg";
  edit.alt = "edit note";
  note.appendChild(edit);

  const deleteBtn = document.createElement("img");
  deleteBtn.classList.add("delete", "hide");
  deleteBtn.src = "images/delete.svg";
  deleteBtn.alt = "delete note";
  note.appendChild(deleteBtn);

  const closeBtn = document.createElement("img");
  closeBtn.classList.add("close", "hide");
  closeBtn.src = "images/expand_less.svg";
  closeBtn.alt = "close note";
  note.appendChild(closeBtn);

  const open = document.createElement("img");
  open.classList.add("open");
  open.src = "images/expand.svg";
  open.alt = "open note";
  note.appendChild(open);

  const p = document.createElement("p");
  p.classList.add("date");
  p.innerText = date;
  note.appendChild(p);

  const h3 = document.createElement("h3");
  h3.classList.add("title");
  h3.innerText = title;
  note.appendChild(h3);

  const noteText = document.createElement("p");
  noteText.classList.add("text");
  noteText.innerText = text;
  note.appendChild(noteText);
  return note;
}
let c = true;
//Search Note
function startSearch() {
  search.style.display = "none";
  const top = document.querySelector(".top");
  const searchInput = document.createElement("input");
  top.appendChild(searchInput);
  const cancelSearch = document.createElement("img");
  cancelSearch.src = "images/add.svg";
  cancelSearch.className = "cancel";
  top.appendChild(cancelSearch);
  searchInput.onkeyup = () => {
    const note = document.querySelectorAll(".note");
    const reg = searchInput.value;
    const regex = new RegExp(reg, "gi");
    for (let i = 0; i < note.length; i++)
      if (note[i].innerText.match(regex)) {
        note[i].style.display = "block";
      } else {
        note[i].style.display = "none";
      }
  };

  cancelSearch.onclick = () => {
    searchInput.remove();
    search.style.display = "unset";
    cancelSearch.remove();
    getLocalNotes();
  };
}

// Open Note
function openNote() {
  const topBtns = this.parentElement.children;
  for (let i = 0; i < topBtns.length; i++) {
    if (topBtns[i].classList.contains("hide")) {
      topBtns[i].classList.add("show");
      topBtns[i].classList.remove("hide");
    }
  }
  this.parentNode.style.height = "auto";
  this.style.display = "none";
  this.parentElement.children[2].style.float = "right";
}

//Close Note
function closeNote() {
  const topBtns = this.parentElement.children;
  for (let i = 0; i < topBtns.length; i++) {
    if (topBtns[i].classList.contains("show")) {
      topBtns[i].classList.add("hide");
      topBtns[i].classList.remove("show");
    }
  }
  this.parentElement.children[3].style.display = "unset";
  this.parentElement.children[3].style.float = "right";
}

//Delete Note
function deleteNote() {
  this.parentElement.remove();
  const notes = document.querySelector(".notes");
  localStorage.setItem("notes", notes.innerHTML);
  getLocalNotes();
}
//Edit Note
function editNote() {
  createArea.innerHTML = "";
  noterHome.style.display = "none";
  createArea.classList.add("createArea");
  createArea.style.backgroundColor = this.parentElement.style.backgroundColor;
  const colors = document.createElement("div");
  colors.classList.add("colors");
  createArea.appendChild(colors);
  const arr = ["blue", "green", "yellow", "red", "purple", "pink"];
  const mycolors = [
    "rgb(201, 234, 239)",
    "rgb(122, 243, 158)",
    "rgb(249, 226, 152)",
    "rgb(249, 180, 180)",
    "rgb(164, 156, 241)",
    "rgb(245, 153, 239)",
  ];
  for (let i = 0; i < arr.length; i++) {
    let color = document.createElement("div");
    color.classList.add("color", arr[i]);
    color.dataset.color = mycolors[i];
    if (this.parentElement.style.backgroundColor == color.dataset.color) {
      color.classList.add("selected");
    }
    colors.appendChild(color);
  }
  const title = document.createElement("textarea");
  title.classList.add("create-title");
  title.style.backgroundColor = this.parentElement.style.backgroundColor;
  title.innerText = this.parentElement.children[5].innerText;
  createArea.appendChild(title);

  const text = document.createElement("textarea");
  text.classList.add("create-text");
  text.style.backgroundColor = this.parentElement.style.backgroundColor;
  text.innerText = this.parentElement.children[6].innerText;
  createArea.appendChild(text);

  const bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottom-dev");

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.innerText = "Cancel";
  bottomDiv.appendChild(cancelBtn);
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("save-btn");
  saveBtn.innerText = "Save";
  bottomDiv.appendChild(saveBtn);
  createArea.appendChild(bottomDiv);
  //Event Listener for bg Colors
  const bgColors = document.querySelectorAll(".color");
  for (let i = 0; i < bgColors.length; i++) {
    bgColors[i].onclick = selectBg;
  }

  //event listerner for Save Notes
  saveBtn.onclick = saveNote;
  // Cancel Notes
  cancelBtn.onclick = cancelNote;
  this.parentElement.remove();
}
