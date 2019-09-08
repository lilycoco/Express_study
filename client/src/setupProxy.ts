import proxy from 'http-proxy-middleware'

export default function(app: any) {
    app.use(proxy(
        ['/api', '/auth/google'], 
        { target: 'http://localhost:5000' }
    ));
}
