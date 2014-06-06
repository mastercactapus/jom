function fastSet(object, pathspec, value) {
	var props = pathspec.split(delim);


	if (typeof props[1] === "undefined") return object[props[0]] = value;
	if (typeof object[props[0]] !== "object") object[props[0]] = {};

	if (typeof props[2] === "undefined") return object[props[0]][props[1]] = value;
	if (typeof object[props[0]][props[1]] !== "object") object[props[0]][props[1]] = {};

	if (typeof props[3] === "undefined") return object[props[0]][props[1]][props[2]] = value;
	if (typeof object[props[0]][props[1]][props[2]] !== "object") object[props[0]][props[1]][props[2]] = {};

	if (typeof props[4] === "undefined") return object[props[0]][props[1]][props[2]][props[3]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]] !== "object") object[props[0]][props[1]][props[2]][props[3]] = {};

	if (typeof props[5] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]][props[4]] !== "object") object[props[0]][props[1]][props[2]][props[3]][props[4]] = {};

	if (typeof props[6] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]] !== "object") object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]] = {};

	if (typeof props[7] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]] !== "object") object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]] = {};

	if (typeof props[8] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]][props[7]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]][props[7]] !== "object") object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]][props[7]] = {};


}
