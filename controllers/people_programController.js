const {addPeopleProgramDB,getPeopleProgramDB,deletePeopleProgramDB,getPeopleProgramCodigoDB} = require('../useCases/peopleProgramUseCase');

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

//update não precisa 
// const updatePeopleProgram = async (request,response) => {
//     await updatePeopleProgramDB(request.body)
//     .then(data => response.status(200).json({
//         status:'success',
//         message: 'People Program atualizado com sucesso',
//         objeto: data
//     }))
//     .catch (err => response.status(400).json({
//         status:'error',
//         message: 'Erro ao atualizar People Program: ' + err
        
//     }))
// }

const deletePeopleProgram = async (request,response) => {
    await deletePeopleProgramDB(parseInt(request.params.idPeo),parseInt(request.params.idPro))
    .then(data => response.status(200).json({
        status:'success',
        message: 'People Program removido com sucesso',
        objeto: data
    }))
    .catch (err => response.status(400).json({
        status:'error',
        message: 'Erro ao remover People Program: ' + err
        
    }))
}

const getPeopleProgramCodigo = async (request,response) =>{
    await getPeopleProgramCodigoDB(parseInt(request.params.idPeo),parseInt(request.params.idPro))
    .then(data => response.status(200).json(data))
    .catch (err => response.status(500).json(
        {
            status:'error', 
            message: 'Erro ao consultar a  People Program: ' + err
        }
    ));

}


module.exports = {
    getPeopleProgram,
    addPeopleProgram,
    deletePeopleProgram,
    getPeopleProgramCodigo
}