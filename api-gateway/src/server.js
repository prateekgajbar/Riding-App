cat > src/server.js << 'EOF'
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const {
  createProxyMiddleware
} = require("http-proxy-middleware");

const app = express();

app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    service: "api-gateway",
    status: "UP"
  });
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true
  })
);

app.use(
  "/api/users",
  createProxyMiddleware({
    target: process.env.USER_SERVICE,
    changeOrigin: true
  })
);

app.use(
  "/api/drivers",
  createProxyMiddleware({
    target: process.env.DRIVER_SERVICE,
    changeOrigin: true
  })
);

app.use(
  "/api/rides",
  createProxyMiddleware({
    target: process.env.RIDE_SERVICE,
    changeOrigin: true
  })
);

app.use(
  "/api/payments",
  createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE,
    changeOrigin: true
  })
);

app.use(
  "/api/location",
  createProxyMiddleware({
    target: process.env.LOCATION_SERVICE,
    changeOrigin: true
  })
);

app.use(
  "/api/notifications",
  createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE,
    changeOrigin: true
  })
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `API Gateway running on ${PORT}`
  );
});
EOF
