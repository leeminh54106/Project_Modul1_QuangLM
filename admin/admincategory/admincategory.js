

const btnAdd = document.getElementById("btn-add")
const form = document.getElementById("form-scope")
const categoryName = document.getElementById('name')
const errorName = document.getElementById("error-name")
const btnCancel = document.getElementById("btn-cancel")
const btnSubmit = document.getElementById("btn-submit")
const tableCategory = document.getElementById("tbody")

let idUpdate = null;

const CATEGORY_LOCAL = "categorys";

btnAdd.addEventListener('click', function () {
    form.classList.remove('hidden')
})

btnCancel.addEventListener("click", function () {
    categoryName.value = '';
    errorName.innerHTML = '';
    btnSubmit.innerText = "Add";
    idUpdate = null;
    form.classList.add("hidden");
})
function submitForm(event) {
    event.preventDefault();
    if (idUpdate) {
        const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
        if (categoryName.value.length < 2) {
            errorName.innerText = `Lỗi`;
            return;
        } else {
            errorName.innerText = ``;
        }

        const index = categorys.findIndex(item => item.name === categoryName.value)
        if (index !== -1) {
            errorName.innerText = "Name bị trùng";
            return
        }
        else {
            errorName.innerText = "";
        }
        const indexUpdate = categorys.findIndex(item => item.id === idUpdate)
        categorys[indexUpdate].name = categoryName.value;
        localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))

        btnCancel.click()

        idUpdate = null;
        render()



        return
    }
    else {
        errorName.innerText = "";
    }

    let id = 1;
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
    if (categorys.length > 0) {
        id = categorys[categorys.length - 1].id + 1
    }
    if (categoryName.value.length < 2) {
        errorName.innerText = `Lỗi`;
        return;
    } else {
        errorName.innerText = ``;
    }

    const index = categorys.findIndex(item => item.name === categoryName.value)
    if (index !== -1) {
        errorName.innerText = "Name bị trùng";
        return
    }
    else {
        errorName.innerText = "";
    }
    const category = {
        id,
        name: categoryName.value,
        status: true,

    }

    categorys.push(category)

    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))


    categoryName.value = "";

    form.classList.add("hidden")

    render();

}

function render(data) {
    let categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL));
    if (Array.isArray(data)) { //kiểm tra xem nó có phải mảng hay không
        categorys = data
    }

    let stringHTML = ``;

    for (let i = 0; i < categorys.length; i++) {
        stringHTML += `<tr>
        <td>${i + 1}</td>
        <td>${categorys[i].name}</td>
        <td>${categorys[i].status ? "Active" : "Block"}</td>
        <td>
        <button onclick="initUpdate(${categorys[i].id})">Update</button>
        <button onclick="changeStatus(${categorys[i].id})">${categorys[i].status ? "Block" : "Active"}</button>
        <button onclick="deleteCategorys(${categorys[i].id})">Delete</button>
        
        </td>
        </tr>
        `}
    tableCategory.innerHTML = stringHTML;
}
render();


function deleteCategorys(id) {

    const result = confirm(`Are you sure delete id:${id}`)
    if (!result) {
        return;
    }
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id);

    categorys.splice(index, 1)
    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys));

    render();
}


function initUpdate(id) {
    idUpdate = id;
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id)

    categoryName.value = categorys[index].name;
    form.classList.remove("hidden")
    btnSubmit.innerText = "Update";
}

function changeStatus(id) {
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id)

    categorys[index].status = !categorys[index].status

    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))

    render();
}

let logoutAdmin = document.getElementById('logoutAdmin');
logoutAdmin.addEventListener('click', () =>{
    localStorage.removeItem("adminLogin");
})