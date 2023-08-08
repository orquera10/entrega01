const form = document.getElementById('resetForm');
const dataToken = document.getElementById(`token`);
const token = dataToken.dataset.token;

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    const newPassword = {password: obj.password , token};

    fetch('/api/users/reset-password', {
        method: 'POST',
        body: JSON.stringify(newPassword),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/login');
        } else{
            Swal.fire({
                icon: 'error',
                timer: 3000,
                title: "¡Error!",
                text: "Token expiro",
            });
            setTimeout(()=>{window.location.replace('/login');},2000)
        }
    });
})