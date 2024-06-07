import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector(({notification}) => notification)

  if (!notification) {
    return null;
  }

  return (
    <div className={notification.style}>
      {notification.style === "notification"
      ?
      <Alert variant="filled" severity="success">
        {notification.content}
      </Alert>
      :
      <Alert variant="filled" severity="error">
        {notification.content}
      </Alert>}
    </div>
  )
};

export default Notification;
