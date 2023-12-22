import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@Component": fileURLToPath(
                new URL("./src/Component", import.meta.url)
            ),
            "@Container": fileURLToPath(
                new URL("./src/Container", import.meta.url)
            ),
            // "@UtilsComponent": fileURLToPath(
            //     new URL("./src/Component/Utils", import.meta.url)
            // ),
            // "@Style": fileURLToPath(new URL("./src/Style", import.meta.url)),
            // "@Hooks": fileURLToPath(new URL("./src/Hooks", import.meta.url)),
            // "@Models": fileURLToPath(new URL("./src/Models", import.meta.url)),
            // "@Views": fileURLToPath(new URL("./src/Views", import.meta.url)),
        },
    },
});
