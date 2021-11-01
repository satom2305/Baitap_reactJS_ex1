import React, { useEffect, useState } from "react";
import axios from "axios";
import './Hero-detail.css'
import './style.css'

const HeroDetail = () => {

    const [isLoading, setIsloading] = useState(true);
    const [heroList, setHeroList] = useState([]);
    const [selectedHero, setSelectedHero] = useState({ id: '', name: '' });
    const [historySelect, setHistorySelect] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let didCancel = false;
        axios({
            method: 'GET',
            url: 'https://60dff0ba6b689e001788c858.mockapi.io/heroes'
        }).then(Response => {
            if (!didCancel) {
                setIsloading(false);
                setHeroList(Response.data)
            }
        }).catch(error => {
            if (!didCancel) {
                setIsloading(false);
                setErrorMessage(error.message);
            }
        });
        return () => {
            didCancel = true;
        }
    }, []);

    const selectedHandle = (event, value) => {
        setSelectedHero(value);
        historySelect.push(value);
        setHistorySelect(historySelect);
    }

    const changeName = (value, index) => {
        setSelectedHero({
            id: index,
            name: value
        })

        heroList.find(hero => hero.id == index).name = value
    }


    console.log('hero : ', selectedHero);
    if (isLoading) return 'Loading';
    if (errorMessage) return errorMessage;
    return (
        <div>
            <h1 class="head">Tour of Heroes</h1>
            <h2 class="head">My Heroes</h2>
            {heroList.map((value, index) => (
                <ul class="heroes"

                    onClick={(event) => selectedHandle(event, value, index)}

                    key={index}>

                    <li style={{ background: selectedHero.id === value.id ? 'black' : 'gray' }}>

                        <span class="badge">{value.id}</span> {value.name}
                    </li>
                </ul>
            ))}
            <div>
                <h2>{selectedHero.name.toUpperCase()} Details</h2>
                <div><span>id: </span>{selectedHero.id}</div>
                <div>
                    <label for="hero-name">Hero name: </label>
                    <input id="hero-name" value={selectedHero.name} placeholder="name"

                        onChange={evt => changeName(evt.target.value, selectedHero.id)}

                    />
                </div>
            </div>

            <div >
                <h2>Messages</h2>
                <button class="clear" onClick={() => setHistorySelect([])}> Clear messages </button>
                <div>

                    {historySelect.map((item, index) => (
                        <div>
                            <span key={index}> HeroesComponent: Selected hero id= {item.id} </span>
                        </div>
                    ))}

                </div>
            </div >


        </div >
    );
};

export default HeroDetail;