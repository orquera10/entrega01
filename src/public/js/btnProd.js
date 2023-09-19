
    const postButtons = document.getElementsByClassName(`postButton`);
    const cartUser = document.getElementById('tarjetaUser');
    const btnCarrito = document.getElementById('btnCarrito');
    //Obtener id carrito
    const cid = cartUser.dataset.cid;
    btnCarrito.addEventListener(`click`, function() {
        window.location.replace('http://localhost:8081/cart');
    })

    
    for (let i = 0; i < postButtons.length; i++) {
        const postButton = postButtons[i];
        postButton.addEventListener(`click`, function() {
            
            // Obtener el valor de pid
            const pid = postButton.dataset.pid; // Reemplaza 'pid' por la forma en que obtienes el valor de pid dinámicamente
            
            // Realizar la solicitud POST aquí
            const url = `http://localhost:8081/api/carts/${cid}/product/${pid}`;
            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(response => {
            if (response.ok) {
                console.log('Solicitud POST exitosa');
                Swal.fire({
                    icon: 'success',
                    title: "¡Éxito!",
                    text: "El producto se agrego correctamente al carrito.",
                })
            } else {
                console.error('Error al realizar la solicitud POST');
                Swal.fire({
                    icon: 'error',
                    title: "¡Error!",
                    text: "Se produjo un error en la operación.",
                })
            }
            })
            .catch(error => {
            console.error('Error al realizar la solicitud POST:', error);
            });
        });
};