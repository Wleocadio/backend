const FotoPerfil = require('../models/fotoPerfil'); // Certifique-se de alterar o caminho conforme necessário
const Profissional = require('../models/profissionalModel');



exports.criarFotoPerfil = async (req, res) => {

    const profissionalId = req.params.profissionalId; // Referência ao Profissional.
    const tamanhoMaximo = 2 * 1024 * 1024; // 5 MB em bytes
    try {
        const verificaProfissional = await Profissional.findById(profissionalId);
        //console.log(verificaProfissional)
    } catch (error) {
        return res.status(404).json({ Mensagem: 'Profissional não encontrado!' })
    }

        // Verificar se uma imagem foi enviada

    if (!req.file) {
        return res.status(400).send('Nenhuma imagem foi enviada.');
    }

     // Verificar se o arquivo é um JPEG pelo mimetype
     if (req.file.mimetype !== 'image/jpeg') {
        return res.status(400).json({ Mensagem: 'Formato de arquivo não suportado. Por favor, envie uma imagem JPEG.' });
    }

    if (req.file.size > tamanhoMaximo) {
        return res.status(400).json({Mensagem: 'O arquivo é muito grande. O tamanho máximo permitido é 2 MB.'})
    }

    const verificaCadastro = await FotoPerfil.findOne({ profissionalId })
    if (verificaCadastro) {
        return res.status(400).json({ Mensagem: 'Você já possui foto cadastrada.' })
    }



    try {

        // Criar uma nova FotoPerfil
        const novaFoto = new FotoPerfil({
            foto: req.file.buffer,
            profissionalId
        });

        // Salvar a FotoPerfil no banco de dados
        const fotoSalva = await novaFoto.save();

        res.status(201).json({ Mensagem: 'Foto salva com sucesso!', fotoId: fotoSalva._id });
    } catch (err) {
        res.status(500).json({ Mensagem: 'Erro ao salvar a foto' });
    }
};

exports.atualizarFotoPerfil = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ Mensagem: 'Nenhuma imagem foi enviada.' });
        }
        if (!req.file) {
            return res.status(400).send('Nenhuma imagem foi enviada.');
        }
    
         // Verificar se o arquivo é um JPEG pelo mimetype
         if (req.file.mimetype !== 'image/jpeg') {
            return res.status(400).json({ Mensagem: 'Formato de arquivo não suportado. Por favor, envie uma imagem JPEG.' });
        }
    
        if (req.file.size > tamanhoMaximo) {
            return res.status(400).json({Mensagem: 'O arquivo é muito grande. O tamanho máximo permitido é 2 MB.'})
        }

        const fotoAtualizada = await FotoPerfil.findOneAndUpdate(
            { profissionalId: req.params.profissionalId },
            { foto: req.file.buffer },
            { new: true }
        );

        if (!fotoAtualizada) {
            return res.status(404).json({ Mensagem: 'Foto do perfil não encontrada.' });
        }

        return res.json({ Mensagem: 'Foto do perfil atualizada com sucesso!', fotoId: fotoAtualizada._id });
    } catch (err) {
        return res.status(500).json({ Mensagem: 'Erro ao atualizar a foto' });
    }
};


exports.obterFotoPerfil = async (req, res) => {
    try {
        const fotoPerfil = await FotoPerfil.findOne({ profissionalId: req.params.profissionalId });
        if (!fotoPerfil || !fotoPerfil.foto) {
            return res.status(404).json({ Mensagem: 'Foto do perfil não encontrada.' });
        }
        console.log(fotoPerfil)
        const fotoEmBase64 = fotoPerfil.foto.toString('base64');
        const imagemDataUrl = `data:image/jpeg;base64,${fotoEmBase64}`
        return res.status(200).json({
            id: fotoPerfil._id,
            idProfissional: fotoPerfil.profissionalId,
            imagem: imagemDataUrl
        });
        // res.contentType('image/jpeg'); // Ou o formato apropriado da imagem
        // return res.status(200).json(fotoPerfil);

    } catch (err) {
        res.status(500).json({ Mensagem: 'Erro ao recuperar a foto' });
    }
};