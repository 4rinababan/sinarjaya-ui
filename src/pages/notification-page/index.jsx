import React, { useContext } from "react";
import NotificationCenter from "../../components/NotificationCenter";
import { NotificationContext } from "../../context/NotificationContext";


const NotificationPage = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div style={{}}>
      <NotificationCenter notifications={notifications} />
    </div>
  );
};

export default NotificationPage;
