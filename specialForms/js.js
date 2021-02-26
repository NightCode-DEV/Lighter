function define(specialForms, evaluate) {
    specialForms.js = async(args, scope) => {
        console.log(args.slice(1).value);
        eval(args[0].value);
    };
}

module.exports = define;