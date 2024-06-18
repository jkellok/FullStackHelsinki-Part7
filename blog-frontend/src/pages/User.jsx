import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <List>
        {user.blogs.map((blog) => (
          <ListItem>
            <ListItemText key={blog.id}>{blog.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
