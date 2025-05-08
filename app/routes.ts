import { type RouteConfig, index } from "@react-router/dev/routes";

// This ensures compatibility with both development and production
export default [index("routes/home.tsx")] as RouteConfig;
