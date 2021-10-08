const getSearchVideos = (filteredVideos, searchInput) => {
	return filteredVideos.filter(
		(video) =>
			video.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
	);
};
export default getSearchVideos;
