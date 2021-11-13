const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const search = require('../utilities/search')
const Type = require('../models/Type')
const Category = require('../models/Category')
const Subject = require('../models/Subject')

// @route   GET api/post?category=algorithm&keyword=test
// @desc    Get posts with conditions in query string,
//          Get all post if no condition
router.get('/', async (req, res) => {
	try {
		const { category, type, keyword } = req.query
		console.log(req.query)

		let query = {}

		if (category) {
			console.log('co category')
			query['categories'] = { $elemMatch: { category } }
		}

		if (type) {
			console.log('co type')
			query['post.types'] = { type }
		}

		console.log(query)

		const result = await Post.find(query)
			.populate({ path: 'type', model: Type })
			.populate({ path: 'categories.category', model: Category })
			.populate({ path: 'subjects.subject', model: Subject })

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   GET api/post/618c8ed8b52e4e9b41736c4d
// @desc    Get a post by id
router.get('/:id', async (req, res) => {
	try {
		const result = await Post.findById(req.params.id)
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   POST /api/post
// @desc    Create a post
router.post('/', async (req, res) => {
	try {
		const { title, body, categories, type, subjects, keywords } = req.body
		const post = new Post({
			title,
			body,
			type,
			categories,
			subjects,
			keywords
		})
		console.log(post)
		const result = await post.save()
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

router.delete('/', async (req, res) => {
	try {
		await Post.deleteMany()
		res.send('success')
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

module.exports = router