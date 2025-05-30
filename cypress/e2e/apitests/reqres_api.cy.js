describe('ReqRes API Tests', () => {
    const baseUrl = 'https://reqres.in/api'

    beforeEach(function () {
        cy.fixture('testData.json').then((data) => {
            this.testData = data;
        });
    });

    it('should retrieve a list of users', () => {
        cy.getRequest(`${baseUrl}/users?page=2`, true).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array');
            expect(response.body.data.length).to.be.greaterThan(0);
        });
    });

    it('should perform a successful login', function () {
        cy.postRequest(`${baseUrl}/login`, this.testData.reqres.loginSuccess, true).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
        });
    });

    it('should update a user', function () {
        cy.putRequest(`${baseUrl}/users/2`, this.testData.reqres.updateUser, true).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'rasool');
            expect(response.body).to.have.property('job', 'qa engineer');
        });
    });

    it('should delete a user', () => {
        cy.deleteRequest(`${baseUrl}/users/2`, true).then((response) => {
            expect(response.status).to.eq(204);
        });
    });

    it('should fail login with missing password', function () {
        cy.postRequest(`${baseUrl}/login`, this.testData.reqres.loginMissingPassword, false).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.eq('Missing password');
        });
    });

    it('should handle non-existent user', () => {
        cy.getRequest(`${baseUrl}/users/23`, false).then((response) => {
            expect(response.status).to.equal(404)
        })
    });

    it('should handle a delayed response and measure duration', () => {
        const start = Date.now();
        cy.getRequest(`${baseUrl}/users?delay=3`, true).then((response) => {
            const duration = Date.now() - start;
            expect(response.status).to.eq(200);
            expect(duration).to.be.gte(3000);
            expect(duration).to.be.lt(4000);
        });
    });
}); 