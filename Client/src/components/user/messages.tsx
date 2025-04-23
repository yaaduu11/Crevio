import { MessageCircle, Menu, Search, Send } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastMessage: string;
  }
  
  const users: User[] = [
    {
      id: 1,
      name: 'Yadu',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online',
      lastMessage: 'Hey, how are you?'
    },
    // {
    //   id: 2,
    //   name: 'Inshad',
    //   avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //   status: 'offline',
    //   lastMessage: 'See you tomorrow!'
    // },
    // {
    //   id: 3,
    //   name: 'Mike Johnson',
    //   avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //   status: 'online',
    //   lastMessage: 'The meeting is at 3 PM'
    // }
  ];

const messages = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [message, setMessage] = useState('');
  
    return (
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <div className={`bg-white w-full md:w-80 flex-shrink-0 border-r rounded-xl h-5/5 ${isSidebarOpen ? '' : 'hidden'} md:block`}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Messages</h2>
              <button 
                className="text-gray-600 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Menu size={24} />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-9rem)]">
            {users.map(user => (
              <div
                key={user.id}
                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                  selectedUser?.id === user.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => {
                  setSelectedUser(user);
                  setIsSidebarOpen(false);
                }}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div className="flex-1 ml-4 md:block">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-xs text-gray-500">12:00 PM</p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="flex flex-col flex-1 h-5/5">
          {selectedUser ? (
            <>
              <div className="flex items-center px-6 py-4 bg-white border-b rounded-lg">
                <button
                  className="mr-4 text-gray-600 md:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu size={24} />
                </button>
                <div className="flex items-center">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedUser.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="flex items-end space-x-2">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="max-w-xs p-4 bg-gray-100 rounded-lg rounded-bl-none">
                    <p className="text-gray-800">Hey! How are you?</p>
                  </div>
                </div>
                <div className="flex items-end justify-end space-x-2">
                  <div className="max-w-xs p-4 text-white bg-blue-500 rounded-lg rounded-br-none">
                    <p>I'm doing great, thanks! How about you?</p>
                  </div>
                </div>
              </div>
  
              <div className="p-3 bg-white border-t rounded-lg">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    className="p-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <MessageCircle size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-700">Select a conversation</h3>
                <p className="text-gray-500">Choose a person from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default messages