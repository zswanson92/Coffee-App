import './CoffeeForm.css'
import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { createCoffeeThunk, getAllCoffeesThunk } from '../../store/coffee';




const CoffeeForm = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [caffeine_content, setCaffeineContent] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();

        const newCoffee = {
          name,
          year,
          caffeine_content
        };

        await dispatch(createCoffeeThunk(newCoffee));
        await dispatch(getAllCoffeesThunk())
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                    type='text'
                    placeholder='Coffee Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
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
            <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CoffeeForm
