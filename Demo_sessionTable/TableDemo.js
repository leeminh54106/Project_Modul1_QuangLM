//B1: khai baos modal form
const modalForm = document.getElementById('jsModal');
//B2: khai báo và khởi tạo hàm chuyển đổi file về ảnh dùng onchange = "convertToBase64()";
const imageProductHTML = document.getElementById('imgProduct');
let imageBase64 = null;
//B3: Khởi tạo các giá trị Render
let textSearch = "";
let categoryFilter = "All";
//B4: Khởi tạo và khai báo dòng thông báo message
const alertInfoHTML = document.getElementById('alertInfo');
const alertMessageHTML = document.getElementById('alertMessage');
//B6: Khởi tạo luu lên local JSON
const PRODUCTS = "Product_04";
//B7: Lọc các sản phẩm  để hiển thị lên màn hình destop
//B1
// let pageSize = 5;
// let totalPage = 1;
// let currentPage = 1;
// //B9: Khởi tạo số thứ tự pagination
// const pageList = document.getElementById('page-list');
//B10:  Khởi tạo qua pageSize Sẽ sang trang
const tbodyHTML = document.getElementById('tbody');

//B17: khởi tạo 
let idUpdate = null;

//B1: Hiển thị và bật tắt form add product
function openForm() {
    modalForm.classList.remove('hidden');
}

function closeForm() {
    modalForm.classList.add('hidden');
}

//B2: nhập dữ liệu vào input -> gửi phương thức submid
function submitForm(e) {
    e.preventDefault();//hàm sự kiện load lại trang
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }

    values.price = +values.price;
    values.quantity = +values.quantity;
    values.image = imageBase64;//add convertToBase64 vào image imageBase64

    let check = validateFileds(values); //B5 thêm trường kiểm tra check 

    //B6: lưu lên local JSON
    if (check) {
        const products = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
        let id = 1;
        if (products.length > 0) {
            id = products[products.length - 1].id + 1;
        }
        values.id = id;
        values.status = true;
        products.push(values);
        localStorage.setItem(PRODUCTS, JSON.stringify(products));
        e.target.reset();
        imageProductHTML.src = "";
        imageBase64 = null;
        closeForm();
        render();
    }
}
render();

//B2: Nhập file ảnh chuyển đổi flie về ảnh dùng onchange="convertToBase64()
function convertToBase64() {
    const fileInput = document.getElementById('modalImg');
    const file = fileInput.files[0];
    const reader = new FileReader(); //đọc data của 1 hình ảnh
    reader.onload = function (e) {
        const base64 = e.target.result;
        imageBase64 = base64;
        imageProductHTML.src = imageBase64;
    }
    reader.readAsDataURL(file);
}


//B3
//B3 Hàm render lọc qua các giá trị product
function render() {
    let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];

    //lọc theo category
    if (categoryFilter !== 'All') {
        realProducts = realProducts.filter(product => product.category === categoryFilter);
    }
    //lọc theo search
    realProducts = realProducts.filter(product => product.name.toLowerCase().includes(textSearch));

    renderPagination(realProducts);
    renderProducts(realProducts);
}

//B4: Hiển thị thông báo messages
function showToast(message, color) {
    alertInfoHTML.classList.toggle('hidden');
    alertMessageHTML.innerHTML = message;
    if (color) {
        alertInfoHTML.style.backgroundColor = color;
    }
    const idTimeout = setTimeout(function () {
        alertInfoHTML.classList.toggle('hidden');
        alertMessageHTML.innerHTML = "";
        if (color) {
            alertInfoHTML.style.backgroundColor = "red";
        }
        clearTimeout(idTimeout);
    }, 2000);
};

//B5 trường kiểm tra xem nhập hợp lệ ko
function validateFileds(product) {
    let check = true;
    if (product.name.length < 4) {
        showToast('Độ dài của tên < 4');
        return false;
    }

    if (product.price <= 0) {
        showToast('Price <= 0');
        return false;
    }
    if (product.quantity <= 0) {
        showToast('Quantity <=0');
        return false;
    }

    if (product.description.length <= 10) {
        showToast('Description <= 10');
        return false;
    }

    return check;
}

//B8 Chuyển dổi price sang tiền việt 
function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

//B4
//B9 xem số page của trang quá page == 5
// function renderPagination(products) {

//     totalPage = Math.ceil(products.length / pageSize); //làm trên lên 
//     let stringHTML = ""
//     for (let i = 1; i <= totalPage; i++) {
//         if (currentPage === i) {
//             stringHTML += `
//             <p class="pagination-p pagination-active" onclick="clickPage(${i})">${i}</p>
//             `
//         }
//         else {
//             stringHTML += `
//             <p class="pagination-p " onclick="clickPage(${i})">${i}</p>
//             `
//         }
//     }
//     pageList.innerHTML = stringHTML;
// }


//B2
//B10 hiển thị sản phẩm sang trang
function renderProducts(products) {
    let stringHTML = ""
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > products.length) {
        end = products.length
    }
    for (let i = start; i < end; i++) {
        stringHTML +=
            `
                <tr>
                    <td class="table-th table-id">${products[i].id}</td>
                    <td class="table-th">
                        <img class = "table-imgs" src="${products[i].image}" alt="img">
                    </td>
                    <td class="table-th">${products[i].name}</td>
                    <td class="table-th">${formatMoney(products[i].price)}</td>
                    <td class="table-th">${products[i].quantity}</td>
                    <td class="table-th">${products[i].description}</td>
                    <td class="table-th">${products[i].category}</td>
                    <td class="table-th">
                    <button class="btn-active" onClick="changeStatus(${i})">${products[i].status ? `<div class="block-none">Block</div>` : `<div class="block-active">Active</div>`}</button>
                    </td>
                    <td class="table-th">
                        <button class= "icon-btn" onclick="updateProduct(${i})">
                            <i class="icon edit-icon fa-solid fa-file-pen"></i>
                        </button>
                        <button class="icon-btn" onclick="deleteProduct(${i})">
                            <i class="icon delete-icon fa-solid fa-trash-can"></i>   
                        </button>
                    </td>
                </tr>
            `
    }
    tbodyHTML.innerHTML = stringHTML;
}

//B11 nhảy trang khi click
function clickPage(i) {
    currentPage = i;
    render();
}

//B5
// //B12 nhấn trái phải nút button
// function changePage(status) {
//     if (status === -1 && currentPage > 1) {
//         currentPage -= 1;
//     }
//     if (status === 1 && currentPage < totalPage) {
//         currentPage += 1;
//     }
//     render();
// }



// //B13 tăng số lượng product của 1 trang
// function changePageSize(e) {
//     pageSize = e.target.value;
//     currentPage = 1;
//     render();
// }

// //B14 : thay đổi bộ lọc category
// function changeCategory(e) {
//     categoryFilter = e.target.value;
//     currentPage = 1;
//     render();
// }

//B15 ìm kiếm theo tên sản phẩm
function changeNameSearch(e) {
    textSearch = e.target.value.toLowerCase();
    currentPage = 1;
}

//B16 ẩn đi khỏi danh sách người dùng
function changeStatus(i) {
    const products = JSON.parse(localStorage.getItem(PRODUCTS));
    products[i].status = !products[i].status;
    localStorage.setItem(PRODUCTS, JSON.stringify(products));
    render();
}

//B17 Sửa 1 sản phẩm có trong danh sách
function updateProduct(id) {
    idUpdate = id;
}

//B18: xóa 1 sản phẩm có trong danh sách

function deleteProduct(id) {
    const products = JSON.parse(localStorage.getItem(PRODUCTS));
    products.splice(id, 1);
    localStorage.setItem(PRODUCTS, JSON.stringify(products));
    showToast('Đã xóa thành công', 'green');

    render();
}