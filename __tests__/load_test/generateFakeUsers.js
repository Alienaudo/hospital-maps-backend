import { writeFile } from "node:fs/promises";

const firstNames = [

    'João', 'Maria', 'Ana', 'Pedro', 'Carlos', 'Julia', 'Lucas', 'Fernanda',
    'Rafael', 'Sofia', 'Gabriel', 'Isabela', 'Matheus', 'Laura', 'Guilherme',
    'Beatriz', 'Felipe', 'Manuela', 'Rodrigo', 'Vitória', 'Bruno', 'Larissa',
    'Diego', 'Letícia', 'Eduardo', 'Bianca', 'Thiago', 'Amanda', 'Henrique',
    'Gabriela', 'Leonardo', 'Camila', 'Gustavo', 'Alice', 'Murilo', 'Helena'

];

const lastNames = [

    'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Almeida', 'Lima',
    'Pereira', 'Ferreira', 'Costa', 'Carvalho', 'Gomes', 'Martins', 'Araújo',
    'Melo', 'Barbosa', 'Ribeiro', 'Alves', 'Cardoso', 'Nunes', 'Monteiro',
    'Cavalcanti', 'Mendes', 'Freitas', 'Castro', 'Dias', 'Marques', 'Machado',
    'Vieira', 'Correia', 'Campos', 'Prado', 'Miranda', 'Baptista', 'Reis'

];

const bloodTypes = [

    'A_NEGATIVE', 'A_POSITIVE', 'B_NEGATIVE', 'B_POSITIVE',
    'AB_NEGATIVE', 'AB_POSITIVE', 'O_NEGATIVE', 'O_POSITIVE'

];

const diseaseNames = [

    'Diabetes Tipo 2', 'Hipertensão', 'Asma', 'Colesterol Alto',
    'Artrite', 'Osteoporose', 'Anemia', 'Depressão', 'Ansiedade',
    'Hipotireoidismo', 'Gastrite', 'Refluxo', 'Enxaqueca', 'Insônia'

];

const allergyDescriptions = [

    'Alergia a penicilina', 'Alergia a amendoim', 'Alergia a gluten',
    'Alergia a lactose', 'Alergia a camarão', 'Alergia a poeira',
    'Alergia a pólen', 'Alergia a aspirina', 'Alergia a ovos',
    'Alergia a leite', 'Alergia a nozes', 'Alergia a mariscos'

];

const medicationNames = [

    'Metformina', 'Losartana', 'Paracetamol', 'Ibuprofeno',
    'Omeprazol', 'Simvastatina', 'Levotiroxina', 'Sertralina',
    'Atorvastatina', 'Amlodipina', 'Hidroclorotiazida', 'Enalapril'

];

function generatePassword(length = 12) {

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';

    for (let i = 0; i < length; ++i) {

        password += chars[Math.floor(Math.random() * chars.length)];

    };

    return password;

};

function generateUniquePhones(count) {

    const phones = new Set();

    while (phones.size < count) {

        const areaCode = Math.floor(Math.random() * 89) + 11; // 11-99
        const num1 = Math.floor(Math.random() * 90000) + 10000; // 10000-99999
        const num2 = Math.floor(Math.random() * 10000); // 0000-9999
        const phone = `+55${areaCode.toString().padStart(2, '0')}${num1.toString()}${num2.toString().padStart(4, '0')}`;

        phones.add(phone);

    };

    return Array.from(phones);

};

function generateRandomArray(list, schemaType, min = 0, max = 3) {

    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    const items = [];

    for (let i = 0; i < length; ++i) {

        const item = {};

        switch (schemaType) {

            case "disease":

                item.name = list[Math.floor(Math.random() * list.length)];
                item.isChronic = Math.random() > 0.5;

                break;

            case "allergy":

                item.description = list[Math.floor(Math.random() * list.length)];

                break;

            case "medication":

                item.name = list[Math.floor(Math.random() * list.length)];
                item.isContinuousUse = Math.random() > 0.5;

                break;

            case "contact":

                const first = firstNames[Math.floor(Math.random() * firstNames.length)];
                const last = lastNames[Math.floor(Math.random() * lastNames.length)];

                item.name = `${first} ${last}`;

                // Generate a phone for contact (not necessarily unique across all)
                const areaCode = Math.floor(Math.random() * 89) + 11;
                const num1 = Math.floor(Math.random() * 90000) + 10000;
                const num2 = Math.floor(Math.random() * 10000);

                item.tel = `+55${areaCode.toString().padStart(2, '0')}${num1.toString()}${num2.toString().padStart(4, '0')}`;

                break;

        };

        items.push(item);

    };

    return items;

}

// Function to escape CSV fields (quote if contains , or " or \n, escape " to "")
function escapeCsv(field) {

    let str = String(field);

    if (str.includes(',') || str.includes('"') || str.includes('\n')) {

        str = str.replace(/"/g, '""');

        return `"${str}"`;

    };

    if (!str.startsWith('{') && !str.startsWith('[') && !str.startsWith('"')) {

        return `"${str}"`;

    };

    return str;

};

const uniquePhones = generateUniquePhones(1000);

const users = [];

for (let i = 0; i < 1000; ++i) {

    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];

    const name = `${first} ${last}`;

    const randomNum = Math.floor(Math.random() * 1000);
    const email = `user${i + 1}.${first.toLowerCase()}${randomNum}@loadtest.com`;

    const password = generatePassword();
    const phone = uniquePhones[i];
    const bloodType = bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
    const diseases = generateRandomArray(diseaseNames, 'disease');
    const allergies = generateRandomArray(allergyDescriptions, 'allergy');
    const medications = generateRandomArray(medicationNames, 'medication');
    const contacts = generateRandomArray([], 'contact');

    users.push({

        name,
        email,
        password,
        phone,
        bloodType,
        diseases: JSON.stringify(diseases),
        allergies: JSON.stringify(allergies),
        medications: JSON.stringify(medications),
        contacts: JSON.stringify(contacts)

    });

};

const csvLines = users.map(user => {

    const fields = [

        user.name,
        user.email,
        user.password,
        user.phone,
        user.bloodType,
        user.diseases,
        user.allergies,
        user.medications,
        user.contacts

    ];

    return fields.map(escapeCsv).join(',');

});

const csvContent = csvLines.join('\n');

writeFile('fake_users.csv', csvContent, 'utf8');

console.log('CSV file created: fake_users.csv');
