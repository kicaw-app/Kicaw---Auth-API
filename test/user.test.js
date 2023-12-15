import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";
import {createTestUser, getTestUser, removeTestUser} from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'test',
                username: 'test',
                email: 'test@example.com',
                password: 'secretnumber'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.email).toBe("test@example.com");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: '',
                email: '',
                password: ''
            });
     
        logger.info(result.body);    
    
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'test',
                username: 'test',
                email: 'test@example.com',
                password: 'secretnumber'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.email).toBe("test@example.com");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'test',
                username: 'test',
                email: 'test@example.com',
                password: 'secretnumber'
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'secretnumber'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                email: "",
                password: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                email: "test@example.com",
                password: "wrong"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if email is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                email: "wrong@example.com",
                password: "secretnumber"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'wrong');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PATCH /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'Isna',
                password: 'newjeans',
            });
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('Isna');

        const user = await getTestUser();
        expect(await bcrypt.compare("newjeans", user.password)).toBe(true);
      });

      it('should can update user name', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
              name: 'Isna',
            });
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Isna");
        expect(result.body.data.username).toBe("test");
      });

        it('should can update user password', async () => {
            const result = await supertest(web)
                .patch('/api/users/current')
                .set('Authorization', 'test')
                .send({
                    password: 'newjeans',
                });
                expect(result.status).toBe(200);
                expect(result.body.data.username).toBe("test");

                const user = await getTestUser();
                expect(await bcrypt.compare("newjeans", user.password)).toBe(true);
                });

        it('should reject if request is not valid', async () => {
            const result = await supertest(web)
                .patch("/api/users/current")
                .set("Authorization", "wrong")
                .send({});
    
            expect(result.status).toBe(401);
        });
});

describe('DELETE /api/users/logout', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    it('should reject logout if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'wrong');

        expect(result.status).toBe(401);
    });
});