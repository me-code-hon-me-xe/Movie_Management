
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../../context/UserContext';
import axios from 'axios';

import './style.scss';
import ItemTypeSwitchPanel from '../../../../components/ItemTypeSwitchPanel';
import Item from '../../../../components/FoodDrinkItem';

import FoodIcon from '../../../../images/hamburger.png'
import DrinkIcon from '../../../../images/cola.png'
export default function ({ selectedFoods, selectedDrinks, setSelectedFoods, setSelectedDrinks }) {
    const [currenItemType, setCurrentItemType] = useState('Foods')
    const [foods, setFoods] = useState([])
    const [drinks, setDrinks] = useState([])

    const { jwtToken } = useContext(UserContext)

    const fetchFoods = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/foods`, config);
        if (response.data.success) {
            setFoods(response.data.data)
            console.log('foods from server');
            console.log(response.data.data)
        }
    }


    const fetchDrinks = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/drinks`, config);
        if (response.data.success) {
            setDrinks(response.data.data)
        }
    }

    useEffect(() => {
        fetchFoods()
        fetchDrinks()
    }, [])
    const handleSelectFood = (newItem) => {
        // TODO: check by id
        // add if not exists
        setSelectedFoods(preVal => {
            if (preVal.some(selectedItem => selectedItem._id == newItem._id)) {
                return preVal
            }
            return [...preVal, {
                item: newItem,
                quantity: 1
            }]
        })

    }


    const handleUnselectFood = (newItem) => {
        // TODO: check by id
        // remove if exists
        setSelectedFoods(preVal => {
            if (preVal.some(selectedItem => selectedItem.item._id == newItem._id)) {
                return preVal.filter(selectedItem => selectedItem.item._id !== newItem._id);
            }
            return [...preVal]
        })

    }

    const checkIfFoodActive = (item) => {
        return selectedFoods
            .some(selectedItem => selectedItem.item._id === item._id);
    }

    const handleChangeSelectedFoodQuantity = (foodId, newQuantity) => {

        setSelectedFoods(preVal => {
            return preVal.map(selectedItem => {
                if (selectedItem.item._id === foodId) {
                    return {
                        ...selectedItem,
                        quantity: newQuantity
                    }
                }
                return selectedItem
            })
        })
    }



    const handleSelectDrink = (newItem) => {
        // TODO: check by id
        // add if not exists
        setSelectedDrinks(preVal => {
            if (preVal.some(selectedItem => selectedItem.item._id == newItem._id)) {
                return preVal
            }
            return [...preVal, {
                item: newItem,
                quantity: 1
            }]
        })

    }


    const handleUnselectDrink = (newItem) => {
        // TODO: check by id
        // remove if exists
        setSelectedDrinks(preVal => {
            if (preVal.some(selectedItem => selectedItem.item._id == newItem._id)) {
                return preVal.filter(selectedItem => selectedItem.item._id !== newItem._id);
            }
            return [...preVal]
        })

    }

    const checkIfDrinkActive = (item) => {
        return selectedDrinks
            .some(selectedItem => selectedItem.item._id === item._id);
    }

    const handleChangeSelectedDrinkQuantity = (drinkId, newQuantity) => {
        setSelectedDrinks(preVal => {
            return preVal.map(selectedItem => {
                if (selectedItem.item._id === drinkId) {
                    return {
                        ...selectedItem,
                        quantity: newQuantity
                    }
                }
                return selectedItem
            })
        })

    }
    
    const itemTypes = [
        {
            name: 'Foods',
            icon: FoodIcon
        },
        {
            name: 'Drinks',
            icon: DrinkIcon
        }
    ]

    return (
        <div className="step-4">
            <ItemTypeSwitchPanel
                itemTypes={itemTypes}
                currentItemType={currenItemType}
                setCurrentItemType={setCurrentItemType}
            />

            <div className="item-container">

                {
                    currenItemType == 'Foods' ?
                        foods.map((food, index) => {
                            return (
                                <Item
                                    key={index}
                                    itemId={food._id}
                                    itemImage={food.image}
                                    itemName={food.name}
                                    itemDescription={food.description}
                                    itemPrice={food.price}
                                    onClick={() => handleSelectFood(food)}
                                    isActive={checkIfFoodActive(food)}
                                    handleUnselect={() => handleUnselectFood(food)}
                                    handleChangeQuantity={handleChangeSelectedFoodQuantity}
                                />
                            )
                        })
                        :
                        drinks.map((drink, index) => {
                            return (
                                <Item
                                    key={index}
                                    itemId={drink._id}
                                    itemImage={drink.image}
                                    itemName={drink.name}
                                    itemDescription={drink.description}
                                    itemPrice={drink.price}
                                    onClick={() => handleSelectDrink(drink)}
                                    isActive={checkIfDrinkActive(drink)}
                                    handleUnselect={() => handleUnselectDrink(drink)}
                                    handleChangeQuantity={handleChangeSelectedDrinkQuantity}

                                />
                            )
                        })
                }

            </div>

        </div>
    )
}