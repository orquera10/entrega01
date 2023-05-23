
    const postButtons = document.getElementsByClassName(`postButton`);
    // console.log(postButton.dataset.pid);
    
    for (let i = 0; i < postButtons.length; i++) {
        const postButton = postButtons[i];
        postButton.addEventListener(`click`, function() {
            // Obtener el valor de pid
            const pid = postButton.dataset.pid; // Reemplaza 'pid' por la forma en que obtienes el valor de pid dinámicamente
            
            // Realizar la solicitud POST aquí
            const url = `http://localhost:8081/api/carts/646c03deaa61561076640b42/product/${pid}`;
            console.log(url);
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