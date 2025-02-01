import { createProxyMiddleware } from "http-proxy-middleware";
import { services } from "../config/services";

export function setupProxies(app:any) {
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