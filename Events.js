/*process.on('exit', (code) => {
	console.log(`[Program exited with code: ${code}]`);
});*/

process.on('uncaughtException', (a) => {
	//console.log(`[ ERROR ] There was an exception in internal code. Please send it to developers as qucik as possible!\n\nError code:\n\n${a.stack}`);
});

process.on('unhandledRejection', (reason, promise) => {
	//console.log('Unhandled Rejection at:', promise, 'reason:', reason);
	// Application specific logging, throwing an error, or other logic here
});
