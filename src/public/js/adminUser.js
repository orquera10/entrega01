const roleButtons = document.getElementsByClassName(`roleButton`);
const deleteButtons = document.getElementsByClassName(`deleteButton`);


for (let i = 0; i < roleButtons.length; i++) {
    const roleButton = roleButtons[i];
    const deleteButton = deleteButtons[i];
    // Obtener el valor de uid
    const uid = roleButton.dataset.uid; // Reemplaza 'pid' por la forma en que obtienes el valor de pid dinámicamente

    roleButton.addEventListener(`click`, function () {

        // Realizar la solicitud POST aquí
        const url = `/api/users/premium/${uid}`;
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
                        text: "Se cambio el role del usuario",
                    })
                    setTimeout(() => { window.location.replace('/admin-users'); }, 2000)
                } else {
                    console.error('Error al realizar la solicitud POST');
                    Swal.fire({
                        icon: 'error',
                        title: "¡Error!",
                        text: "El usuario no cumple los requisitos para cambiar de role",
                    })
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud POST:', error);
            });
    });

    deleteButton.addEventListener(`click`, function () {

        // Obtener el valor de pid
        const uid = roleButton.dataset.uid; // Reemplaza 'pid' por la forma en que obtienes el valor de pid dinámicamente

        // Realizar la solicitud POST aquí
        const url = `/api/users/delete-user/${uid}`;
        fetch(url, {
            method: 'DELETE',
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
                        text: "El usuario fue eliminado",
                    })
                    setTimeout(() => { window.location.replace('/admin-users'); }, 2000)
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