import React from 'react';
import './style.scss';
import { truncateString } from '../../utils/utils';
import Item from '../FoodDrinkItem'


export default function ({ currentItemType, setCurrentItemType, itemTypes }) {

    const ItemType = (name, icon) => {
        return (
            <div className={currentItemType == name ? 'switch-btn active-btn' : 'switch-btn'} onClick={() => setCurrentItemType(name)}> 
                <img src={icon} alt="" />
                {name}
            </div>
        )
    }
    return (
        <div className="SwitchPanel">
            {itemTypes.map(itemType => {
                return ItemType(itemType.name, itemType.icon)
            })}
        </div>
    )
}