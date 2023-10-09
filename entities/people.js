class People {
    constructor(id, name, sex, adress, complement, district, zip_code , 
        telephone, celular,  e_mail, profession, login, password,address, city) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.adress = adress;
        this.complement = complement;
        this.district = district;
        this.zip_code = zip_code;
        this.telephone = telephone;
        this.celular = celular;
        this.e_mail = e_mail;
        this.profession = profession;
        this.login = login;
        this.password = password;
        this.city = city;
        this.address = address;
    }
}

module.exports = People;