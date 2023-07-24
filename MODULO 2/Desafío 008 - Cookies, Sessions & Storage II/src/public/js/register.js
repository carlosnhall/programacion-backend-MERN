const registerForm = document.getElementById('register-form');
const firstNameInput = document.getElementById('first_name-input');
const lastNameInput = document.getElementById('last_name-input');
const emailInput = document.getElementById('email-input');
const ageInput = document.getElementById('age-input');
const passwordInput = document.getElementById('password-input');


registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dataToSend = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
        age: ageInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch('http://localhost:8080/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });
        
        if(response.ok){
            registerForm.reset();
            window.location.href = "http://localhost:8080/sessions/login";
        }else{
            registerForm.reset();
            alert('Error en la solicitud');
        };
    }catch(error){
        alert(error);
    };
});
