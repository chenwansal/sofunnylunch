import { Container } from "./DI/Container";
import { InitializationProcess } from "./DI/InitializationProcess";
import { InjectionProcess } from "./DI/InjectionProcess";
import { InstantiationProcess } from "./DI/InstantiationProcess";
import { ServiceManager } from "./ServiceManager/ServiceManager";

function main() {

    let container: Container = new Container();

    // ---- DI ----
    let instantiation: InstantiationProcess = new InstantiationProcess();
    instantiation.Run(container);

    let injection: InjectionProcess = new InjectionProcess();
    injection.Run(container);

    // ---- INIT ----
    let initilization: InitializationProcess = new InitializationProcess();
    initilization.Run(container);

    // ---- RUN ----
    let serviceManager: ServiceManager = container.Get(ServiceManager.name);
    serviceManager.StartService();

}

main();