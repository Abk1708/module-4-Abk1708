import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorPage from "./errorPage.tsx";
import {
    ProductContainer,
    RegisterContainer,
    CategoryContainer,
    AdderContainer,
    EditorContainer,
} from "@/Container";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <ProductContainer />,
            },
            {
                path: "/registerContainer",
                element: <RegisterContainer />,
            },
            {
                path: "/categoryContainer",
                element: <CategoryContainer />,
            },
            {
                path: "/adderContainer",
                element: <AdderContainer />,
            },
            {
                path: "/editorContainer/:id",
                element: <EditorContainer />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
