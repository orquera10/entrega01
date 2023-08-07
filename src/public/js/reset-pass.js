const form = document.getElementById('resetForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/products');
        } else{
            Swal.fire({
                icon: 'error',
                timer: 3000,
                title: "¡Error!",
                text: "Email o Password incorrectos",
            });
            setTimeout(()=>{window.location.replace('/login');},2000)
        }
    });
})