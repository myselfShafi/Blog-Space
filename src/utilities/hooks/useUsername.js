import { useEffect, useState } from "react";
import { getCapitalize } from "..";
import { userService } from "../../appWriteService";

const useUsername = (userId) => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    if (userId) {
      userService.getUser(userId).then((name) => {
        if (name.total > 0) {
          setUsername(name.documents[0]?.username);
        }
      });
    }
  }, [userId]);

  return username && getCapitalize(username);
};

export default useUsername;
