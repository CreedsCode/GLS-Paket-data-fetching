import {
    ErrorMessage,
    Field,
    Form,
    Formik,
    FormikHelpers,
    FormikProps,
} from "formik";
import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BasicAuth } from "../utils/BasicAuth";

export interface Values {
    username: String;
    password: String;
}

export const Setup = () => {
    const navigate = useNavigate();

    const handleSubmit = (values: Values) => {
        const apiSecret = BasicAuth(values);

        localStorage.setItem("secret", apiSecret);
        navigate("/");
    };

    const validateUser = (values, props) => {
        let errors: any = {};

        if (!values.username) {
            errors.username = "Required";
        }

        if (!values.password) {
            errors.password = "Required";
        }
        // TODO: proper handling checks at the setup.
        //     if (values.username && values.password) {
        //         fetch("https://api.gls-group.eu/public/v1/tracking/references/", {
        //             method: "GET",
        //             headers: {
        //                 Authorization: `Basic ${BasicAuth(values)}`,
        //             },
        //         })
        //             .then((response) => {})
        //             .catch((err) => {
        //                 if (err.status === 401) {
        //                     errors = { username: "Wrong Creds" };
        //                     console.log("aasdasd");
        //                 }
        //             });
        //     }
        return errors;
    };

    return (
        <>
            <h1>Setup</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={handleSubmit}
                validate={validateUser}
            >
                <Form>
                    <label htmlFor="username">Username</label>
                    <Field id="username" name="username" />

                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" />

                    {localStorage.getItem("secret") ? (
                        <button type="submit">Update</button>
                    ) : (
                        <button type="submit">Save</button>
                    )}
                </Form>
            </Formik>
        </>
    );
};
