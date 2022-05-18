const LogoutButton = ({setUser}) => {

    // removes user token from local storage and set user to null in app state
    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
      }
  
    return (
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    )
  }

  export default LogoutButton