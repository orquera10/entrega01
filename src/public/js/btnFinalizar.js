const btnFin = document.getElementById(`btnFin`);
const cart = document.getElementById(`cartId`);
const cid = cart.dataset.cid;


btnFin.addEventListener(`click`, function () {

    fetch(`/api/carts/${cid}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response);
        })
        .then(data => {
            console.log(data.data);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud POST:', error);
        });

});