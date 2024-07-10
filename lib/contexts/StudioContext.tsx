"use client";
import { createContext, useState } from "react";

export const StudioContext = createContext<{
  post: any;
  updatePost: (data: any) => void;
}>({
  updatePost: (data: any) => {},
  post: null,
});

export const StudioProvider = ({ children }: any) => {
  const [post, setPost] = useState<string | null>(null);

  const updatePost = (data: any) => {
    console.log(data);
    setPost(data);
    return post;
  };

  return (
    <StudioContext.Provider
      value={{
        post,
        updatePost,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};
