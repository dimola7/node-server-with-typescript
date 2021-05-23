"use strict";
// import { IncomingMessage, ServerResponse } from "http";
// import * as Org from "../models/dataModel";
// import { getPostData } from "../utils";
// export interface Organisation {
//     organization: string,
//     createdAt: string,
//     updatedAt: string,
//     products: string[],
//     marketValue: string,
//     address: string,
//     ceo: string,
//     country: string,
//     id?: number,
//     noOfEmployees: number,
//     employees: string[],
// }
// //get all organisations
// export const getOrgs = async (req: IncomingMessage, res: ServerResponse) => {
//     try {
//         const orgs = await Org.findAll();
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(orgs));
//     } catch (error) {
//         console.log(error);
//     }
// };
// // get single organisation
// export const getOrg = async (req: IncomingMessage, res: ServerResponse, id: number) => {
//     try {
//         const org = await Org.findById(id);
//         if (!org) {
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ message: "Organisation not found" }));
//         } else {
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify(org));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
// //add an organisations
// export const addOrg = async (req: IncomingMessage, res: ServerResponse) => {
//     try {
//         const body = await getPostData(req);
//         if (typeof body === "string") {
//             const {
//                 organization,
//                 createdAt,
//                 updatedAt,
//                 products,
//                 marketValue,
//                 address,
//                 ceo,
//                 country,
//                 noOfEmployees,
//                 employees,
//             } = JSON.parse(body);
//             const org: Organisation = {
//                 organization,
//                 createdAt,
//                 updatedAt,
//                 products,
//                 marketValue,
//                 address,
//                 ceo,
//                 country,
//                 noOfEmployees,
//                 employees,
//             };
//             const newOrg = await Org.create(org);
//             // console.log(newOrg, "new org");
//             res.writeHead(201, { "Content-Type": "application/json" });
//             return res.end(JSON.stringify(newOrg));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
// //update an organisations
// export const updateOrg = async (req: IncomingMessage, res: ServerResponse, id: number) => {
//     try {
//         const org = await Org.findById(id);
//         const body = await getPostData(req);
//         if (!org) {
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ message: "Organisation not found" }));
//         } else if (typeof body === "string") {
//             const orgData = JSON.parse(body);
//             const updatedOrg = await Org.update(id, orgData);
//             res.writeHead(201, { "Content-Type": "application/json" });
//             return res.end(JSON.stringify(updatedOrg));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
// // delete organisation
// export const deleteOrg = async (req: IncomingMessage, res: ServerResponse, id: number) => {
//     try {
//         const org = await Org.findById(id);
//         if (!org) {
//             res.writeHead(404, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ message: "Organisation not found" }));
//         } else {
//             await Org.remove(id)
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ message: `The organisation ${id} removed` }));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
