export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  cover: string;
  bio: string;
};

export type Comment = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
};

export type Post = {
  id: string;
  userId: string;
  image?: string;
  caption: string;
  createdAt: string;
  likedBy: string[];
  comments: Comment[];
};

export type Message = {
  id: string;
  fromId: string;
  text: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  userId: string;
  messages: Message[];
};

export type Notification = {
  id: string;
  type: "like" | "comment" | "follow";
  userId: string;
  postId?: string;
  createdAt: string;
};

const av = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${seed}&backgroundColor=1f2937`;
const img = (seed: string) => `https://picsum.photos/seed/${seed}/900/900`;
const cov = (seed: string) => `https://picsum.photos/seed/${seed}-cover/1600/500`;

export const CURRENT_USER_ID = "u1";

export const initialUsers: User[] = [
  {
    id: "u1",
    name: "Ali Raza",
    username: "aliraza",
    email: "ali@example.com",
    avatar: av("aliraza"),
    cover: cov("aliraza"),
    bio: "Product designer & photographer. Building things on the internet.",
  },
  {
    id: "u2",
    name: "Maya Chen",
    username: "mayachen",
    email: "maya@example.com",
    avatar: av("maya"),
    cover: cov("maya"),
    bio: "Frontend engineer. Coffee, code, and city walks.",
  },
  {
    id: "u3",
    name: "Diego Alvarez",
    username: "diego",
    email: "diego@example.com",
    avatar: av("diego"),
    cover: cov("diego"),
    bio: "Travel films and long exposures.",
  },
  {
    id: "u4",
    name: "Sara Malik",
    username: "saramalik",
    email: "sara@example.com",
    avatar: av("sara"),
    cover: cov("sara"),
    bio: "Illustrator. Sketching the everyday.",
  },
  {
    id: "u5",
    name: "Tom Becker",
    username: "tombecker",
    email: "tom@example.com",
    avatar: av("tom"),
    cover: cov("tom"),
    bio: "Runner, gear nerd, sunrise chaser.",
  },
  {
    id: "u6",
    name: "Ines Duarte",
    username: "inesd",
    email: "ines@example.com",
    avatar: av("ines"),
    cover: cov("ines"),
    bio: "Architecture & minimal spaces.",
  },
];

const ago = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();

export const initialPosts: Post[] = [
  {
    id: "p1",
    userId: "u2",
    image: img("post1"),
    caption: "Golden hour from the studio window. Shot on 35mm.",
    createdAt: ago(35),
    likedBy: ["u3", "u4"],
    comments: [
      { id: "c1", userId: "u3", text: "The light here is unreal 🔥", createdAt: ago(20) },
      { id: "c2", userId: "u5", text: "What lens?", createdAt: ago(12) },
    ],
  },
  {
    id: "p2",
    userId: "u3",
    image: img("post2"),
    caption: "Three days off-grid. No signal, best sleep of my life.",
    createdAt: ago(180),
    likedBy: ["u1", "u2", "u6"],
    comments: [{ id: "c3", userId: "u2", text: "Saving this for my next trip", createdAt: ago(90) }],
  },
  {
    id: "p3",
    userId: "u4",
    caption:
      "Small reminder: the first draft is supposed to be bad. Ship it anyway, then make it good.",
    createdAt: ago(320),
    likedBy: ["u1"],
    comments: [],
  },
  {
    id: "p4",
    userId: "u6",
    image: img("post4"),
    caption: "Concrete, glass, and one very stubborn plant.",
    createdAt: ago(600),
    likedBy: ["u2", "u5"],
    comments: [{ id: "c4", userId: "u4", text: "Composition is perfect", createdAt: ago(400) }],
  },
  {
    id: "p5",
    userId: "u1",
    image: img("post5"),
    caption: "New workspace setup finally done.",
    createdAt: ago(900),
    likedBy: ["u2", "u3", "u4", "u5"],
    comments: [{ id: "c5", userId: "u3", text: "Clean!", createdAt: ago(800) }],
  },
  {
    id: "p6",
    userId: "u1",
    image: img("post6"),
    caption: "Morning run, 8km, zero regrets.",
    createdAt: ago(2000),
    likedBy: ["u5"],
    comments: [],
  },
  {
    id: "p7",
    userId: "u1",
    image: img("post7"),
    caption: "Sketching out a new interface idea.",
    createdAt: ago(4000),
    likedBy: ["u2", "u6"],
    comments: [],
  },
];

export const initialConversations: Conversation[] = [
  {
    id: "cv1",
    userId: "u2",
    messages: [
      { id: "m1", fromId: "u2", text: "Hey! Did you see the new build?", createdAt: ago(60) },
      { id: "m2", fromId: "u1", text: "Just opened it — looks so much cleaner", createdAt: ago(58) },
      { id: "m3", fromId: "u2", text: "Right? Let's ship Friday 🚀", createdAt: ago(55) },
    ],
  },
  {
    id: "cv2",
    userId: "u3",
    messages: [
      { id: "m4", fromId: "u3", text: "Sending the trip photos tonight", createdAt: ago(400) },
      { id: "m5", fromId: "u1", text: "Can't wait", createdAt: ago(390) },
    ],
  },
  {
    id: "cv3",
    userId: "u4",
    messages: [{ id: "m6", fromId: "u4", text: "Thanks for the feedback!", createdAt: ago(1500) }],
  },
];

export const initialNotifications: Notification[] = [
  { id: "n1", type: "like", userId: "u2", postId: "p5", createdAt: ago(15) },
  { id: "n2", type: "comment", userId: "u3", postId: "p5", createdAt: ago(45) },
  { id: "n3", type: "follow", userId: "u6", createdAt: ago(120) },
  { id: "n4", type: "like", userId: "u5", postId: "p6", createdAt: ago(300) },
  { id: "n5", type: "follow", userId: "u4", createdAt: ago(1400) },
];

export const initialFollowing = ["u2", "u3", "u4", "u6"];
export const initialFollowers = ["u2", "u3", "u5", "u6"];

export function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return `${Math.floor(diff / 604800)}w`;
}
