const RegisterForm = ({
  handleRegister,
  registerError,
  registerSuccess,
  onToggleForm
}) => (
  <div className="registerBox">
    <h2 className="registerTitle">Register</h2>
    <form className="registerForm" onSubmit={handleRegister}>
      <label className="userNameLabel">Email address</label>
      <input className="userNameinput" type="email" required />
      <label className="userNameLabel">Password</label>
      <input className="userNameinput" type="password" required />
      {registerError && <div style={{ color: "red" }}>{registerError}</div>}
      {registerSuccess && (
        <div style={{ color: "green" }}>
          Registration successful! Please check your email and confirm your account.
        </div>
      )}
      <button className="registerButton" type="submit">Register</button>
    </form>
  </div>
);

export default RegisterForm;