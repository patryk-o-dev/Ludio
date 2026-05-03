export const getData = async (modelName: string) => {
	try {
		const res = await fetch(`http://localhost:3000/api/${modelName}`).then(
			(response) => response.json(),
		);
		if (res) {
			return res;
		} else {
			console.error(`No ${modelName} found`);
			return [];
		}
	} catch (err) {
		console.error(`Error fetching ${modelName}:`, err);
		return [];
	}
};
