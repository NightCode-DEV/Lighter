const { run } = require('./run.js');

/*run(`
	do(define(total, 0),
		define(count, 1),
		while(<(count, 11),
			do(
				do(define(total, +(total, count)),
				  define(count, +(count, 1))
			  ),
			  print("Called")
			)
		),
		print(total, total),
		log(total, total)
	)
`);*/

/*run(`
	do(
		function(Hi, do(
			print("Hi v1"),
			print("Hi v2")
		)),
		call(Hi),
		call(Hi)
	)
`)*/

/*run(`
	do(
		require("./test.lighter")
	)
`)*/

run(`do(
    define(VeryUsefulVariable, 10),
    if(==(VeryUsefulVariable, 10),
    do(
        print(concat("Hi", "hello"))
    ),
    do(
        print("ALERT! 10 IS NOT EQUAL TO 10 :0")
    ))
)`);