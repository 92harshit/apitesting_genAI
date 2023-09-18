//provide import statement for super test and chai
import { expect } from 'chai';
import supertest from 'supertest';

//create base url as 'https://gorest.co.in/public'
const baseUrl = 'https://gorest.co.in/public-api';
// addd it to supertest 
const request = supertest(baseUrl);
//create a const for token
const TOKEN = "f50191ac464584dec1068b370cc664dc9e4842e5287fe459bd7f89f4b682861b"

//create a describe block for users api testings
describe('Users API Testings', () => {
    //create a test case for get all users
    it('GET /users', ()  => {
        //return a get request to /users endpoint with token
        return request.get(`/users?access-token=${TOKEN}`).then((res) => {
            //expect status code to be 200
            expect(res.status).to.eq(200);
           // console.log(res.body);
            //expect data to be an array
            expect(res.body.data).to.be.an('array');
            //expect data array to have length greater than 0
            expect(res.body.data).to.have.length.greaterThan(0);
        });

    });

    //create a test case to get the user by id
    it('GET /users/id', () => {
    // return a get request to /users/:id endpoint with token
    return request.get(`/users/1?access-token=${TOKEN}`).then((res) => {
        ///log the response body
        console.log(res.body.data.id);
        //expect the id to equal 5156114
        expect(res.body.data.id).to.eq(5156114);
        //expect the name to equal 'he Hon. Sanya Prajapat'
        expect(res.body.data.name).to.eq('The Hon. Sanya Prajapat');
        });
    });

    //create a test case to filter the users by page number
    it('GET /users?page=2', () => {
        //return a get request to /users?page=2 endpoint with token
        return request.get(`/users?page=2&access-token=${TOKEN}`).then((res) => {
            //log the response body
            console.log(res.body.meta.pagination.page);
            //expect the page to equal 2
            expect(res.body.meta.pagination.page).to.eq(2);
        });
    });

    //create a test case to post the data to users api
    it.only('POST /users', () => {
        //return a post request to /users endpoint with token and body 
        //set token in the header and send data in the body
        const data = {}
        return request.post(`/users`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
            //log the response body
            console.log(res.body);
            //expect the status to be 201
            expect(res.body.code).to.eq(422);
            //expect the name to be 'The Hon. Sanya Prajapat'
            //expect(res.body.data.name).to.eq('The Hon. Sanya Prajapat');
        });
    });   
            
});

