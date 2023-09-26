import React, { useEffect, useState } from 'react';
import './chatbox.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client" ;
import SidebarApp from '../NavBarComponent/SidebarApp';
import SendIcon from '@mui/icons-material/Send';
import DefaultProfileImage from '../../defaultProfile.jpg';
import { Button } from '@mui/material';

function SingleChat() {
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
  const selectedUserImage = useSelector((state) => 
  state.userSelectedSlice.selectedReceiver.image)
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
  useEffect(()=>{ 
    socket.emit("setup",User);
    socket.on("connection",()=>setSocketConnected(true))
  },[]);
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
        
           fetchMessages()
         
        
      })
    }  
  })
  return (
    <div className="container  p-5">
        <div className=" row  ">
          <div className="col-lg-4 col-md-12">
            <SidebarApp user={User}></SidebarApp>
          </div>
          <div className="col-lg-8 col-md-12 mb-5">
            <div className="ml-lg-5">
              <div className="ChatApp">
                <div className='title'>
                  {selectedUserImage!==undefined ? 
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/userProfile/${selectedUserImage}`} className="imgChat2" alt="" />
                    :
                    <img src={DefaultProfileImage} alt="profileImage" id="img" className="imgChat2"/>
                  }
                  <h1>{selectedUser}</h1>
                </div>
                <div className='chatBox'>
                  <div className="messages">
                    <ScrollableChat messages={messages}  inverted={true}/>
                  </div>
                  <form onSubmit={handleSubmit} className='formChat'>
                    <input type="text" placeholder="Ecrire votre message..." value={newMessage} onChange={(event) => setNewMessage(event.target.value)}/>
                    <Button type="submit" style={{ backgroundColor:"#4169d6" }}><SendIcon /></Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default SingleChat;
