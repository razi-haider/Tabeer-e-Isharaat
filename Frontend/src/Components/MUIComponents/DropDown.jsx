import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDown({
    defaultLabel,
    options,
    handleOptionChange,
    disabled,
}) {
    const [option, setOption] = React.useState("");

    const handleChange = (event) => {
        setOption(event.target.value);
        handleOptionChange(event.target.value);
    };

    return (
        <FormControl
            sx={{
                m: 1,
                // minWidth: 50,
                maxWidth: 150,
                left: "30px",
                top: "20px",
                borderRadius: "8px",
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#424242" : "#f0f0f0", // Change the color as per your preference
            }}
        >
            <InputLabel id="demo-simple-autowidth-label" sx={{ color: "#0055A5" }}>
                {defaultLabel}
            </InputLabel>
            <Select
                labelId="demo-simple-autowidth-label"
                id="demo-simple-autowidth"
                value={option}
                onChange={handleChange}
                disabled={disabled}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options &&
                    options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}
