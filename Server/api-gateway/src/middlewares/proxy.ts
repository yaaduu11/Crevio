import { createProxyMiddleware } from "http-proxy-middleware";
import { services } from "../config/services";
import { Express } from "express-serve-static-core";

export function setupProxies(app:Express) {
    services.forEach((service)=>{
        app.use(
            service.route,
            createProxyMiddleware({
                target:service.target,
                changeOrigin: true
            })
        )
    })
}