const LoginForm = ({
  handleLogin,
  loginError,
  rememberMe,
  setRememberMe,
}) => (
  <div className="loginBox">
    <h2 className="loginTitle">Log In</h2>
    <form className="loginForm" onSubmit={handleLogin}>
      <div className="loginInputs">
        <label className="userNameLabel">Username or email address</label>
        <input className="userNameinput" type="text" required />
        <label className="userNameLabel">Password</label>
        <input className="userNameinput" type="password" required />
        <div className="rememberInput">
          <input
            className="userCheckinput"
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          <label className="userCheckLabel">Remember me</label>
        </div>
      </div>
      {loginError && <div style={{ color: "red" }}>{loginError}</div>}
      <button className="logInButton" type="submit">Log in</button>
    </form>
  </div>
);

export default LoginForm;