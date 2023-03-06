import './CoffeeApp.css'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCoffeesThunk, getAllPostsThunk, createCoffeeThunk, createPostThunk, deletePostThunk, deleteCoffeeThunk } from '../../store/coffee';
import { Modal } from '../../context/Modal'
import logo from '../../assets/mug.svg'
import logotwo from '../../assets/star-solid.svg'


const CoffeeApp = () => {
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false)
    const [showFormTwo, setShowFormTwo] = useState(false)
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [caffeine_content, setCaffeineContent] = useState("")
    const [title, setTitle] = useState("")
    const [rating, setRating] = useState("Rating")
    const [text, setText] = useState("")
    const [coffee, setCoffee] = useState("Select Coffee")
    const [hovered, setHovered] = useState(false)
    const [showIndex, setShowIndex] = useState(null);
    const [showIndexTwo, setShowIndexTwo] = useState(null);
    const [ordering, setOrdering] = useState("")

    const deleteCoffee = async (e, coffeeId) => {
        e.preventDefault();

        await dispatch(deleteCoffeeThunk(coffeeId))
    }

    const deletePost = async (e, postId) => {
        e.preventDefault();

        await dispatch(deletePostThunk(postId))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const newCoffee = {
            name,
            year,
            caffeine_content
        };

        await dispatch(createCoffeeThunk(newCoffee));
        await dispatch(getAllCoffeesThunk())

        setShowForm(false)
        setName("")
        setYear("")
        setCaffeineContent("")
    }

    const onSubmitTwo = async (e) => {
        e.preventDefault();

        const newPost = {
            title,
            rating,
            text,
            coffee
        };

        await dispatch(createPostThunk(newPost));
        await dispatch(getAllPostsThunk())

        setShowFormTwo(false)
        setTitle("")
        setRating("")
        setText("")
        setCoffee("")
    }

    const coffeeObj = useSelector(state => {
        return state
    })

    const coffArr = Object.values(coffeeObj?.coffeeReducer.coffees)

    let postArr = Object.values(coffeeObj?.coffeeReducer.posts)


    const dateSort = () => {
        if(ordering === "asc"){
            postArr = postArr?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        }
        if(ordering === "desc"){
            postArr = postArr?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
        return postArr
    }

    const starNumChecker = (rating) => {
        let abc;

        if (rating === 1.00 || (rating > 0 && rating < 2)) {
            abc = "★"
        }
        if (rating === 2.00 || (rating > 1 && rating < 3)) {
            abc = "★★"
        }
        if (rating === 3.00 || (rating > 2 && rating < 4)) {
            abc = "★★★"
        }
        if (rating === 4.00 || (rating > 3 && rating < 5)) {
            abc = "★★★★"
        }
        if (rating === 5.00) {
            abc = "★★★★★"
        }
        return abc
    }


    useEffect(() => {
        // dispatch(getAllCoffeesThunk());

        (async () => {
            await dispatch(getAllPostsThunk());
        })()

    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await dispatch(getAllCoffeesThunk());
        })()

    }, [dispatch, coffee]);

    const filterFunc = (num) => {
        let abc = coffArr.filter(el => el.id === num)

        return abc
    }


    return (
        <div>
            <div className='top-div'>
                <div className='posts-and-button'>
                    <div className='sub-post-butt-div'>
                        <p> &nbsp; &nbsp; Posts</p>
                        <button className='posts-button' onClick={() => setShowFormTwo(!showFormTwo)}>New Post</button>
                        {postArr.length ? <select className='ordering-input' value={ordering}
                            onChange={(e) => setOrdering(e.target.value)}>
                            <option value={"asc"}>Asc</option>
                            <option value={"desc"}>Desc</option>
                        </select> : ""}
                        {showFormTwo ? <Modal onClose={() => setShowFormTwo(false)}> <form className='post-form' onSubmit={onSubmitTwo}>
                            <h2>Create Post</h2>
                            <div>
                                <input
                                    className='title-input'
                                    type='text'
                                    placeholder='Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <select
                                    className='postform-rating-input'
                                    type='number'
                                    placeholder='Rating'
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <option disabled={true}>Rating</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                {/* </div>
                        <div> */}
                                <label>Coffee: &nbsp;</label>
                                <select className='coffee-post-input' value={coffee} onChange={(e) => setCoffee(e.target.value)}>
                                    <option disabled={true} >Select Coffee</option>
                                    {console.log("!!!! COFFEE!!!", coffee)}
                                    {coffArr.map((el) => {
                                        return <option key={el.id} value={el.id}>{el.name}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <textarea
                                    className='createpost-ta'
                                    type='text'
                                    placeholder='Post Text'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                            <button className='posts-button-postform' type='submit'>Submit</button>
                        </form> </Modal> : ""}
                    </div>
                    <div>
                        {dateSort(postArr)?.map((elem, i) => {
                            return (
                                <div className='mapped-posts-divs' key={i} onMouseEnter={() => [setShowIndex(i), setHovered(true)]} onMouseLeave={() => [setShowIndex(null), setHovered(false)]}>
                                    <div className='sub-mapped-posts-div'>
                                        <div className='elem-title'>{elem.title}</div>  <div>{starNumChecker(elem.rating)}</div> <div className='textbody-mapped-sub'>{elem.text}</div>  <div className='filter-func-div'>{filterFunc(elem.coffee)[0]?.name} - {filterFunc(elem.coffee)[0]?.caffeine_content} mg per oz {showIndex === i && hovered === true ? <button className='delete-post-button' onClick={(e) => deletePost(e, elem.id)}>x</button> : ""}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


                <div className='primary-coffees-div'>
                    <div className='sub-post-butt-div-two'>
                        <p>Coffees</p>
                        <button className='posts-button' onClick={() => setShowForm(!showForm)}>New Coffee</button>

                    </div>
                    {showForm ? <form className='coffees-form' onSubmit={onSubmit}>
                        <div className='new-coffess-div'>New Coffee</div>
                        <div>
                            <input
                                type='text'
                                placeholder='Coffee Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='Year'
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='Caffeine'
                                value={caffeine_content}
                                onChange={(e) => setCaffeineContent(e.target.value)}
                            />
                        </div>
                        <button className='coffeeform-submit' type='submit'>Submit</button>
                    </form> : ""}
                    <div>
                        {coffArr?.map((ele, x) => {
                            return (
                                <div className='mapped-coff-arr' key={x} onMouseEnter={() => [setShowIndexTwo(x), setHovered(true)]} onMouseLeave={() => [setShowIndexTwo(null), setHovered(false)]}>
                                    <img className='mugimg' src={logo} alt='Loading...' /> {ele.name} - {ele.year}
                                    {showIndexTwo === x && hovered === true ? <button className='delete-coffee-button' onClick={(e) => deleteCoffee(e, ele.id)}>x</button> : ""}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CoffeeApp
