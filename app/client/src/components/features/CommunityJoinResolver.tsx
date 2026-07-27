import { useSearchParams, useNavigate } from "react-router-dom";
import { getStoredAuthUser } from "../utils/authStorage";
import { useEffect } from "react";
import { withAuth } from "../utils/api";

const API = import.meta.env.VITE_API_URL;

const CommunityJoinResolver = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const authUser = getStoredAuthUser();
	const communityIdLink = searchParams.get("join");
	const communityIdLocalStorage = localStorage.getItem("communityId");
	const failedJoinCommunity = localStorage.getItem("failedJoinCommunity");

	useEffect(() => {
		if (communityIdLink || communityIdLocalStorage) {
			if (failedJoinCommunity) {
				return;
			}
			if (!authUser) {
				if (communityIdLink && !communityIdLocalStorage) {
					localStorage.setItem("failedJoinCommunity", "true");
					localStorage.setItem("communityId", communityIdLink);
					navigate("/");
				} else if (communityIdLocalStorage) {
					localStorage.setItem("failedJoinCommunity", "true");
					navigate("/");
				}
			} else {
				const communityId = communityIdLink || communityIdLocalStorage;
				fetch(
					`${API}/community/${communityId}/join`,
					withAuth({
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					}),
				)
					.then((response) => {
						if (!response.ok) {
							throw new Error("Failed to join community");
						}
						return response.json();
					})
					.then(() => {
						localStorage.removeItem("communityId");
						navigate("/");
					})
					.catch((error) => {
						console.error(error);
						localStorage.removeItem("communityId");
						navigate("/");
					});
			}
		}
	}, [
		communityIdLink,
		communityIdLocalStorage,
		authUser,
		failedJoinCommunity,
		navigate,
	]);

	return <></>;
};

export default CommunityJoinResolver;
