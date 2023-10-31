class Program {
    constructor (id, description,address){
        this.id = id;
        this.description = description;
        this.address = address;
    }
}

module.exports = Program;

///SELECT id, description, alert, "fullDescription", address, image
	//FROM public.program;