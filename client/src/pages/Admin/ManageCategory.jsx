import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faEdit,
	faTrashAlt,
	faSave,
	faTimesCircle,
	faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'

import {
	addCategory,
	deleteCategory,
	updateCategory,
} from '../../redux/category/category.actions'

import Button from '../../components/Button'

const ManageCategory = () => {
	const dispatch = useDispatch()

	const [activatedAddCategory, setActivatedAddCategory] = useState(false)

	const [newCategory, setNewCategory] = useState('')

	const { categories } = useSelector(({ category }) => ({
		categories: category.categories,
	}))

	const handleAddCategory = (e) => {
		e.preventDefault()
		dispatch(addCategory({ name: newCategory }))
		setActivatedAddCategory(false)
		setNewCategory('')
	}

	return (
		<>
			{categories &&
				categories.length > 0 &&
				categories.map((item) => (
					<FormCategory key={item._id} category={item} />
				))}

			<form
				className='manage-category__form-group'
				onSubmit={handleAddCategory}
			>
				{activatedAddCategory ? (
					<>
						<input
							type='text'
							className='manage-category__input'
							value={newCategory}
							onChange={(e) => setNewCategory(e.target.value)}
						/>
						<Button
							type='button'
							className='manage-category__btn cancel'
							onClick={() => setActivatedAddCategory(false)}
						>
							<FontAwesomeIcon
								icon={faTimesCircle}
								className='manage-category__btn__icon'
							/>
							Hủy bỏ
						</Button>
						<Button
							type='submit'
							className='manage-category__btn save'
							onClick={handleAddCategory}
						>
							<FontAwesomeIcon
								icon={faSave}
								className='manage-category__btn__icon'
							/>
							Lưu
						</Button>
					</>
				) : (
					<Button
						type='button'
						className='manage-category__btn add'
						onClick={() => setActivatedAddCategory(true)}
					>
						<FontAwesomeIcon
							icon={faPlusCircle}
							className='manage-category__btn__icon'
						/>
						Thêm danh mục
					</Button>
				)}
			</form>
		</>
	)
}

const FormCategory = ({ category }) => {
	const dispatch = useDispatch()

	const [activatedEdit, setActivatedEdit] = useState(false)
	const [categoryName, setCategoryName] = useState(category.name)

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(
			updateCategory({
				...category,
				name: categoryName,
			})
		)
		setActivatedEdit(false)
	}

	const handleDeleteCategory = (e) => {
		dispatch(deleteCategory({ _id: category._id }))
	}

	return (
		<form className='manage-category__form-group' onSubmit={handleSubmit}>
			<input
				type='text'
				className='manage-category__input'
				value={categoryName}
				disabled={activatedEdit ? false : true}
				onChange={(e) => setCategoryName(e.target.value)}
			/>
			{activatedEdit ? (
				<>
					<Button
						type='button'
						className='manage-category__btn cancel'
						onClick={() => setActivatedEdit(false)}
					>
						<FontAwesomeIcon
							icon={faTimesCircle}
							className='manage-category__btn__icon'
						/>
						Hủy bỏ
					</Button>
					<Button
						type='submit'
						className='manage-category__btn save'
						onClick={handleSubmit}
					>
						<FontAwesomeIcon
							icon={faSave}
							className='manage-category__btn__icon'
						/>
						Lưu
					</Button>
				</>
			) : (
				<Button
					type='button'
					className='manage-category__btn edit'
					onClick={() => setActivatedEdit(true)}
				>
					<FontAwesomeIcon
						icon={faEdit}
						className='manage-category__btn__icon'
					/>
					Chỉnh sửa
				</Button>
			)}
			<Button
				type='button'
				className='manage-category__btn delete'
				onClick={handleDeleteCategory}
			>
				<FontAwesomeIcon
					icon={faTrashAlt}
					className='manage-category__btn__icon'
				/>
				Xóa
			</Button>
		</form>
	)
}

export default ManageCategory
