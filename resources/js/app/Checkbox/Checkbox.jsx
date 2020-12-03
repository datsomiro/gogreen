import React, { useState } from 'react'

const Checkbox = (props) => {

    return (
        <div className="checkbox-group">
            {
                props.checkboxes.map((checkbox) => (
                    <div key={checkbox.id} className="form-group">
                        <label htmlFor={checkbox.name}>

                            <input id={checkbox.name} type="checkbox" name={checkbox.name} checked={checkbox.checked} onChange={props.handleChange} />
                            {checkbox.name}
                        </label>
                    </div>
                ))
            }
        </div>


    )
}

export default Checkbox;