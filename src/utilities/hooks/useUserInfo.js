import { useEffect, useState } from "react";
import { getCapitalize } from "..";
import { userService } from "../../appWriteService";

const useUserInfo = (userId) => {
  const [username, setUsername] = useState(null);
  const [userThumbnail, setUserThumbnail] = useState(null);
  useEffect(() => {
    if (userId) {
      userService
        .getUser(userId)
        .then((name) => {
          let user = name.documents[0];
          if (name.total > 0) {
            setUsername(getCapitalize(user.username));
            setUserThumbnail(user.displayImg);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [userId]);

  return { username, userThumbnail };
};

export default useUserInfo;
