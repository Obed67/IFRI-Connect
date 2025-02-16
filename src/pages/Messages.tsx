import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';

const Messages = () => {
  const [message, setMessage] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64&q=80',
      lastMessage: 'Salut! Comment se passe ton stage?',
      timestamp: '10:30'
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64&q=80',
      lastMessage: 'Tu as vu l\'offre de stage chez TechCorp?',
      timestamp: '09:15'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Alice Johnson',
      content: 'Salut! Comment se passe ton stage?',
      timestamp: '10:30',
      isSent: false
    },
    {
      id: 2,
      sender: 'Moi',
      content: 'Ça se passe super bien! Je travaille sur un projet React passionnant.',
      timestamp: '10:32',
      isSent: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex h-[calc(100vh-12rem)]">
        {/* Liste des contacts */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un contact..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{contact.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone de chat */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={contacts[0].avatar}
                alt={contacts[0].name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {contacts[0].name}
                </h2>
                <p className="text-sm text-gray-500">En ligne</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.isSent
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs ${msg.isSent ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;