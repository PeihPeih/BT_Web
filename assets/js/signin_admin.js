const sub_btn = document.querySelector('.sub-btn')
sub_btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const username = document.querySelector('#username_admin').value
    const password = document.querySelector('#password_admin').value

    console.log(`Username : ${username}, Password: ${password}`)

    const data = {
        username: username,
        password: password
    }   

    console.log(data)
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
        console.log('Success:', responseData);

        localStorage.setItem('token', responseData.jwt);

        // Redirect to exam


    } catch (error) {
        console.error('Error:', error);
    }
})