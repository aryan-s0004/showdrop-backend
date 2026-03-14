export default {
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      "/auth": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/movies": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/bookings": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
};
