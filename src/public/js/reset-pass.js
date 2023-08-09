const form = document.getElementById('resetForm');
const dataToken = document.getElementById(`token`);
const token = dataToken.dataset.token;

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    const newPassword = { password: obj.password, token };

    fetch('/api/users/reset-password', {
        method: 'POST',
        body: JSON.stringify(newPassword),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            Swal.fire({
                icon: 'success',
                title: "¡Éxito!",
                text: "Tu contraseña se actualizo",
            })
            setTimeout(() => { window.location.replace('/login'); }, 2000)
        } else if (result.status === 400) {
            Swal.fire({
                icon: 'error',
                timer: 3000,
                title: "¡Error!",
                text: "Ingresa una contraseña diferente a la anterior",
            });
        } else {
            Swal.fire({
                icon: 'error',
                timer: 3000,
                title: "¡Error!",
                text: "Token no valido",
            });
            setTimeout(() => { window.location.replace('/link-password'); }, 2000)
        }
    });
})