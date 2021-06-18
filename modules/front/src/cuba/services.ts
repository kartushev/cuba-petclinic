import { CubaApp, FetchOptions } from "@cuba-platform/rest";

export var restServices = {
    petclinic_MockService: {
        getRandomString: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
            return cubaApp.invokeService("petclinic_MockService", "getRandomString", {}, fetchOpts);
        }
    }
};

