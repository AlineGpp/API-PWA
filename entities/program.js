class Program {
    constructor (id, description, alert, fulldescription, address, image){
        this.id = id;
        this.description = description;
        this.alert = alert;
        this.fulldescription = fulldescription;
        this.address = address;
        this.image = image;
    }
}

module.exports = Program;

///SELECT id, description, alert, "fullDescription", address, image
	//FROM public.program;