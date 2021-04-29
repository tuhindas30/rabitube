import videosDB from "../videosDB";
import "../assests/css/videolisting.css";
import VideoListItem from "./VideoListItem";
import SaveVideoModal from "./SaveVideoModal";
import { useModal } from "../contexts/ModalProvider";
import { useSearch } from "../contexts/SearchProvider";
import { useState } from "react";
import getSearchVideos from "../utils/getSearchVideos";

const VideoListing = ({ category }) => {
	const [modalData, setModalData] = useState({
		v_id: "",
		avatar: "",
		title: "",
		views: "",
		channel: "",
		postedOn: "",
	});

	const { isModalVisible, setModalVisibility } = useModal();
	const { searchInput } = useSearch();

	const filterVideos = () => {
		if (category !== undefined)
			return videosDB.filter((item) => item.category === category);
		return videosDB;
	};

	const filteredVideos = filterVideos();

	const searchedVideos = getSearchVideos(filteredVideos, searchInput);

	console.log({ searchedVideos });

	const handleOptionClick = (videoObj) => {
		setModalData(videoObj);
		setModalVisibility("show");
	};

	return (
		<div className="list--video">
			{isModalVisible === "show" && <SaveVideoModal {...modalData} />}

			{searchedVideos.map(
				({ v_id, avatar, title, views, channel, postedOn }) => (
					<VideoListItem
						key={v_id}
						v_id={v_id}
						avatar={avatar}
						title={title}
						views={views}
						channel={channel}
						postedOn={postedOn}
						onOptionClick={handleOptionClick}
					/>
				)
			)}
		</div>
	);
};
export default VideoListing;
