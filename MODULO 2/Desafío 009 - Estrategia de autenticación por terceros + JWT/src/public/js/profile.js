const logout = document.getElementById('logout-btn');

logout.addEventListener('click', () => {
    window.location.href = "http://localhost:8080/api/sessions/logout";
    window.location.href = "http://localhost:8080/profile";
});
