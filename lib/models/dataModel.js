"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findById = exports.findAll = void 0;
const app_1 = require("../app");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let data;
let filePath = path_1.default.join(__dirname, "../", '../database.json');
fs_1.default.readFile(filePath, (err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        data = JSON.parse(result.toString());
    }
});
const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};
exports.findAll = findAll;
const findById = (id) => {
    return new Promise((resolve, reject) => {
        const org = data.find((o) => o.id === id);
        resolve(org);
    });
};
exports.findById = findById;
const create = (org) => {
    return new Promise((resolve, reject) => {
        const lastId = data[data.length - 1].id;
        console.log(lastId);
        if (lastId) {
            let newId = lastId + 1;
            const addOrg = { id: newId, ...org };
            data.push(addOrg);
            app_1.writeDataToFile(filePath, data);
            resolve(addOrg);
        }
    });
};
exports.create = create;
const update = (id, org) => {
    return new Promise((resolve, reject) => {
        const index = data.findIndex((p) => p.id === +id);
        data[index] = { ...data[index], ...org };
        console.log(id, index);
        app_1.writeDataToFile(filePath, data);
        resolve(data[index]);
    });
};
exports.update = update;
const remove = (id) => {
    return new Promise((resolve, reject) => {
        data = data.filter((org) => org.id !== id);
        app_1.writeDataToFile(filePath, data);
        resolve(data);
    });
};
exports.remove = remove;
