const UserAvatar = ({ isAuth, photoURL }) => (
  <img
    className="iconsImg"
    src={
      isAuth
        ? photoURL || "/assets/img/icons/user.png"
        : "/assets/img/icons/login.svg"
    }
    alt={isAuth ? "User icon" : "Login icon"}
    onError={e => {
      e.target.onerror = null;
      e.target.src = "/assets/img/icons/user.png";
    }}
  />
);

export default UserAvatar;