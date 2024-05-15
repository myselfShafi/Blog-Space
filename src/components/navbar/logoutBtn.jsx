import React, { useState } from "react";
import { Loader, LogOut } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appWriteService/auth.service";
import { authlogout } from "../../store/slices/authSlice";
import { Dropdown } from "../shared";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const session = await authService.logout();
    if (session) {
      dispatch(authlogout());
      setLoading(false);
      navigate("/", {});
    }
  };
  return (
    <div>
      <Dropdown
        optionClass={"bg-sky-300/10 -left-full mt-2"}
        hover
        title={
          <div>
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <LogOut onClick={handleLogout} />
            )}
          </div>
        }
      >
        <div className="text-nowrap p-3 ">
          <h6>Log out</h6>
        </div>
      </Dropdown>
    </div>
  );
};

export default LogoutBtn;
