const { model, Schema } = require('mongoose');

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ['home', 'work', 'personal'],
			required: true,
		},
		completed: {
			type: Boolean,
			required: true,
			default: false,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model('Note', noteSchema);
