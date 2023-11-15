import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_PHOTO, SEARCH_PHOTO,  } from "../utils/queries";
import { SAVE_PHOTO } from "../utils/mutations";
import { savePhotoIds, getSavedPhotoIds } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const SearchPhoto = () => {
  const navigate = useNavigate();
  // create state for holding returned api data
  // const [searchedPhoto, setSearchedPhoto] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved photoId values
  const [savedPhotoIds, setSavedPhotoIds] = useState(getSavedPhotoIds());
  const [loadPhotos, { called, loading, data: allPhotos }] = useLazyQuery(
    GET_PHOTO,
    { variables: {} }
  );

  const [savePhoto, { error }] = useMutation(SAVE_PHOTO);


  const [searchPhotos, { called: searchCalled, loading: loadingSearch, data: dataSearch }] = useLazyQuery(
    SEARCH_PHOTO,
    { variables: {searchTerm: searchInput} }
  )

  const searchedPhoto = dataSearch?.searchPhotos || [];

  // create method to search for photo and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    searchPhotos()
  };

  // create function to handle saving a photo to our database
  const handleSavePhoto = async (photoId) => {
    
    // // find the book in `searchedPhoto` state by the matching id
    const photoToSave = searchedPhoto.find(
      (photo) => photo._id === photoId
    );
    
    console.log("🚀 ~ file: Search.jsx:57 ~ handleSavePhoto ~ photoToSave:", photoToSave)
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      console.log("🚀 ~ file: Search.jsx:69 ~ handleSavePhoto ~ photoId:", {
        photoId,
            username: Auth.getUser().data.username,
      })
      await savePhoto({
        variables: {
          photoId,
          username: Auth.getUser().data.username,
        },
      });
      savePhotoIds([...savedPhotoIds, photoId]);
      setSavedPhotoIds([...savedPhotoIds, photoId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark pt-5 pb-5 px-2">
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
                  style={{ marginLeft: 0, marginRight: 0 }}
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
        <h2 className="pt-5 text-center">
          {searchedPhoto?.length
            ? `Viewing ${searchedPhoto.length} results:`
            : "Search for a photo to begin"}
        </h2>
        <Row>
          {searchedPhoto?.map((photo) => {
            return (
              <Col key={photo._id} md="4" className="mt-2" >
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
                          (savedPhotoId) => savedPhotoId === photo._id
                        )}
                        className="btn-block btn-success"
                        onClick={() => handleSavePhoto(photo._id)}
                      >
                        {savedPhotoIds?.some(
                          (savedPhotoId) => savedPhotoId === photo._id
                        )
                          ? "This book has already been saved!"
                          : "Save this Book!"}
                      </Button>
                    )}
                    <div>
                      <Button className="btn-block btn-success" onClick={() => { navigate(`/OnePost/${photo._id}`)}}>
                        View Photo
                      </Button>
                    </div>
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
