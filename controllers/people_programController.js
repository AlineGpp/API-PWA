const {addPeopleProgramDB,getPeopleProgramDB} = require('../useCases/people_programUseCase');

const getPeopleProgram = async (request,response) =>{
    await getPeopleProgramDB()
    .then(data => response.status(200).json(data))
    .catch (err => response.status(500).json(
        {
            status:'error', 
            message: 'Erro ao consultar a  People Program: ' + err
        }
    ));

}

const addPeopleProgram = async (request,response) => {
    await addPeopleProgramDB(request.body)
    .then(data => response.status(200).json({
        status:'success',
        message: 'People Program inserido com sucesso',
        objeto: data
    }))
    .catch (err => response.status(400).json({
        status:'error',
        message: 'Erro ao inserir People  Program: ' + err
        
    }))
}

module.exports = {
    getPeopleProgram,
    addPeopleProgram
}