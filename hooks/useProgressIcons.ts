import { Trick } from "../types/Trick";

const useProgressIcons = () => {
	return {
		"not started": require("../assets/images/new.png"),
		attempted: require("../assets/images/flash.png"),
		trying: require("../assets/images/cone.png"),
		landed: require("../assets/images/bomb.png"),
		"on lock": require("../assets/images/trophy.png"),
	} as { [key in Trick["progress"]]: any };
};

export default useProgressIcons;
