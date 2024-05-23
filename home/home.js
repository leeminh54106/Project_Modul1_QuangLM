//Khởi tạo account admin và check xem trong database có tài khoản admin chưa
function find() {
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    //Khởi tạo account admin có các trường...
    let admin = {
      id: 1,
      name: "admin",
      email: "admin@gmail.com",
      password: "admin",
      role: "admin",
      status: true,
    };
    //tạo mảng chứa account
    let admins = [];
    //push account vào mảng
    admins.push(admin);
    // console.log(userList.findIndex(item=>item.email === email.value));
    //tìm vị trí account trong mảng
    let userIdIndex = userList.findIndex((item) => item.email === admin.email);
    if (userIdIndex < 0) {
      //trường hợp không có account trong database thì push account admin lên database
      localStorage.setItem("userList", JSON.stringify(admins));
    } else {
      //không làm j vì đã có tài khoản
    }
  }
  find();
  
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click',() =>{
  localStorage.removeItem("userLogin");
} )



