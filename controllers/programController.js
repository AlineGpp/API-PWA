const {addProgramDB,deleteProgramDB,getProgramForIdDB,getProgramsDB,updateProgramDB} = require('../useCases/programUseCase');

const getProgram = async (request,response) => {
    await getProgramsDB()
        .then(data => response.status(200).json(data))
        .catch (err => response.status(500).json(
            {
                status:'error', 
                message: 'Erro ao consultar as Program: ' + err
            }
        ));
        
}

const addProgram = async (request,response) => {
    await addProgramDB(request.body)
        .then(data => response.status(200).json({
            status:'success',
            message: 'Program inserido com sucesso',
            objeto: data
        }))
        .catch (err => response.status(400).json({
            status:'error',
            message: 'Erro ao inserir  Program: ' + err
            
        }))

}

const updateProgram = async (request,response) => {
    await updateProgramDB(request.body)
        .then(data => response.status(200).json({
            status:'success',
            message: 'Program alterado com sucesso',
            objeto: data
        }))
        .catch (err => response.status(400).json({
            status:'error',
            message: 'Erro ao alterar o Program: ' + err
            
        }))

}

const deleteProgram = async (request,response) => {
    await deleteProgramDB (request.params.id)
        .then(data => response.status(200).json({
            status:'success',
            message:data
        }))
        .catch (err => response.status(400).json({
            status:'error',
            message: 'Erro ao inserir o Program: ' + err
            
        }))

}

const getProgramForCodigo= async (request,response) => {
    await getProgramForIdDB (request.params.id)
        .then(data => response.status(200).json(data))
        .catch (err => response.status(400).json({
            status:'error',
            message: err
            
        }))

}


module.exports = {
    getProgram,addProgram,updateProgram,deleteProgram,getProgramForCodigo  
}