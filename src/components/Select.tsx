import {
  createStyles,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Chip,
  Typography
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControlContainer: {
      width: "45%",
      justifySelf: "flex-end"
    },
    formControl: {
      background: "#fff"
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2,
      zIndex: 5
    }
  })
);

export type SelectOption = {
  value: string;
  isSelected: boolean;
};

type SelectProps = {
  options: string[];
  selectedOptions: string[];
  handleChange: (e: any) => void;
  handleDelete: (metric: string) => (e: any) => void;
};
export default ({
  options,
  selectedOptions,
  handleChange,
  handleDelete
}: SelectProps) => {
  const classes = useStyles();
  const freeOptions = options.filter(opt => !selectedOptions.includes(opt));

  return (
    <FormControl variant="outlined" className={classes.formControlContainer}>
      <Select
        className={classes.formControl}
        id="demo-simple-select-outlined"
        multiple
        onChange={handleChange}
        value={selectedOptions}
        renderValue={selected => (
          <div className={classes.chips}>
            {(selected as string[]).map(value => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
                onDelete={handleDelete(value as string)}
                onMouseDown={event => {
                  event.stopPropagation();
                }}
              />
            ))}
          </div>
        )}
      >
        {freeOptions.length === 0 ? (
          <Typography variant="body2" align="center" gutterBottom>
            No options.
          </Typography>
        ) : (
          freeOptions.map((opt: string) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};
