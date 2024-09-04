document.getElementById("a").addEventListener("click", function(event){
    event.preventDefault()
});
document.getElementById("b").addEventListener("click", function(event){
    event.preventDefault()
});
function toggleSidebar() {
    if (sideBar.style.width === "200px") {
        closeSidebar();
    } else {
        sideBar.style.width = "200px";
        openButton.style.backgroundColor = "#0d3160";
    }
}

function closeSidebar() {
        sideBar.style.width = "0";
        subSideBar1.style.display = "none";
        subSideBar2.style.display = "none";
        a.innerHTML = "&#9656;Chức Năng";
        b.innerHTML = "&#9656;Tài Khoản";
        openButton.style.backgroundColor = "#2f3c7e";
}

function togglesubSideBar1() {
    var subSideBar1 = document.getElementById("subSideBar1");
    var a = document.getElementById("a");

    if (subSideBar1.style.display === "block") {
        subSideBar1.style.display = "none";
        a.innerHTML = "&#9656;Chức Năng";
    } else {
        subSideBar1.style.display = "block";
        a.innerHTML = "&#9662;Chức Năng";
    }
}

function togglesubSideBar2() {
    var subSideBar2 = document.getElementById("subSideBar2");
    var b = document.getElementById("b");

    if (subSideBar2.style.display === "block") {
        subSideBar2.style.display = "none";
        b.innerHTML = "&#9656;Tài Khoản";
    } else {
        subSideBar2.style.display = "block";
        b.innerHTML = "&#9662;Tài Khoản";
    }
}