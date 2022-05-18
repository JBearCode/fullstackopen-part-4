const LogoutButton = ({setUser}) => {

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