"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Send, Phone, Camera, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  time: string;
  read: boolean;
  isMine: boolean;
}

interface Conversation {
  id: string;
  with: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "conv-1",
    with: "Palais des Délices",
    avatar: "PD",
    lastMessage: "Bonjour ! Nous avons bien reçu votre demande de devis pour le 15 juin.",
    time: "10:32",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", senderId: "them", senderName: "Palais des Délices", senderAvatar: "PD", content: "Bonjour ! Nous avons bien reçu votre demande de devis pour le 15 juin.", time: "10:32", read: true, isMine: false },
      { id: "m2", senderId: "me", senderName: "Vous", senderAvatar: "V", content: "Parfait, merci ! Pouvez-vous me donner une estimation du menu par personne ?", time: "10:35", read: true, isMine: true },
      { id: "m3", senderId: "them", senderName: "Palais des Délices", senderAvatar: "PD", content: "Bien sûr ! Nos formules commencent à partir de 3500 DA par personne pour le menu traditionnel et 5500 DA pour le menu gastronomique.", time: "10:38", read: false, isMine: false },
    ],
  },
  {
    id: "conv-2",
    with: "Lumière & Instant",
    avatar: "LI",
    lastMessage: "Les photos de votre séance engagement sont prêtes !",
    time: "Hier",
    unread: 1,
    online: false,
    messages: [
      { id: "m4", senderId: "them", senderName: "Lumière & Instant", senderAvatar: "LI", content: "Les photos de votre séance engagement sont prêtes !", time: "Hier 14:20", read: false, isMine: false },
    ],
  },
  {
    id: "conv-3",
    with: "Nour El Hayat",
    avatar: "NE",
    lastMessage: "Confirmation de votre rendez-vous essai le 12 mai à 15h.",
    time: "Mar 8",
    unread: 0,
    online: false,
    messages: [
      { id: "m5", senderId: "them", senderName: "Nour El Hayat", senderAvatar: "NE", content: "Confirmation de votre rendez-vous essai le 12 mai à 15h.", time: "Mar 8 09:00", read: true, isMine: false },
      { id: "m6", senderId: "me", senderName: "Vous", senderAvatar: "V", content: "Parfait, je serai là !", time: "Mar 8 09:15", read: true, isMine: true },
    ],
  },
];

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [convList, setConvList] = useState(conversations);

  const activeConv = convList.find((c) => c.id === selectedConv);

  const sendMessage = () => {
    if (!messageInput.trim() || !activeConv) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      senderId: "me",
      senderName: "Vous",
      senderAvatar: "V",
      content: messageInput,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      read: false,
      isMine: true,
    };
    setConvList((prev) =>
      prev.map((c) =>
        c.id === selectedConv
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: messageInput, time: "À l'instant", unread: 0 }
          : c
      )
    );
    setMessageInput("");
  };

  return (
    <div className="pt-20 pb-16 h-screen flex flex-col">
      <div className="flex-1 flex max-w-6xl mx-auto w-full overflow-hidden">
        {/* Desktop Sidebar */}
        <div className={cn(
          "w-full md:w-80 lg:w-96 border-r border-sand/30 bg-white flex flex-col",
          selectedConv && "hidden md:flex"
        )}>
          <div className="p-4 border-b border-sand/30">
            <h1 className="text-xl font-serif font-bold text-navy">Messages</h1>
            <div className="relative mt-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/30" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="input-premium pl-9 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {convList.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={cn(
                  "w-full px-4 py-3 flex items-start gap-3 hover:bg-ivory transition-colors text-left border-b border-sand/20",
                  selectedConv === conv.id && "bg-gold/5"
                )}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-xs font-serif font-bold text-gold">{conv.avatar}</span>
                  </div>
                  {conv.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy">{conv.with}</span>
                    <span className="text-xs text-navy/30">{conv.time}</span>
                  </div>
                  <p className="text-xs text-navy/50 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-1">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col bg-white",
          !selectedConv && "hidden md:flex md:items-center md:justify-center"
        )}>
          {!selectedConv ? (
            <div className="text-center text-navy/30">
              <p className="text-lg font-serif">Sélectionnez une conversation</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-sand/30 bg-white">
                <button className="md:hidden" onClick={() => setSelectedConv(null)}>
                  <ChevronLeft size={20} className="text-navy" />
                </button>
                <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-xs font-serif font-bold text-gold">{activeConv?.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-navy">{activeConv?.with}</p>
                  <p className="text-xs text-navy/30">{activeConv?.online ? "En ligne" : "Hors ligne"}</p>
                </div>
                <button className="p-2 text-navy/30 hover:text-navy transition-colors" aria-label="Appel">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-navy/30 hover:text-navy transition-colors" aria-label="Photo">
                  <Camera size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeConv?.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", msg.isMine ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[75%] px-4 py-2.5 rounded-2xl",
                      msg.isMine
                        ? "bg-gold text-white rounded-br-md"
                        : "bg-ivory text-navy rounded-bl-md"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className={cn("text-[10px] mt-1", msg.isMine ? "text-white/60" : "text-navy/30")}>
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-sand/30 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 px-4 py-2.5 bg-ivory rounded-full text-sm text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="Envoyer"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
