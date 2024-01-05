import React from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
    status?: number;
    statusText?: string;
    message?: string;
}

const ErrorPage: React.FC = () => {
    const error = useRouteError() as RouteError | undefined;

    console.error(error);

    return (
        <div id="error-page">
            <h1>404</h1>
            <p>{error?.statusText || error?.message}</p>
        </div>
    );
};

export default ErrorPage;
