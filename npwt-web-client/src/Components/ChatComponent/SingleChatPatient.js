import React, { useEffect, useState } from 'react';
import './chatbox.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import SideNavBarComponent from '../NavBarComponent/SideNavBarComponent';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client" ;
function SingleChatPatient() {
  const socket=io(`${process.env.REACT_APP_BACKEND_URL}`);
  const ENDPOINT=`${process.env.REACT_APP_BACKEND_URL}`; 
  var selectedChatCompare ;
  const [socketConnected,setSocketConnected]=useState(false);
  const [User, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const [messages, setMessages] = useState([]);
  const [messagesProps, setMessagesProps] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setselectedChat] = useState({});
  var decodedToken = jwt_decode(token);
  const selectedUser = useSelector((state) => 
  state.userSelectedSlice.selectedUser);
  const selectedReceiver=useSelector((state)=>
  state.userSelectedSlice.selectedReceiver)


    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
          .then((response) => {
            setUser(response.data);           
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
      
  useEffect(()=>{ 
  
    socket.emit("setup",User);
    socket.on("connection",()=>setSocketConnected(true))
  },[]);
      useEffect(() => {      
      axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/chat/getChat`,{ 
            userConnectedId:decodedToken.id,
            userReceivedId:selectedReceiver._id
          })
          .then((response) => {
            setselectedChat(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);


  const handleSubmit =async (event) => {
    event.preventDefault();
    setMessages([...messages, { text: newMessage }]);
    setNewMessage('');
    await sendMessage();
    await fetchMessages()
  };
  const fetchMessages=async()=>{ 
    if (!selectedChat || selectedChat.length === 0) {
      console.log('Selected chat is undefined or empty');
      return;
    }
    const chatId=await selectedChat[0]._id
    try{ 
      const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/message/${chatId}`);
      const contents = data.data.map((message) => message.content);
      setMessages(data.data)
      setMessagesProps(data)
      socket.emit("join chat",selectedChat[0]._id)
    }catch(err){ 
      console.log(err.message);
    }
  }
  useEffect(()=>{ 
    console.log("here here here ")
    fetchMessages();
    selectedChatCompare=selectedChat;
  },[selectedChat])




  const sendMessage=async()=>{ 
    try{ 
        const data=await axios 
        .post(`${process.env.REACT_APP_BACKEND_URL}/message/sendMessage`,{ 
            content:newMessage, 
            chatId:selectedChat[0]._id,
            userConnectedId:decodedToken.id
        });    
        console.log(data.data)
        if(socket){ 
          socket.emit("new message",data.data)     
        }    
        setMessages([...messages, { text: data.data.content }]);
         
    }catch(error){ 
        console.log(error.message)
    }
   
  }
  
  useEffect(()=>{ 
    if (socket){ 
      socket.on("message received", (newMessageReceived) => {  
        console.log("here here here")
        console.log("here here here")     
           fetchMessages()    
          
        
      })
    }  
  })
  return (
    <div className="container  pt-5 pb-5">
        <div className=" row  ">
          <div className="col-lg-4">
            <SideNavBarComponent user={User}></SideNavBarComponent>
          </div>
    <div className="ChatApp">
      <h1>{selectedUser}</h1>
      <div className="messages">
      <ScrollableChat messages={messages} />
      </div>
      <form onSubmit={handleSubmit} className='formChat'>
        <input
          type="text"
          placeholder="Ecrire votre message..."
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit" style={{ backgroundColor:"#4169d6" }} >Envoyer</button>
      </form>
    </div>
    </div>
    </div>

  );
}
export default SingleChatPatient;