"use client"

import { useUser } from "@/context/userContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>HomePage</div>
  );
};

export default HomePage;
