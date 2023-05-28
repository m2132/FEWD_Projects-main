import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useStyles } from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import React from "react";
import { OPTIONS } from "../SortKeyOptions";


export default function SelectSortKey() {
    const history = useHistory();

    const sortKey = useLocation().search.slice(6);

    const handleChange = (event) => {
        history.push(`todos?sort=${event.target.value}`);
    };

    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortKey}
                    onChange={handleChange}
                    className={classes.select}
                >
                    {Object.keys(OPTIONS).map(option => 
                        <MenuItem value={option}>{option}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )
}
