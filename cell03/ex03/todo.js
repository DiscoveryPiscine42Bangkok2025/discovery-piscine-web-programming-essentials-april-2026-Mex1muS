function saveData() {
  const listItems = [];
  const lis = document.querySelectorAll("#myUL li");

  lis.forEach(li => {
    listItems.push({
      text: li.childNodes[0].nodeValue,
      checked: li.classList.contains("checked")
    });
  });

  // Save to localStorage instead of cookies
  localStorage.setItem("todoList", JSON.stringify(listItems));
}

function loadList() {
  const saved = localStorage.getItem("todoList");
  const ul = document.getElementById("myUL");

  if (saved) {
    ul.innerHTML = ""; 
    const items = JSON.parse(saved);

    items.forEach(item => {
      const li = document.createElement("li"); 
      li.textContent = item.text;

      if (item.checked) {
        li.classList.add("checked");
      }

      addCloseButton(li);
      ul.appendChild(li);
    });
  } else {
    const defaultItems = document.querySelectorAll("#myUL li");
    defaultItems.forEach(li => {
        addCloseButton(li);
    });
    saveData();
  }
}

function addCloseButton(li) {
  const span = document.createElement("span");
  span.textContent = "\u00D7";
  span.className = "close";

  span.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    saveData();
  };

  li.appendChild(span);
}

document.querySelector("#myUL").addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
    saveData();
  }
});

function newElement() {
  const input = document.getElementById("myInput");
  const value = input.value.trim();

  if (value === "") {
    alert("You must write something!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = value;

  addCloseButton(li);

  document.getElementById("myUL").appendChild(li);
  input.value = "";

  saveData();
}

loadList();
<<<<<<< HEAD
=======

>>>>>>> 73cf69237ba33f84fe70a44ed72a4255be18097b
