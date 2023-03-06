const GET_ALL_COFFEE = 'get/COFFEES'
const GET_SINGLE_COFFEE = 'get/COFFEE'
const CREATE_COFFEE = 'post/COFFEE'
const DELETE_COFFEE = 'delete/COFFEE'
const GET_ALL_POSTS = 'get/POSTS'
const GET_SINGLE_POST = 'get/POST'
const CREATE_POST = 'post/POST'
const DELETE_POST = 'post/DELETE'


const addCoffee = (coffee) => ({
    type: CREATE_COFFEE,
    payload: coffee
})

const getCoffees = (coffees) => ({
    type: GET_ALL_COFFEE,
    payload: coffees
})

const getACoffee = (coffee) => ({
    type: GET_SINGLE_COFFEE,
    payload: coffee
})

const deleteCoffee = (coffee) => ({
    type: DELETE_COFFEE,
    payload: coffee
})

const addPost = (post) => ({
    type: CREATE_POST,
    payload: post
})

const getPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
})

const getAPost = (post) => ({
    type: GET_SINGLE_POST,
    payload: post
})

const deletePost = (post) => ({
    type: DELETE_POST,
    payload: post
})

export const createCoffeeThunk = (payload) => async dispatch => {
    const {name, year, caffeine_content} = payload

    const response = await fetch('/coffee/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, year, caffeine_content
        })
    })

    if(response.ok){
        const coffee = await response.json()

        dispatch(addCoffee(coffee))
        return coffee
    }
}

export const createPostThunk = (payload) => async dispatch => {
    const {title, coffee, text, rating} = payload

    const response = await fetch('/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title, coffee, text, rating
        })
    })

    if(response.ok){
        const post = await response.json()

        dispatch(addPost(post))
        return post
    }
}

export const deleteCoffeeThunk = (coffeeId) => async dispatch => {
    const response = await fetch(`/coffee/delete/${coffeeId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteCoffee(coffeeId))
    }
}

export const deletePostThunk = (postId) => async dispatch => {
    const response = await fetch(`/post/${postId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deletePost(postId))
    }
}

export const getCoffeeByIdThunk = (coffeeId) => async dispatch => {
    const response = await fetch(`/coffee/${coffeeId}`)

    if (response.ok) {
        const coffee = await response.json()
        dispatch(getACoffee(coffee))
        return coffee
    }
}

export const getPostByIdThunk = (postId) => async dispatch => {
    const response = await fetch(`/post/${postId}`)

    if (response.ok) {
        const post = await response.json()
        dispatch(getAPost(post))
        return post
    }
}

export const getAllCoffeesThunk = () => async dispatch => {
    const response = await fetch('/coffee');

    if (response.ok) {
        const coffees = await response.json()
        dispatch(getCoffees(coffees))
        return coffees
    }
}

export const getAllPostsThunk = () => async dispatch => {
    const response = await fetch('/post');

    if (response.ok) {
        const posts = await response.json()
        dispatch(getPosts(posts))
        return posts
    }
}


const initialState = { coffees: {}, posts: {} }
// const initialState = {}

const coffeeReducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_COFFEE: {
            console.log("ACTION", action)
            const newState = {
                ...state,
                [action.payload.id]: {
                    name: action.payload.name,
                    year: action.payload.year,
                    caffeine_content: action.payload.caffeine_content
                }
            }
            return newState
        }

        case GET_ALL_COFFEE: {
            const newState = Object.assign({}, state)
            newState.coffees = {}
            const coffee = (action.payload)
            newState.coffees = coffee
            return newState
        }

        case GET_SINGLE_COFFEE: {
            const newState = { ...state }
            newState.coffees = {}
            const coffee = action.payload
            newState.coffees = coffee
            return newState
        }

        case DELETE_COFFEE: {
            const newState = { ...state }
            delete newState.coffees[action.payload]
            return newState
        }

        case GET_ALL_POSTS: {
            const newState = Object.assign({}, state)
            newState.posts = {}
            const post = (action.payload)
            newState.posts = post
            return newState
        }

        case GET_SINGLE_POST: {
            const newState = { ...state }
            newState.posts = {}
            const post = action.payload
            newState.posts = post
            return newState
        }

        case CREATE_POST: {
            const newState = {
                ...state,
                [action.payload.id]: {
                    title: action.payload.title,
                    coffee: action.payload.coffee,
                    text: action.payload.text,
                    rating: action.payload.rating
                }
            }
            return newState
        }

        case DELETE_POST: {
            const newState = { ...state }
            delete newState.posts[action.payload]
            return newState
        }


        default:
            return state;
    }
}

export default coffeeReducer;
