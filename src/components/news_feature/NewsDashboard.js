import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import NewsGrid from './NewsGrid'
import './NewsDashboard.css'

const categoryKeywords = {
    'general': 'pets OR pet news OR pet stories OR animal news',
    'pet healthcare': 'pet healthcare OR pet health OR vet OR veterinary OR pet wellness OR pet nutrition OR pet medicine',
    'pet leisure': 'pet leisure OR pet activities OR pet fun OR pet outings OR pet adventures OR pet parks',
    'pet entertainment': 'pet entertainment OR pet toys OR pet games OR pet events OR pet shows OR pet competitions OR pet lifestyle OR living with pets OR pet-friendly OR pet fashion OR pet travel',
    'pet adoption': 'pet adoption OR pet rescue OR animal shelters OR adopt a pet OR rescue animals',
    'pet training': 'pet training OR dog training OR cat training OR pet behavior OR pet obedience',
    'pet technology': 'pet technology OR pet gadgets OR pet apps OR smart pet devices OR pet tech news',
};


function NewsDashboard() {

    const [items, setItems] = useState([])
    const [active, setActive] = useState(1)
    const [category, setCategory] = useState("general")

    useEffect(() => {
        const keywords = categoryKeywords[category];

        fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&apiKey=d0d6b5df46734641808f684c26482e59`)
            .then(res => res.json())
            .then(data => {
                console.log(data); // Check the API response
                setItems(data.articles || []);
            })
            .catch(error => console.error('Error fetching news:', error));
    }, [category]);

    return (
        <div className="App">
            <h1 className="title">Catch Up With The Latest Pets News </h1>
            <Menu active={active} setActive={setActive} setCategory={setCategory} />
            <NewsGrid items={items} />

        </div>
    )

}

export default NewsDashboard;