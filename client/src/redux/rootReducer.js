import { combineReducers } from 'redux'
import categoryReducer from './category/category.reducer'
import postReducer from './post/post.reducer'
import subjectReducer from './subject/subject.reducer'
import typeReducer from './type/type.reducer'

export const rootReducer = combineReducers({
	category: categoryReducer,
	post: postReducer,
	subject: subjectReducer,
	type: typeReducer
})

export default rootReducer
