const form = document.getElementById('linkForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/users/password-link', {
        method: 'POST',
        body: JSON.stringify(obj),
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
                text: "Email no encontrado",
            });
        }
    });
})