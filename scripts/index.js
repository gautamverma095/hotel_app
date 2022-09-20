const url = "https://masai-api.herokuapp.com/hotels/search?city=";

let data = [];

let getData = async (query) => {
  let res = await fetch(`${url}${query}`);
   data = await res.json();
  return data.hotels;
};

let search = async () => {
  let query = document.getElementById("query").value;

  data = await getData(query);

  append(data);
};

let enter = (e) => {
  if (e.key === "Enter") {
    search();
  }
};

let append = (data) => {
  let cont = document.getElementById("hotels-list");
  let empty = document.getElementById("text");
  empty.innerHTML = null;
  cont.innerHTML = null;
  data.forEach((el) => {
    let {
      Title,
      Images: { one },
      Price,
      Rating,
      Ac,
    } = el;
    let div = document.createElement("div");
    div.setAttribute("class", "hotel");
    let img = document.createElement("img");
    img.src = one;
    let h3 = document.createElement("h3");
    h3.innerText = Title;
    let price = document.createElement("p");
    price.innerText = `Price per room: Rs. ${Price}`;
    let rating = document.createElement("p");
    rating.innerText = `Rating: ${Rating}`;
    let ac = document.createElement("p");
    ac.innerText = `AC: ${Ac}`;

    let button = document.createElement("button");
    button.setAttribute("class", "book");
    button.innerText = "BOOK NOW";
    button.onclick = () => {
      book(el);
    };

    div.append(img, h3, price, ac, rating, button);
    cont.append(div);
  });
};

let sortLTH = () => {
  data = data.sort((a, b) => {
    return a.Price - b.Price;
  });

  append(data);
};

let sortHTL = () => {
  data = data.sort((a, b) => {
    return b.Price - a.Price;
  });

  append(data);
};

let filterAC = () => {
  let newData = data.filter((el) => {
    return el.Ac === true;
  });
  append(newData);
};

let filterNonAC = () => {
  let newData = data.filter((el) => {
    return el.Ac === false;
  });

  append(newData);
};

let book = (el) => {
  let login = JSON.parse(localStorage.getItem("login")); //true
  if (!login) {
    alert("Log In to continue!");
  } else {
    localStorage.setItem("hotel", JSON.stringify(el));
    window.location.href = "/checkout.html";
  }
};
