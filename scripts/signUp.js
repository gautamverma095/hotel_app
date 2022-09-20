let signUp = () => {
  console.log("yes");
  let data = JSON.parse(localStorage.getItem("users")) || [];

  let user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  for (let i = 0; i < data.length; i++) {
    if (data[i].email === user.email) {
      
      alert("User already exists!");
      return;
    }
  }

  data.push(user);
  localStorage.setItem("users", JSON.stringify(data));
  alert("Sign Up successfull!");
};
