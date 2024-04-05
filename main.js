const appDiv = document.querySelector("#app");
const accountForm = appDiv.querySelector("#account-form");
const contentsContainer = appDiv.querySelector("#contents-container");

const getUserName = () => {
    return localStorage.getItem("user_name");
}
const saveUserName = (userName) => {
    if (userName) {
        localStorage.setItem("user_name", userName);
    }
};

accountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userName = appDiv.querySelector("#user-name").value;
    saveUserName(userName);
    updateContentsContainer(userName);
    showContentsContainer();
});

const showAccountForm = () => {
    if (accountForm.classList.contains("hidden")) {
        accountForm.classList.remove("hidden");
    }
    if (!contentsContainer.classList.contains("hidden")) {
        contentsContainer.classList.add("hidden");
    }
};

const showContentsContainer = () => {
    if (!accountForm.classList.contains("hidden")) {
        accountForm.classList.add("hidden");
    }
    if (contentsContainer.classList.contains("hidden")) {
        contentsContainer.classList.remove("hidden");
    }
};

//initialize
const body = document.body;
const wishSayingH4 = document.querySelector("#wish-saying");
const randomBackground = Math.floor(Math.random() * imageArray.length);
body.style.backgroundImage = `url(${imageArray[randomBackground].image})`;
wishSayingH4.innerText = imageArray[randomBackground].wiseSaying;

const clockH1 = contentsContainer.querySelector("#clock");
const welcomMessageH3 = contentsContainer.querySelector("#welcome-message");
const updateContentsContainer = (userName) => {
    welcomMessageH3.innerText = `Welcome ${userName}!`;
    setInterval(updateClock, 1000);
    updateClock();
};
const updateClock = () => {
    const now = new Date();
    clockH1.innerText = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
};
const userName = getUserName();
if (userName) {
    updateContentsContainer(userName);
    showContentsContainer();
} else {
    showAccountForm();
}
