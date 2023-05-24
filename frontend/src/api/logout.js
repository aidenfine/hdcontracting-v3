const Logout=() => {
    window.localStorage.clear();
    window.localStorage.setItem("isLoggedIn", "false");
    window.localStorage.href="/"

}
export default Logout;
