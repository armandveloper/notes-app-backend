const Note = require('../models/Note');
const User = require('../models/User');

const hasAUser = async (id, res) => {
	const user = await User.findById(id);
	if (!user) {
		res.status(400).json({
			success: false,
			msg: 'Id has not a user registered',
		});
		return false;
	}
	return true;
};

exports.createNote = async (req, res) => {
	/*
  {
    title,
    description,
    category,
    user (ObjectId)
  }
  */
	try {
		// Verificar si el usuario existe
		const userExists = await hasAUser(req.body.user, res);
		if (!userExists) {
			return;
		}
		const note = new Note(req.body);
		await note.save();
		return res
			.status(201)
			.json({ success: true, msg: 'Note created', note });
	} catch (err) {
		console.log(err);
		res.json({ success: false, msg: 'Error. Please try later' });
	}
};

exports.updateNote = async (req, res) => {
	/*
  Solo los cam´pos
  {
    title,
    description,
    category,
  }
  */
	try {
		const { id } = req.params;
		const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
		if (!note) {
			return res
				.status(404)
				.json({ success: false, msg: "The note doesn't exist" });
		}
		return res.json({ success: true, msg: 'Note updated', note });
	} catch (err) {
		console.log(err);
		res.json({ success: false, msg: 'Error. Please try later' });
	}
};

exports.toggleCompleted = async (req, res) => {
	// Only update the completed filed
	try {
		const { id } = req.params;
		const { completed } = req.body;
		const note = await Note.findByIdAndUpdate(
			id,
			{ completed },
			{ new: true }
		);
		if (!note) {
			return res
				.status(404)
				.json({ success: false, msg: "The note doesn't exist" });
		}
		return res.json({ success: true, msg: 'Note updated', note });
	} catch (err) {
		console.log(err);
		res.json({ success: false, msg: 'Error. Please try later' });
	}
};

exports.getNotes = async (req, res) => {
	try {
		const notes = await Note.find({ user: req.uid });
		return res.json({ success: true, msg: 'Note list', notes });
	} catch (err) {
		console.log(err);
		res.json({ success: false, msg: 'Error. Please try later' });
	}
};

exports.deleteNote = async (req, res) => {
	try {
		const { id } = req.params;
		const note = await Note.findByIdAndDelete(id);
		if (!note) {
			return res
				.status(404)
				.json({ success: false, msg: "The note doesn't exist" });
		}
		return res.json({ success: true, msg: 'Note deleted', note });
	} catch (err) {
		console.log(err);
		res.json({ success: false, msg: 'Error. Please try later' });
	}
};
