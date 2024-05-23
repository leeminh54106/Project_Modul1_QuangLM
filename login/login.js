
// B1:

const modal = document.querySelector('#modalContent');
// const btnRegister = document.querySelector('#btnRegister');
// const btnClose = document.querySelector('#modalClose');
const showPass = document.querySelector('#show-password');

const email = document.querySelector('#email');
const password = document.querySelector('#password');


// let USER_LOGIN = 'userList';

// btnRegister.addEventListener('click', function (e) {
//     window.location.href = "register.html";
// });

// btnClose.addEventListener('click', function (e) {
//     window.location.href = "home.html";
// });

showPass.addEventListener('click', () => {
    if (showPass.classList.contains("fa-eye")) {
        showPass.classList.remove("fa-eye");
        showPass.classList.add("fa-eye-slash");
        password.setAttribute("type", "text");
    } else {
        showPass.classList.remove("fa-eye-slash");
        showPass.classList.add("fa-eye");
        password.setAttribute("type", "password");
    }
});


function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.add("error");
    small.textContent = message;
};

modal.addEventListener('submit', (e) => {
    e.preventDefault();
    let list = JSON.parse(localStorage.getItem('userList'));
    let check = false;
    for (let i = 0; i < list.length; i++) {
        if (list[i].email === email.value && list[i].password === password.value && list[i].role == "admin") {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng nhập thành công",
                text: "Chào mừng bạn đến với Trang quản trị Canifa",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                check = true;
                localStorage.setItem("adminLogin", JSON.stringify(list[i]))
                window.location.href = "http://127.0.0.1:5502/admin/admincategory/admincategory.html"
            });
            return;
        } else if (list[i].email === email.value && list[i].password === password.value && list[i].role == "user") {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng nhập thành công",
                text: "Chào mừng bạn đến với Trang quản trị Canifa",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                // 
                check = true
                localStorage.setItem("userLogin", JSON.stringify(list[i]))
                window.location.href = "http://127.0.0.1:5502/home/home.html"
            });
            return;
        }
    }
    if (!check) {
        Swal.fire({
            icon: "error",
            title: "Mật khẩu hoặc email không đúng",
            text: "Xin vui lòng nhập lại",
        });
    }
});



// const objUser = {
//     email: email.value,
//     password: password.value,
//     status:true,
// };



// //fix cứng user admin
// if (objUser.email === "admin@gmail.com" && objUser.password === "admin") {
//     Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Đăng nhập thành công",
//         text: "Chào mừng bạn đến với Trang quản trị Canifa",
//         showConfirmButton: false,
//         timer: 1500,
//     }).then(() => (window.location.href = "/Admin/Admin.html"));
//     return;
// }

// if (!findUser) {
//     showError(email, "Email hoặc mật khẩu không đúng");
//     showError(password, "Email hoặc mật khẩu không đúng");
//     Swal.fire({
//         title: "Error!",
//         text: "Đăng Nhập thất bại !!!",
//         icon: "error",
//         confirmButtonText: "Cancel",
//     });
//     return;
// } else {
//     localStorage.setItem(USER_LOGIN, JSON.stringify(findUser));
//     Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Đăng nhập thành công",
//         text: "Chào mừng bạn đến với ptfitness",
//         showConfirmButton: false,
//         timer: 1500,
//     }).then(() => (window.location.href = "http://127.0.0.1:5502/home/home.html"));
// }
