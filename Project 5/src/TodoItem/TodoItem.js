import { ListItem, Checkbox, ListItemIcon, ListItemText } from "@material-ui/core";

export default function TodoItem ({ title, completed}) {
    return (
        <ListItem  button>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={completed}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText  primary={title} />
        </ListItem>
      );
}