import {ChatEngine, getOrCreateChat} from 'react-chat-engine';
import {useState} from 'react';

function Chat() {

const [username, setUsername] = useState('')
    
        function createDirectChat(creds) {
            getOrCreateChat(
                creds,
                { is_direct_chat: true, usernames: [username] },
                () => setUsername('')
            )
        }
    
        function renderChatForm(creds) {
            return (
                <div>
                    <input 
                        placeholder='Username' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <button onClick={() => createDirectChat(creds)}>
                        Create
                    </button>
                </div>
            )
            }
            
    return(
        <ChatEngine 
        height='100vh'
        projectID='c4db0464-98cf-4633-bff1-d883e0fdbf1d'
        userName='babyknowadmin'
        userSecret='BabyKnow@2023!'
        
        />

    )
}

export default Chat;

