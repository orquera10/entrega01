const socket = io();
const form = document.getElementById(`form`);
const container = document.getElementById(`container`);


socket.on(`showProducts`, data =>{
    console.log(data);
    container.innerHTML = ``;
        data.forEach(prod=>{
        container.innerHTML += `
            <ul>
                <li>id: ${prod.id}</li>
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
            </ul>
        `
    })
})