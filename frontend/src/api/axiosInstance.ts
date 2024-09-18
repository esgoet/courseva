import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
    async function (config) {
        if (config.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(config.method.toUpperCase())) {
            try {
                const csrfResponse = await axios.get("/api/auth/csrf");
                config.headers["X-CSRF-TOKEN"] = csrfResponse.data.token;
            } catch (error) {
                console.error("Failed to fetch CSRF token:", error);
                return Promise.reject(error);
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;