import http from "node:http"
import net, { Server, Socket } from "node:net"

function handleSocketError(serverName) {
    return (error) => {
        if (error instanceof Error) {
            console.error(`There was an error in ${serverName}: ${error.message}`)
            return;
        }
        throw new Error(`Unknon socket error: ${String(error)}`)
    }
}

function onListen(serverName, port) {
    return function onListen() {
        console.log(`[${serverName}] server listening on port ${port}`)
    }
}

(function main() {
    const HTTP_PORT = 3000;
    const TCP_PORT = 8226;

    console.log("Hello, world!")

    const httpServer = http.createServer()

    const tcpServer = net.createServer()

    httpServer.on("error", handleSocketError("httpServer"))

    tcpServer.on("error", handleSocketError("tcpServer"))

    httpServer.listen(HTTP_PORT, onListen("httpServer", HTTP_PORT))

    tcpServer.listen(TCP_PORT, onListen("tcpServer", TCP_PORT))
})()
