const multer = require("multer");
const lista_carros = [];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./views/public/img/") // Indica pasta onde será salvo
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1]; // Extração da extensão do arquivo original

        const novoNomeArquivo = require('crypto').randomBytes(16).toString('hex'); // Cria um código randômico que será o nome do arquivo

        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`); // Indica o novo nome do arquivo
    }
});
module.exports = storage;