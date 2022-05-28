const addUserbtn = document.querySelector("#addUserbtn");
const doubleMoneybtn = document.querySelector("#doubleMoneybtn");
const showMillionairesbtn = document.querySelector("#showMillionairesbtn");
const sortRichestbtn = document.querySelector("#sortRichestbtn");
const clacWealthbtn = document.querySelector("#clacWealthbtn");

const displayPerson = document.querySelector(".displayPerson");
const diplayWealth = document.querySelector(".diplayWealth");
const display = document.querySelector(".displayData");

const displayUser = document.querySelector(".displayUser");
// console.log(displayUser);

let users = [];

// const fatchUsers = fetch("https://randomuser.me/api");
// // console.log(fatchUsers);
// fatchUsers
//   .then((respons) => {
//     return respons.json();
//   })
//   .then((data) => {
//     // console.log(data.results[0].name.first, data.results[0].name.last);
//     return data.results[0].name.first, data.results[0].name.last;
//   });

// randome "wealth" generator
const randomWealth = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// currency formating function
//formatted z number to currency
// found on stackoverflow "https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings" (there are alternatives on z same page)
const currencyFormater = () => {
  const currFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return currFormatter;
};

// fetch the promise of the data (gets first and last name from the API)
const ftchUserNames = async () => {
  const respons = await fetch("https://randomuser.me/api");
  const jsonUserData = await respons.json();
  //   console.log(
  //     jsonUserData.results[0].name.first,
  //     jsonUserData.results[0].name.last
  //   );
  return (
    jsonUserData.results[0].name.first + " " + jsonUserData.results[0].name.last
  );
};

// prints out the name on the displayPerson column
const addUser = async () => {
  const NAME = await ftchUserNames();
  //   console.log(NAME);
  users.push([NAME, randomWealth(100000, 10000000)]);
};

// print to the DOM function
let printAll = () => {
  // clear all the previous displayed user data, so it doesnt repeat in the DOM
  displayUser.innerHTML = "";

  // use forEach to print out to the DOM
  users.forEach((user) => {
    // gets the user name
    const newPerson = document.createElement("span");
    newPerson.textContent = user[0];

    // gets the wealth amount form randome function above
    const pesonalWealth = document.createElement("span");
    pesonalWealth.textContent = currencyFormater().format(user[1]);

    // creat a new DIV element to append the SPAN elements
    const newLineData = document.createElement("div");
    displayUser.appendChild(newLineData);
    newLineData.appendChild(newPerson);
    newLineData.appendChild(pesonalWealth);
  });
};

// print and make an array of ppl and wealth (Add User btn)
addUserbtn.addEventListener("click", async () => {
  await addUser();
  printAll();
  //   console.log(users);
});

// print double of the wealth with map()
doubleMoneybtn.addEventListener("click", () => {
  //   console.log(users);
  users = users.map((user) => [user[0], user[1] * 2]);
  //   console.log(users);
  printAll();
});

// sort by richest using sort()
sortRichestbtn.addEventListener("click", () => {
  // console.log(users);
  // used this article https://www.codingem.com/javascript-sort-an-array-of-arrays/
  users = users.sort((a, b) => {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  });
  printAll();
});

// show only people with > $5000000 wealth using filter()
showMillionairesbtn.addEventListener("click", () => {
  // console.log(users);
  users = users.filter((user) => user[1] > 5000000);
  printAll();
});

// calculate entire wealth on the page
clacWealthbtn.addEventListener("click", () => {
  // console.log(users);
  let totalWealth = users.reduce((accum, currentV) => {
    return accum + currentV[1];
  }, 0);
  console.log(totalWealth);

  const ttlwealthTxt = document.createElement("span");
  ttlwealthTxt.textContent = "Total Wealth: ";

  const ttlwealthValue = document.createElement("span");
  ttlwealthValue.textContent = currencyFormater().format(totalWealth);

  const ttlWealth = document.createElement("div");
  displayUser.appendChild(ttlWealth);
  ttlWealth.appendChild(ttlwealthTxt);
  ttlWealth.appendChild(ttlwealthValue);
  ttlWealth.classList.add("totalWealth");
  // ttlWealth.style.padding = "0.3rem 0 0.3rem 0";
  // ttlWealth.style.margin = "0.5rem 0 0 0";
  // ttlWealth.style.backgroundColor = "#fbf7f5";
  // ttlWealth.style.borderBottom = "0.1rem solid #aaa";
});
