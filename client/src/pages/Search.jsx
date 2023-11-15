import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_PHOTO } from "../utils/queries";
import { savePhotoIds, getSavedPhotoIds } from "../utils/localStorage";

const SearchPhoto = () => {
  // create state for holding returned api data
  const [searchedPhoto, setSearchedPhoto] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved photoId values
  const [savedPhotoIds, setSavedPhotoIds] = useState(getSavedPhotoIds());

  // set up useEffect hook to save `savedPhotoIds` list to localStorage on component unmount
  useEffect(() => {
    return () => savePhotoIds(savedPhotoIds);
  });

  // create method to search for photo and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await GET_PHOTO(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const photoData = items.map((photo) => ({
        photoId: photo.id,
        username: photo.Info.username || ["No username to display"],
        title: photo.Info.title,
        description: photo.volumeInfo.description,
        imagelink: photo.volumeInfo.imagelink?.thumbnail || "",
      }));

      setSearchedPhoto(photoData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a photo to our database
  const handleSavePhoto = async (photoId) => {
    // find the book in `searchedPhoto` state by the matching id
    const photoToSave = searchedPhoto.find(
      (photo) => photo.photoId === photoId
    );

    const [savePhoto] = useQuery(GET_PHOTO);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await savePhoto(photoToSave, token);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save photo id to state
      setSavedPhotoIds([...savedPhotoIds, photoToSave.photoId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a photo"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedPhoto.length
            ? `Viewing ${searchedPhoto.length} results:`
            : "Search for a photo to begin"}
        </h2>
        <Row>
          {searchedPhoto.map((photo) => {
            return (
              <Col md="4" key={photo.photoId}>
                <Card border="dark">
                  {photo.image ? (
                    <Card.Img
                      src={photo.image}
                      alt={`The cover for ${photo.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{photo.title}</Card.Title>
                    <p className="small">Usernames: {photo.username}</p>
                    <Card.Text>{photo.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedPhotoIds?.some(
                          (savedPhotoId) => savedPhotoId === photo.photoId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSavePhoto(photo.photoId)}
                      >
                        {savedPhotoIds?.some(
                          (savedPhotoId) => savedPhotoId === photo.PhotoId
                        )
                          ? "This book has already been saved!"
                          : "Save this Book!"}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchPhoto;
