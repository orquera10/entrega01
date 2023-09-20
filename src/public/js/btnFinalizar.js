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
                html: `<!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <title>Detalles del Ticket</title>
                            <style>
                                table {
                                    border-collapse: collapse;
                                    width: 90%;
                                    margin: 0 auto;
                                }

                                th, td {
                                    border: 1px solid black;
                                    padding: 8px;
                                    text-align: left;
                                }
                            </style>
                        </head>
                        <body>

                        <h1>Detalles del Ticket</h1>

                        <table>
                            <tr>
                                <th>ID del Ticket</th>
                                <td id="ticketId">${datos.ticket._id}</td>
                            </tr>
                            <tr>
                                <th>Código</th>
                                <td id="ticketCode">${datos.ticket.code}</td>
                            </tr>
                            <tr>
                                <th>Cantidad</th>
                                <td id="ticketAmount">${datos.ticket.amount}</td>
                            </tr>
                            <tr>
                                <th>Comprador</th>
                                <td id="ticketPurchaser">${datos.ticket.purchaser}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Compra</th>
                                <td id="ticketPurchaseDatetime">${datos.ticket.purchase_datetime}</td>
                            </tr>
                        </table>
                        </body>
                        </html>
                        `
                // title: "¡Ticket generado con éxito!",
                // text: `Ticket id: ${datos.ticket._id} generado exitosamente`,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/cart';
                }
            });
        })
        .catch(error => {
            console.error('Error al realizar la solicitud POST:', error);
        });

});