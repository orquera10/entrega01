const socket = io();
const form = document.getElementById(`form`);
const container = document.getElementById(`container`);


socket.on(`showProducts`, data =>{
    container.innerHTML = ``;
        data.forEach(prod=>{
        container.innerHTML += `
            <div class="card col-4 m-4" style="width: 18rem;">
            <div class="card-body text-center">
                <h4 class="card-subtitle mb-2 text-body-secondary">ID: ${prod.id}</h4>
                <h5 class="card-title">${prod.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Category: ${prod.category}</h6>
                <p class="card-text m-1">Description: ${prod.description}</p>
                <p class="card-text m-1">Code: ${prod.code}</p>
                <p class="card-text font-weight-bold m-1">Price: ${prod.price}</p>
                <p class="card-text m-1">Stock: ${prod.stock}</p>
                <p class="card-text m-1">Satus: ${prod.status}</p>
            </div>
        `
    })
})