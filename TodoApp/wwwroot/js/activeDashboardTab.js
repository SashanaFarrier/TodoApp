const sideBarNav = document.getElementById("sidebar-nav");
//Dashboard functionalities
function selectActiveTab() {
    
    const LIs = Array.from(sideBarNav.querySelectorAll("li"));

    LIs.forEach(li => li.classList.remove("active"));
    let pathname = window.location.pathname;

    switch (pathname) {
        case "/Dashboard":
            LIs[0].classList.add("active");
            break;
        case "/TaskList":
            LIs[1].classList.add("active");
            break;
        case "/ProjectOverview":
            LIs[2].classList.add("active");
            break;
        case "/Calendar":
            LIs[3].classList.add("active");
            break;
        case "/Identity/Account/Manage/PersonalData":
            LIs[4].classList.add("active");
            break;
        case "/Identity/Account/Manage/PersonalData?handler=Logout":
            LIs[5].classList.add("active");
    }
}

selectActiveTab();

