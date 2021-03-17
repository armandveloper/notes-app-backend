const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.methods.hashPassword = async function (password) {
	this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.method('toJSON', function () {
	const { __v, _id, password, ...object } = this.toObject();
	object.uid = _id;
	return object;
});

module.exports = model('User', userSchema);
