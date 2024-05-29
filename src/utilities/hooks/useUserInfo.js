import { useEffect, useState } from "react";
import { getCapitalize } from "..";
import { userService } from "../../appWriteService";

const useUserInfo = (userId) => {
  const [username, setUsername] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  useEffect(() => {
    if (userId) {
      userService
        .getUser(userId)
        .then((name) => {
          let user = name.documents[0];
          if (name.total > 0) {
            setUsername(getCapitalize(user.username));
            setProfileImg(
              user.displayImg
                ? userService.getFile(user.displayImg)
                : "/static/placeholder.jpg"
            );
          }
        })
        .catch((error) => console.error(error));
    }
  }, [userId]);

  return { username, profileImg };
};

export default useUserInfo;
