import { Values } from "../pages/Setup";

export function BasicAuth(values: Values) {
    return JSON.stringify(
        Buffer.from(values.username + ":" + values.password).toString("base64")
    );
}
