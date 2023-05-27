import Pusher from "pusher-js";

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
	cluster: "us2",
	forceTLS: true,
	channelAuthorization: {
		endpoint: process.env.NEXT_PUBLIC_API_URL + "/pusher/auth",
		transport: "ajax",
	},
});
