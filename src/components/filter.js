import React from "react";
import { Select } from 'antd';
import Button from "./Button";

const Filter = () => {
    return (
        <div className="filter">
            <div className="selects">
                <Select className="select" value="Filter 1">
                    <option>Name</option>
                </Select>
                <Select className="select" value="Filter 2">
                    <option>Price</option>
                </Select>
            </div>
            <div>
                <Button className="apply-btn" text='Apply'/>
            </div>
        </div>
    )
}

export default Filter;