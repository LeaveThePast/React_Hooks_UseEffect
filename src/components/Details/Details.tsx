import React, { useState, useEffect } from "react";
import { User, UserDetails } from "../types"; // Предполагаем, что типы экспортированы отдельно

interface DetailsProps {
  info: User;
}

function Details({ info }: DetailsProps): JSX.Element {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`,
    )
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
        setIsLoading(false);
      });
  }, [info.id]);

  if (isLoading) return <p>Loading...</p>;
  if (!userDetails) return <p>No user details</p>;

  return (
    <div>
      <h1>{userDetails.name}</h1>
      <img src={userDetails.avatar} alt="User Avatar" />
      <p>City: {userDetails.details.city}</p>
      <p>Company: {userDetails.details.company}</p>
      <p>Position: {userDetails.details.position}</p>
    </div>
  );
}

export default Details;
