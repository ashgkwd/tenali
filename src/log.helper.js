module.exports = function LogHelper(level, label, message) {
	switch(level) {
		case 'e': console.error(label, message); break;
		case 'w': console.warn(label, message); break;
		case 'i': console.info(label, message); break;
		case 'd': console.debug(label, message); break;
		default: console.log(label, message);
	}
}
