const sub_btn = document.querySelector('.sub-btn')
sub_btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    console.log(`Username : ${username}, Password: ${password}`)

    const data = {
        username: username,
        password: password
    }

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network error!');
        }

        const responseData = await response.json();
        const token = responseData.jwt
        const authority = responseData.user.authorities[0].authority

        console.log(authority)

        if (token.length == 0 || authority != 'USER') {
            const warning = document.querySelector('.error-message')
            if (warning != null) {
                return
            }
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Password is incorrect";
            errorMessage.style.color = "red";
            errorMessage.className = 'error-message'

            const loginContainer = document.querySelector(".login-container");
            loginContainer.appendChild(errorMessage);
        } else {
            const warning = document.querySelector('.error-message')
            if (warning != null) {
                warning.remove()
            }

            localStorage.setItem('token', responseData.jwt);
            console.log(`Token: ${token}`)

            window.location.href = './index.html'
        }

        localStorage.setItem('token', responseData.jwt);
        localStorage.setItem('userId', responseData.user.userId);

        // Redirect to exam


    } catch (error) {
        console.error('Error:', error);
    }

    window.location.href = 'index.html';
})