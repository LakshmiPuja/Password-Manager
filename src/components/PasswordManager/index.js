import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import PasswordManagerItem from '../PasswordManagerItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  ' #f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#ffffff',
  '#0ea5e9',
  ' #64748b',
]

class PasswordManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      passwordsList: [],
      searchInput: '',
      checked: false,
    }
  }

  addUserName = event => {
    this.setState({usernameInput: event.target.value})
  }

  addPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  addWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  addNewPassword = event => {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
    } = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    event.preventDefault()
    const newPassword = {
      id: uuid(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState({
      passwordsList: [...passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      searchInput: '',
    })
  }

  onCheckBox = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
  }

  getSearchResult = () => {
    const {passwordsList, searchInput} = this.state
    const searchResult = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResult
  }

  toggleDeleteButton = id => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    })
  }

  render() {
    const {
      usernameInput,
      websiteInput,
      passwordInput,
      passwordsList,
      checked,
      searchInput,
    } = this.state
    const searchResults = this.getSearchResult()
    let review
    if (
      (searchResults.length === 0 && searchInput !== '') ||
      passwordsList.length === 0
    ) {
      review = (
        <div className="no-passwords-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            className="no-password-img"
            alt="no passwords"
          />
          <p className="no-passwords">No Passwords</p>
        </div>
      )
    } else {
      review = (
        <ul className="list-container">
          {searchResults.map(each => (
            <PasswordManagerItem
              key={each.id}
              passwordDetails={each}
              checked={checked}
              clickDeleteButton={this.toggleDeleteButton}
            />
          ))}
        </ul>
      )
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          className="logo-img"
          alt="app logo"
        />
        <div className="card-container">
          <div className="form-container">
            <form className="form" onSubmit={this.addNewPassword}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="icon-img"
                    alt="website"
                  />
                </div>
                <input
                  placeholder="Enter Website"
                  type="text"
                  className="input"
                  onChange={this.addWebsite}
                  value={websiteInput}
                />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="icon-img"
                    alt="username"
                  />
                </div>
                <input
                  placeholder="Enter Username"
                  type="text"
                  className="input"
                  onChange={this.addUserName}
                  value={usernameInput}
                />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    className="icon-img"
                    alt="password"
                  />
                </div>
                <input
                  placeholder="Enter Password"
                  type="password"
                  className="input"
                  onChange={this.addPassword}
                  value={passwordInput}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              className="img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
          <div className="password-container">
            <div className="header">
              <div className="title-container">
                <h1 className="title">Your Passwords</h1>
                <p className="count"> {passwordsList.length}</p>
              </div>

              <div className="input-container">
                <div className="icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    className="icon-img"
                    alt="search"
                  />
                </div>
                <input
                  placeholder="search"
                  className="input"
                  type="search"
                  onChange={this.onSearchInput}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="separator" />
            <div className="check-box-container">
              <input
                type="checkbox"
                id="checkbox"
                className="check-box"
                value={checked}
                onChange={this.onCheckBox}
              />
              <label className="label" htmlFor="checkbox">
                Show passwords
              </label>
            </div>
            <div>{review}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
