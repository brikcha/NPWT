import ScrollableFeed from "react-scrollable-feed";
import jwt_decode from "jwt-decode";
import "./chat.css"


function ScrollableChat({messages}) {
   // console.log("messsage"+JSON.stringify(messages, null, 2))
    const token = localStorage.getItem("jwtToken");  
    var decodedToken = jwt_decode(token);
    return ( 
        <> 
        
       
        <div className="chat-box">
      {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.sender && message.sender._id === decodedToken.id
              ? "chat-bubble right"
              : "chat-bubble left"
          }
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
    
        </>
     );
}

export default ScrollableChat;