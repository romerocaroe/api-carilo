let guests = require('./guests.json');

module.exports.fetchGuests = () => {
    return guests
}

module.exports.findGuest = (id) => {
    return guests.find(guest => guest.id == id)
}

module.exports.createGuest = ({codpax, house, lastname, name, typeIdentification, identification, nationality, birthdate, maritalStatus, profession, address, passenger, passangerName, passangerLastname, passangerBirthdate, passangerIdentification, mobilePhone, mail, car, knowledgeHotel}) => {
    let guest = {codpax, house, lastname, name, typeIdentification, identification, nationality, birthdate, maritalStatus, profession, address, passenger, passangerName, passangerLastname, passangerBirthdate, passangerIdentification, mobilePhone, mail, car, knowledgeHotel};
    //Buscar forma de asignar un mejor ID
    guest.id = guests.length + 1;
    guests.push(guest);
    return guest;
}

module.exports.updateGuest = (id,{codpax, house, lastname, name, typeIdentification, identification, nationality, birthdate, maritalStatus, profession, address, passenger, passangerName, passangerLastname, passangerBirthdate, passangerIdentification, mobilePhone, mail, car, knowledgeHotel}) => {
    let index = guests.findIndex(guest => guest.id == id);
    guests[index] = {id, codpax, house, lastname, name, typeIdentification, identification, nationality, birthdate, maritalStatus, profession, address, passenger, passangerName, passangerLastname, passangerBirthdate, passangerIdentification, mobilePhone, mail, car, knowledgeHotel};
    return guests[index];
}

module.exports.deleteGuest = (id) => {
    let index = guests.findIndex(guest => guest.id == id);
    
    if(index === -1){
        return false;
    }
    
    guests.splice(index,1)
    return true;
}