const { getPeoplesDB, addPeopleDB, updatePeopleDB, deletePeopleDB, getPeoplePorCodigoDB } = require('../useCases/peopleUseCase');

const getPeoples = async (request, response) => {
    await getPeoplesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as pessoas: ' + err
        }));
}

const addPeople = async (request, response) => {
    await addPeopleDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Pessoa criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updatePeople = async (request, response) => {
    await updatePeopleDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Pessoa alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deletePeople = async (request, response) => {
    await deletePeopleDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getPeoplePorID = async (request, response) => {
    await getPeoplePorCodigoDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getPeoples, addPeople, updatePeople, deletePeople, getPeoplePorID
}

