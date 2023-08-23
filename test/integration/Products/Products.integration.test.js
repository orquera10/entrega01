import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Testing de productos', () => {
    let cookie;
    before(async () => {
        const credentialsMock = {
            email: 'orquera10@gmail.com',
            password: '1234'
        };

        const loginResult = await requester.post('/api/users/login').send(credentialsMock);
        const cookieResult = loginResult.headers['set-cookie'][0];

        expect(cookieResult).to.be.ok;

        const cookieResultSplit = cookieResult.split('=');

        cookie = {
            name: cookieResultSplit[0],
            value: cookieResultSplit[1]
        };
    });

    it('POST de /api/products debe crear un producto correctamentte', async () => {
        const productMock = {
            title: "producto prueba dario",
            description: "Este es un producto de prueba",
            price: 200,
            code: "abc13386889485",
            category: "food",
            stock: 25
        };
        
        const { statusCode, _body } = await requester.post('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]).send(productMock);
        expect(statusCode).to.be.eql(200);
        expect(_body.data).to.have.property('_id');
    });

    it('POST de /api/products se debe corroborrar que el producto tenga el campo owner', async () => {
        const productMock = {
            title: "producto prueba dario",
            description: "Este es un producto de prueba",
            price: 200,
            code: "abc13386885",
            category: "food",
            stock: 25
        };

        const { statusCode, _body } = await requester.post('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]).send(productMock);

        expect(statusCode).to.be.eql(200);
        expect(_body.data).to.have.property('owner');
    });

    it('GET de /api/products se debe corroborrar que la respuesta tiene el campo data, además data debe ser un arreglo', async () => {
        const { statusCode, _body } = await requester.get('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('data');
        expect(Array.isArray(_body.data)).to.be.eql(true);
    });

    it('PUT de /api/products se debe corroborrar que se actualice correctamente la información del producto', async () => {
        const productMock = {
            title: "producto prueba dario",
            description: "Este es un producto de prueba",
            price: 200,
            code: "abc133868896385",
            category: "food",
            stock: 25
        };

        const { _body } = await requester.post('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]).send(productMock);

        const id = _body.data._id;

        const productUp = {
            title: "producto prueba dario2",
            description: "Este es un producto de prueba",
            price: 200,
            category: "food",
            stock: 25
        };

        const putResult = await requester.put(`/api/products/${id}`).set('Cookie', [`${cookie.name}=${cookie.value}`]).send(productUp);

        expect(putResult.statusCode).to.be.eql(200);
    });
});