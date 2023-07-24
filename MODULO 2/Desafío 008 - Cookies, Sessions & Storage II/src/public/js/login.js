const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email-input');
const loginPasswordInput = document.getElementById('login-password-input');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dataToSend = {
        email: loginEmailInput.value,
        password: loginPasswordInput.value
    };

    try {
        const response = await fetch('http://localhost:8080/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });
        
        if(response.ok){
            loginForm.reset();
            window.location.href = "http://localhost:8080/sessions/profile";
        }else if(response.status === 401){
            loginForm.reset();
            alert("Email o contraseña incorrectos");
        } else {
            alert(`Error: ${response.status}`)
        };
        
    }catch(error){
        alert(error);
    };
});
