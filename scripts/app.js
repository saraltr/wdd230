const year = document.querySelector("#currentyear");

try {
	const options = {
		year: "numeric"
	};
	year.innerHTML = `${new Date().toLocaleDateString("en-US", options)}</span>`;
} catch (e) {
	console.log("Error with code or your browser does not support Locale");
}

const date = document.querySelector("#currentdate");

try {
	const options = {
		month: "2-digit",
		day: "2-digit",
		year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
	};
	date.innerHTML = `${new Date().toLocaleDateString("en-US", options)}</span>`;
} catch (e) {
	console.log("Error with code or your browser does not support Locale");
}

