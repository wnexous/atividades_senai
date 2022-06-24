const fs = require('fs');
const input = require('prompt-sync')();


db = [] //declara a variavel db como tipo vetor
function database() {
    try {
        db = JSON.parse(fs.readFileSync("database.json")) //variavlel db tenta receber os arquivos. Caso gere erro, cria um arquivo com []
    } catch (error) {
        fs.writeFileSync("database.json", JSON.stringify(db)) //funcao para escrever um arquivo (write) caso ele nao exista. Aqui cria o arquivo database.json para ser usado como banco de dados
        db = JSON.parse(fs.readFileSync("database.json"))
    }
    return db
} //puxa a funcao
database()
while (1) {
    console.log(`
        1: listar alunos
        2: adicionar aluno
        3: remover aluno
        4: sair
    `)
    if (db.length == 0) console.log("total de alunos: ZERO")
    else {
        if (db.length % 2 == 1) console.log(`total de alunos ${db.length} e é IMPAR`)
        if (db.length % 2 == 0) console.log(`total de alunos ${db.length} e é PAR`)
    }

    try {
        let question = parseInt(input("Insira o numero da escolha: "))
        database()
        switch (question) {
            case 1:
                console.table(database())
                break;
            case 2:
                const aluno = input("Nome do aluno: ")
                let tempDB1 = database()
                tempDB1.push(aluno)
                fs.writeFileSync("database.json", JSON.stringify(tempDB1))
                console.table(database())
                break;
            case 3:
                console.table(database())
                const alunoIndex = parseInt(input("Index do aluno: "))
                let tempDB2 = database()
                tempDB2.splice(alunoIndex, 1)
                fs.writeFileSync("database.json", JSON.stringify(tempDB2))
                console.table(database())
                break
            case 4:
                process.exit()
            default:
                console.log('nenhuma opcao selecionada')
                break;
        }
    } catch (error) {
        console.log('letra insirida.')
    }

}