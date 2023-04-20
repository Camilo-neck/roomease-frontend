import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/redux/thunks/user.thunk";

export const useUser = () => {
	const { user, setUser } = useContext(AuthContext);
	const dispatch = useDispatch();

	const addUser = (user_id: string, token: string) => {
		setUser(user_id, token);
		dispatch(fetchUserInfo(user_id, token));
	};

	return { user, addUser };
};
