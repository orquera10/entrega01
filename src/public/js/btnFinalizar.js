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
            const datos = data.data;
            Swal.fire({
                icon: 'success',
                title: "¡Ticket generado con éxito!",
                text: `Ticket id: ${datos.ticket._id} generado exitosamente`,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/cart';
                }
            });
            console.log(datos);
            // setTimeout(() => { window.location.replace(`/cart`); }, 2500)
        })
        .catch(error => {
            console.error('Error al realizar la solicitud POST:', error);
        });

});