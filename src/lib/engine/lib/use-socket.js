"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

export default function useSocket(states = []){
	const [data,setData] = useState({});

	useEffect(() => {
		socket.on("client", (dataIn) =>{
            setData(dataIn)
        });
		return () => {
			socket.off("id");
			socket.off("players");
			socket.off("client");
		};
	}, states);

	return {
        id:socket.id,
		emit(){
			return socket.emit(...arguments);
		},
		data,
	};
}
