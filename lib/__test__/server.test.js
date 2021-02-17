"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
let app = require('../app.ts');
const request = supertest_1.default(app);
describe('checking GET requests', () => {
    describe('GET/', () => {
        it('should return all data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/data');
            expect(res.status).toBe(200);
        }));
        it('should return single data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/data/1993c68f-c638-45e1-a999-12c218003d0a');
            expect(res.status).toBe(200);
        }));
    });
});
describe('checking WRONG GET requests', () => {
    describe('GET/', () => {
        it('should return RESPONSE 404 FOR all data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/dat');
            expect(res.status).toBe(404);
        }));
        it('should return RESPONSE 404 FOR single data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/d');
            expect(res.status).toBe(404);
        }));
    });
});
describe('Put to Endpoints', () => {
    it('should create a post', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .put('/api/data/561a5a09-c985-4a12-8906-aa1a67d95bb8')
            .send({
            "organization": "PWC",
            "marketValue": 80,
            "address": "ikotun",
            "ceo": "clever hilton",
            "country": "canada",
        });
        expect(res.status).toEqual(200);
    }));
});
describe('DELETE: update task (id)', () => {
    it('It should return response 200. after deleting data', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete('/api/data/26560477-3e5a-482c-adb9-441ed673a432')
            .expect(200);
        console.log("message: ", res.body);
    }));
});
describe('Post to Endpoints', () => {
    it('should create a post', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/api/data')
            .send({
            "organization": "PWC",
            "products": [
                "developers",
                "UI/design"
            ],
            "marketValue": 80,
            "address": "ikotun",
            "ceo": "clever eziogor",
            "country": "toronto",
            "employees": [
                "james bond",
                "clever-hilton"
            ],
        });
        expect(res.status).toEqual(201);
        done();
    }));
    it('should not create a post, return response 404', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/api/123')
            .send({
            "organization": "PWC",
            "products": [
                "developers",
                "UI/design"
            ],
            "marketValue": 80,
            "address": "ikotun",
            "ceo": "clever eziogor",
            "country": "toronto",
            "employees": [
                "james bond",
                "clever-hilton"
            ],
        });
        expect(res.status).toEqual(404);
        done();
    }));
});
//# sourceMappingURL=server.test.js.map