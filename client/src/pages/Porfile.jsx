import { gql, useQuery } from "@apollo/client";

export const GET_ME = gql`
query Me {
  me {
    _id
    username
    email
    password
    photos {
      title
      photoId
      description
      imagelink
      date
    }
  }
}
`;



const Me = () => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something has gone terribly wrong</p>;
  }

  return (
    <div>
      {data.me((me) => (
      <><h1>This is your profile...Like right now!</h1><p key={me._id}> name: {me.name}</p><p key={me._id}> email: {me.email}</p></>
      ))}
      {/* {data.profiles.map((profile) => (
        <p key={profile._id}>
          {profile.name} loves {profile.skills.join(", ")}
        </p> 
      ))} */}
    </div>
  );
};

export default Me;