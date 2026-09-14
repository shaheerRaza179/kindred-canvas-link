import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  CURRENT_USER_ID,
  initialConversations,
  initialFollowers,
  initialFollowing,
  initialNotifications,
  initialPosts,
  initialUsers,
  type Conversation,
  type Notification,
  type Post,
  type User,
} from "./data";

type Store = {
  users: User[];
  posts: Post[];
  conversations: Conversation[];
  notifications: Notification[];
  following: string[];
  followers: string[];
  currentUser: User;
  signedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  userByUsername: (username: string) => User | undefined;
  userById: (id: string) => User | undefined;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  addPost: (caption: string, image?: string) => string;
  toggleFollow: (userId: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startConversation: (userId: string) => string;
  updateProfile: (patch: Partial<User>) => void;
};

const StoreContext = createContext<Store | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState(initialUsers);
  const [posts, setPosts] = useState(initialPosts);
  const [conversations, setConversations] = useState(initialConversations);
  const [notifications] = useState(initialNotifications);
  const [following, setFollowing] = useState(initialFollowing);
  const [followers] = useState(initialFollowers);
  const [signedIn, setSignedIn] = useState(true);

  const value = useMemo<Store>(() => {
    const currentUser = users.find((u) => u.id === CURRENT_USER_ID)!;
    return {
      users,
      posts,
      conversations,
      notifications,
      following,
      followers,
      currentUser,
      signedIn,
      signIn: () => setSignedIn(true),
      signOut: () => setSignedIn(false),
      userByUsername: (username) => users.find((u) => u.username === username),
      userById: (id) => users.find((u) => u.id === id),
      toggleLike: (postId) =>
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  likedBy: p.likedBy.includes(CURRENT_USER_ID)
                    ? p.likedBy.filter((i) => i !== CURRENT_USER_ID)
                    : [...p.likedBy, CURRENT_USER_ID],
                }
              : p,
          ),
        ),
      addComment: (postId, text) =>
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  comments: [
                    ...p.comments,
                    {
                      id: uid(),
                      userId: CURRENT_USER_ID,
                      text,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                }
              : p,
          ),
        ),
      addPost: (caption, image) => {
        const id = uid();
        setPosts((prev) => [
          {
            id,
            userId: CURRENT_USER_ID,
            caption,
            image,
            createdAt: new Date().toISOString(),
            likedBy: [],
            comments: [],
          },
          ...prev,
        ]);
        return id;
      },
      toggleFollow: (userId) =>
        setFollowing((prev) =>
          prev.includes(userId) ? prev.filter((i) => i !== userId) : [...prev, userId],
        ),
      sendMessage: (conversationId, text) =>
        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    {
                      id: uid(),
                      fromId: CURRENT_USER_ID,
                      text,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                }
              : c,
          ),
        ),
      startConversation: (userId) => {
        const existing = conversations.find((c) => c.userId === userId);
        if (existing) return existing.id;
        const id = uid();
        setConversations((prev) => [{ id, userId, messages: [] }, ...prev]);
        return id;
      },
      updateProfile: (patch) =>
        setUsers((prev) => prev.map((u) => (u.id === CURRENT_USER_ID ? { ...u, ...patch } : u))),
    };
  }, [users, posts, conversations, notifications, following, followers, signedIn]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
