"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./DI/Container");
const InitializationProcess_1 = require("./DI/InitializationProcess");
const InjectionProcess_1 = require("./DI/InjectionProcess");
const InstantiationProcess_1 = require("./DI/InstantiationProcess");
const ServiceManager_1 = require("./ServiceManager/ServiceManager");
function main() {
    let container = new Container_1.Container();
    // ---- DI ----
    let instantiation = new InstantiationProcess_1.InstantiationProcess();
    instantiation.Run(container);
    let injection = new InjectionProcess_1.InjectionProcess();
    injection.Run(container);
    // ---- INIT ----
    let initilization = new InitializationProcess_1.InitializationProcess();
    initilization.Run(container);
    // ---- RUN ----
    let serviceManager = container.Get(ServiceManager_1.ServiceManager.name);
    serviceManager.StartService();
}
main();
