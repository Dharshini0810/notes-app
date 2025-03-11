import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {isAuthenticated,user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const onLogOut = () => {
    dispatch(logout())
    navigate("/login");
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {isAuthenticated &&
      <>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo onLogOut={onLogOut} name={user.name} />
      </>
      }
    </div>
  );
};

export default Navbar;
