const fakeData = require('../seeders/user.seeder')
const userModel = require('../models/user.model');

const createFakeData = async (data) => {
    for (let i = 0; i < data.length; i++) {
        await userModel.create(data[i]);
    }
}
// createFakeData(fakeData.userData)