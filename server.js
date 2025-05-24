/*
    rustyrace is a game server for mco
    Copyright (C) 2025 Molly Crendraven

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import http from "node:http"
import net from "node:net"

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
