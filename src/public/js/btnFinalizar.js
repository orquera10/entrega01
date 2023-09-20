const btnFin = document.getElementById(`btnFin`);
const cart = document.getElementById(`cartId`);
const btnDel = document.getElementById(`btnBorrar`);
const cid = cart.dataset.cid;

btnDel.addEventListener('click', function () {
    fetch(`/api/carts/${cid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log('Solicitud POST exitosa');
            Swal.fire({
                icon: 'error',
                timer: 3000,
                title: "¡Borrar!",
                text: "Carrito Borrado",
            });
            setTimeout(() => { window.location.replace('/cart'); }, 2000)
            return response.json();
        }
    })
})

btnFin.addEventListener(`click`, function () {
    

    fetch(`/api/carts/${cid}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Solicitud POST exitosa');
                return response.json();
            }
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: "¡Éxito!",
                text: `Ticket ${data.data.ticket._id} generado exitosamente`,
            })
            console.log(data.data);
            setTimeout(() => { window.location.replace(`/cart`); }, 2500)
        })
        .catch(error => {
            console.error('Error al realizar la solicitud POST:', error);
        });

});