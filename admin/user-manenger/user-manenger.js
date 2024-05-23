let sortName = document.getElementById('sortName');
let btnSearch = document.getElementById('btn-search');
let sortDirection = "aes";
let textSearch = ""
//phân trang
const pageList = document.getElementById('page-list');
const formTable = document.getElementById('tbody');
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;


function render() {
    let users = JSON.parse(localStorage.getItem('userList')) || [];
    //
    users = users.filter(item => item.name.toLowerCase().includes(textSearch));
    users = users.sort((a, b) => {
        if (sortDirection === "aes") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    })
    renderPagination(users);
    renderUsers(users);
};
render();

function renderUsers(users) {
    let stringHTML = ``;
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > users.length) {
        end = users.length;
    }
    for (let i = start; i < end; i++) {
        if (users[i].email === "admin@gmail.com") {
            stringHTML +=
                `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${users[i].name}</td>
                    <td>${users[i].email}</td>
                    <td>${users[i].status}</td>
                    <td>blockaddmin</td>
                    </tr>
                `;
        }
        else {
            stringHTML +=
                `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${users[i].name}</td>
                    <td>${users[i].email}</td>
                    <td>${users[i].status}</td>
                    <td> <button onclick = 'status(${users[i].id})'>${users[i].status ? 'active' : 'block'}</button></td>
                    </tr>
                `;
        }
        formTable.innerHTML = stringHTML;
    }
}


function renderPagination(users) {

    totalPage = Math.ceil(users.length / pageSize); // làm tròn lên VD:3,0004 -> 4
    let stringHTML = ``;
    for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
            stringHTML +=
                ` 
                    <p class="pagination-p pagination-active" onclick="clickPage(${i})">${i}</p>
                `
        }
        else {
            stringHTML +=
                `
                <p class="pagination-p " onclick="clickPage(${i})">${i}</p>
            `
        }
    }
    pageList.innerHTML = stringHTML;
}

function clickPage(i) {
    currentPage = i;
    render()
}

function changePage(status) {
    if (status === -1 && currentPage > 1) {
        currentPage -= 1;
    }
    if (status === 1 && currentPage < totalPage) {
        currentPage += 1;
    }
    render();
}

function changePageSize(e) {
    pageSize = e.target.value;
    currentPage = 1;
    render();
}




// function render() {
//     let formTable = document.getElementById('tbody');
//     let userList = JSON.parse(localStorage.getItem('userList')) || [];

//     userList = userList.filter(item => item.name.toLowerCase().includes(textSearch.toLowerCase()))

//     userList = userList.sort((a, b) => {
//         if (sortDirection === "aes") {
//             return a.name.localeCompare(b.name)
//         } else {
//             return b.name.localeCompare(a.name)
//         }
//     })

//     formTable.innerHTML = '';
//     for (let i = 0; i < userList.length; i++) {
//         if (userList[i].email == "admin@gmail.com") {
//             let tr =
//                 `
//                     <tr>
//                     <td>${i + 1}</td>
//                     <td>${userList[i].name}</td>
//                     <td>${userList[i].email}</td>
//                     <td>${userList[i].status}</td>
//                     <td>blockaddmin</td>
//                     </tr>
//                 `;
//             formTable.innerHTML += tr;
//         }
//         else {
//             let tr =
//                 `
//                     <tr>
//                     <td>${i + 1}</td>
//                     <td>${userList[i].name}</td>
//                     <td>${userList[i].email}</td>
//                     <td>${userList[i].status}</td>
//                     <td> <button onclick = 'status(${userList[i].id})'>${userList[i].status ? 'active' : 'block'}</button></td>
//                     </tr>
//                 `;
//             formTable.innerHTML += tr;
//         }
//     }
// }
// render();

// function status(id) {
//     let userList = JSON.parse(localStorage.getItem('userList')) || [];
//     // id => i
//     let i = userList.findIndex(el => el.id === id);

//     userList[i].status = !userList[i].status;
//     localStorage.setItem('userList', JSON.stringify(userList));
//     render();
// }

//select
sortName.addEventListener('change', () => {
    let small = document.getElementById('sortName').value;
    sortDirection = small
    render();
})

//seach

btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    textSearch = document.getElementById('text-search').value;
    currentPage = 1;
    // const userList = JSON.parse(localStorage.getItem('userList'));
    // const sortDirection = userList.filter(item => item.name.toLowerCase().includes(textSearch));
    // render(sortDirection)
    render()
})






