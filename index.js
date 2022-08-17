const express = require('express');
const api = express();
const api2 = express();
const { createProxyMiddleware } = require('http-proxy-middleware')

const PORT = 5533;
const PORT_B = 5534;


api2.get('/api/v1/test', (req, res) => {
    res.json({
        ok: true,
        date: new Date(),
        path: req.path
    })
})

api.use('/api/v1', createProxyMiddleware({
    target: 'http://localhost:5534'
}))

api.use('/', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true
}))

api2.use((req, res) => {
    res.status(404).send('<h1>404 - Página não encontrada</h1>');
})

api.listen(PORT, () => console.log(`RUN IN PORT`, PORT))
api2.listen(PORT_B, () => console.log(`RUN IN PORT_B`, PORT_B))