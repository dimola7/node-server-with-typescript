"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDataToFile = void 0;
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let data;
let filePath = path_1.default.join(__dirname, "../", './database.json');
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
const findById = (id) => {
    return new Promise((resolve, reject) => {
        const org = data.find((o) => o.id === id);
        resolve(org);
    });
};
const create = (org) => {
    return new Promise((resolve, reject) => {
        const lastId = data[data.length - 1].id;
        console.log(lastId);
        if (lastId) {
            let newId = lastId + 1;
            const addOrg = { id: newId, ...org };
            data.push(addOrg);
            writeDataToFile(filePath, data);
            resolve(addOrg);
        }
    });
};
const update = (id, org) => {
    return new Promise((resolve, reject) => {
        const index = data.findIndex((p) => p.id === +id);
        data[index] = { ...data[index], ...org, updatedAt: new Date() };
        console.log(id, index);
        writeDataToFile(filePath, data);
        resolve(data[index]);
    });
};
const remove = (id) => {
    return new Promise((resolve, reject) => {
        data = data.filter((org) => org.id !== id);
        writeDataToFile(filePath, data);
        resolve(data);
    });
};
const writeDataToFile = (filename, content) => {
    fs_1.default.writeFileSync(filename, JSON.stringify(content), "utf8");
};
exports.writeDataToFile = writeDataToFile;
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
/*verb request functions*/
//get all organisations
const getOrgs = async (req, res) => {
    try {
        const orgs = await findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(orgs));
    }
    catch (error) {
        console.log(error);
    }
};
// get single organisation
const getOrg = async (req, res, id) => {
    try {
        const org = await findById(id);
        if (!org) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Organisation not found" }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(org));
        }
    }
    catch (error) {
        console.log(error);
    }
};
//add an organisations
const addOrg = async (req, res) => {
    let postDate = new Date();
    try {
        const body = await getPostData(req);
        if (typeof body === "string") {
            const { organization, createdAt, updatedAt, products, marketValue, address, ceo, country, noOfEmployees, employees, } = JSON.parse(body);
            const org = {
                organization,
                createdAt: postDate,
                updatedAt,
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees,
            };
            const newOrg = await create(org);
            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(newOrg));
        }
    }
    catch (error) {
        console.log(error);
    }
};
//update an organisations
const updateOrg = async (req, res, id) => {
    // let updateDate = new Date();
    try {
        const org = await findById(id);
        const body = await getPostData(req);
        if (!org) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Organisation not found" }));
        }
        else if (typeof body === "string") {
            const orgData = JSON.parse(body);
            const updatedOrg = await update(id, orgData);
            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updatedOrg));
        }
    }
    catch (error) {
        console.log(error);
    }
};
// delete organisation
const deleteOrg = async (req, res, id) => {
    try {
        const org = await findById(id);
        if (!org) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Organisation not found" }));
        }
        else {
            await remove(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `The organisation ${id} removed` }));
        }
    }
    catch (error) {
        console.log(error);
    }
};
//server urls
const server = http_1.default.createServer((req, res) => {
    if (req.url === "/api/orgs" && req.method === "GET") {
        getOrgs(req, res);
    }
    else if (req.url && req.url.match(/\/api\/orgs\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[3];
        getOrg(req, res, +id);
    }
    else if (req.url === "/api/orgs" && req.method === "POST") {
        addOrg(req, res);
    }
    else if (req.url && req.url.match(/\/api\/orgs\/([0-9]+)/) && req.method === "PUT") {
        const id = req.url.split("/")[3];
        updateOrg(req, res, +id);
    }
    else if (req.url && req.url.match(/\/api\/orgs\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split("/")[3];
        deleteOrg(req, res, +id);
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "route not found" }));
    }
});
const port = process.env.PORT || 3005;
server.listen(port, () => console.log(`Server Running on ${port}`));
