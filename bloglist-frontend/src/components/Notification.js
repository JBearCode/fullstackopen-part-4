const Notification = ({ messageText, messageColor }) => {
  const styleObject = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (messageText === null) {
    return null;
  }

  return (
    <div className='notification' style={styleObject}>
      {messageText}
    </div>
  );
};

export default Notification;