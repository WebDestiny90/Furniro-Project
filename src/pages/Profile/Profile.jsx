import { useRef, useState, useEffect } from "react";
import { auth, storage } from "../../firebase";
import { updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setDisplayName(firebaseUser?.displayName || "");
      setPhotoURL(firebaseUser?.photoURL || "");
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    if (!user) {
      setError("User not authorized");
      return;
    }
    let newPhotoURL = photoURL;

    try {
      if (file) {
        const ext = file.name.split('.').pop();
        const safeName = `${user.uid}_${Date.now()}.${ext}`;
        const storageRef = ref(storage, `avatars/${user.uid}/${safeName}`);
        await uploadBytes(storageRef, file);
        newPhotoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName,
        photoURL: newPhotoURL,
      });
      await refreshUser();
      setPhotoURL(newPhotoURL);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccess("Profile updated!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError("Upload error: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/Account");
  };

  const handleDeleteAvatar = async () => {
    if (!user) return;
    try {
      if (photoURL) {
        const match = photoURL.match(/\/o\/(.+)\?/);
        if (match && match[1]) {
          const filePath = decodeURIComponent(match[1]);
          const fileRef = ref(storage, filePath);
          try {
            await deleteObject(fileRef);
          } catch (err) {
            if (err.code !== "storage/object-not-found") {
              throw err;
            }
          }
        }
      }
      await updateProfile(user, { photoURL: "" });
      await refreshUser();
      setPhotoURL("");
      setSuccess("Avatar deleted!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError("Delete error: " + err.message);
    }
  };

  return (
    <main className="profilePage">
      <div className="profileItems">
        <div className="container">
          <img className="logoImage" src="/assets/img/icons/siteLogo.svg" width={55} height={55} alt="Site Logo" />
          <h1 className="profileTitle">My Profile</h1>
          <div className="profileTextsBox">
            <span className="homeText" onClick={() => navigate("/")}>Home</span>
            <img className="arrowImage" src="/assets/img/icons/arrow.svg" width={20} height={20} alt="Arrow Icon" />
            <p className="profileText">Profile</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="profileContainer">
          <div className="profileBox">
            <h2 className="profileSectionTitle">Profile Info</h2>
            <form className="profileForm" onSubmit={handleSave}>
              <div className="profileInputs">
                <label className="profileLabel">Display Name</label>
                <input
                  className="profileInput"
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Your name"
                />
                <label className="profileLabel">Avatar</label>
                <input
                  className="profileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <div className="profileAvatarBox">
                  <img
                    className="profileAvatar"
                    src={photoURL || "/assets/img/icons/user.png"}
                    alt="avatar"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = "/assets/img/icons/user.png";
                    }}
                  />
                  {photoURL && (
                    <button
                      type="button"
                      className="deleteAvatarButton"
                      onClick={handleDeleteAvatar}
                    >
                      Delete avatar
                    </button>
                  )}
                </div>
              </div>
              {success && <div className="profileSuccess">{success}</div>}
              {error && <div className="profileError">{error}</div>}
              <button className="profileSaveButton" type="submit">Save</button>
            </form>
            <button className="profileLogoutButton" onClick={handleLogout}>Log out</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;