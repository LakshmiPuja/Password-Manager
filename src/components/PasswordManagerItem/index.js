import './index.css'

const PasswordManagerItem = props => {
  const {passwordDetails, clickDeleteButton, checked} = props
  const {id, website, username, password, initialClassName} = passwordDetails
  const initial = username ? website[0].toUpperCase() : ' '

  const clickButton = () => {
    clickDeleteButton(id)
  }

  return (
    <li className="list-item">
      <div className="account-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div className="details-container">
          <p className="details">{website}</p>
          <p className="details">{username}</p>
          {checked ? (
            <p className="details">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              className="starts-img"
              alt="stars"
            />
          )}
        </div>
        <button
          className="delete-btn"
          type="button"
          onClick={clickButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            className="delete-img"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default PasswordManagerItem
