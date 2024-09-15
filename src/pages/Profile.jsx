import React, {
  useContext,
  useState,
  useReducer,
  useRef,
  useEffect,
} from "react";
import Nav from "../components/Nav";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import formatDateyyyyMMdd from "../../utils/formatDateyyyyMMdd";

import {
  updateProfileApi,
  updateProfilePicApi,
  profilePicApi,
} from "../../api";

const initialProfile = {
  username: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
  gender: localStorage.getItem("gender"),
  dob: localStorage.getItem("dob"),
  imgUrl: localStorage.getItem("imgUrl"),
  userId: localStorage.getItem("userId"),
};

function reducer(_, action) {
  return action.data;
}

export default function Profile() {
  const [editProfileEnable, setEditProfileEnable] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialProfile);
  const [file, setFile] = useState(null);

  const context = useContext(AuthContext);
  useEffect(() => {
    let newState = { ...context };
    delete newState["login"];
    delete newState["logout"];
    delete newState["token"];
    delete newState["isLoggedIn"];
    newState["id"] = newState["userId"];
    delete newState["userId"];

    dispatch({ data: newState });
  }, []);

  function handleEditClick(currentContext, editProfileEnable) {
    if (editProfileEnable) {
      //when clicked on cancel edit
      let newState = { ...currentContext };
      delete newState["login"];
      delete newState["logout"];
      delete newState["token"];
      delete newState["isLoggedIn"];
      newState["id"] = newState["userId"];
      delete newState["userId"];
      console.log(newState);

      dispatch({ data: newState });
    }
    setEditProfileEnable(!editProfileEnable);
  }

  function handleSaveChanges(state, token) {
    let newState = { ...state };
    newState["id"] = newState["userId"];
    delete newState["userId"];
    console.log(newState);
    newState;
    if (newState.email === "" || newState.username === "") {
      return alert("Cannot submit empty fields.");
    }
    try {
      axios
        .patch(`${updateProfileApi}/${newState.userId}`, newState, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.data;

            const formattedDate = formatDateyyyyMMdd(data.dob);
            console.log("success", data, formattedDate);
            context.login({
              ...data,
              username: data.name,
              imgUrl: data.img_url,
              userId: data.id,
              dob: formattedDate,
              token: context.token,
            });
            alert("Changes saved successfully.✅");
            localStorage.setItem("email", data.email.toLowerCase());
            localStorage.setItem("authorized", "true");
            localStorage.setItem("name", data.name);
            localStorage.setItem("dob", formattedDate);
            localStorage.setItem("imgUrl", data.img_url);
            localStorage.setItem("gender", data.gender);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("auth_token", token);
            localStorage.setItem("role", data.role);
          } else {
            return alert("Cannot update the profile. Something went wrong.");
          }
        });
    } catch (e) {
      console.error(e);
      return alert("Username or Email is already in use.");
    }
  }

  async function handlePictureSave(file, curContext) {
    if (!file) return alert("No File found.");
    if (file.size > 100 * 1024) {
      return alert("Size of the file must not exceed 100KBs.");
    }
    const form = new FormData();
    form.append("file", file);
    console.log(file);
    axios
      .patch(`${updateProfilePicApi}/${curContext.userId}`, form, {
        headers: { Authorization: `Bearer ${curContext.token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data.img_url);
          let newContext = { ...curContext };
          delete newContext["login"];
          delete newContext["logout"];
          delete newContext["isLoggedIn"];
          localStorage.setItem("imgUrl", res.data.data.img_url);
          context.login({ ...newContext, imgUrl: res.data.data.img_url });
        }
      });
  }

  return (
    <div className="bg-off-white min-h-[100vh]">
      <Nav />
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="rounded p-2 text-3xl font-bold m-2 bg-white shadow-md min-h-[50px]">
              User Profile
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="rounded p-2 text-3xl font-bold m-2 bg-white shadow-md min-h-[50px] flex flex-column items-center justify-center gap-2">
              <div
                className="rounded"
                style={{
                  backgroundImage: `url(${profilePicApi}/${context.imgUrl})`,
                  height: "250px",
                  width: "250px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="flex items-center justify-between gap-5">
                <div className="p-1 text-2xl font-bold">{context.username}</div>
                <InputGroup>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  <Button
                    disabled={!context.isLoggedIn}
                    variant="primary"
                    onClick={() => handlePictureSave(file, context)}
                  >
                    <span className="text-xl font-bold">💾 Save</span>
                  </Button>
                  <Form.Text muted>
                    <span className="text-sm font-semibold">
                      The size of the picture must not exceed 100KBs.
                    </span>
                  </Form.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          <Col>
            <div className="rounded p-2 text-2xl font-bold m-2 bg-white shadow-md min-h-[50px]">
              <div className="flex items-center justify-between mb-2">
                <div>User Info</div>
                <Button disabled={!context.isLoggedIn}>
                  <span
                    className="text-xl"
                    onClick={() => handleEditClick(context, editProfileEnable)}
                  >
                    {editProfileEnable ? "↩️Cancel Edit" : "✏️ Edit Info"}
                  </span>
                </Button>
              </div>
              <Row className="mb-2">
                <Col className="text-slate-500">Username</Col>
                <Col>
                  <Form.Control
                    className="font-bold"
                    value={state.username}
                    placeholder={
                      !context.isLoggedIn ? "Not Logged In" : "New Username"
                    }
                    onChange={(e) =>
                      dispatch({ data: { ...state, username: e.target.value } })
                    }
                    disabled={!editProfileEnable}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="text-slate-500">Email</Col>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder={
                      !context.isLoggedIn ? "Not Logged In" : "New Email"
                    }
                    value={state.email}
                    onChange={(e) =>
                      dispatch({ data: { ...state, email: e.target.value } })
                    }
                    disabled={!editProfileEnable}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="text-slate-500">Dob</Col>
                <Col>
                  <Form.Control
                    type="date"
                    value={state.dob}
                    onChange={(e) =>
                      dispatch({ data: { ...state, dob: e.target.value } })
                    }
                    disabled={!editProfileEnable}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="text-slate-500">Gender</Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="primary"
                      id="dropdown-basic"
                      disabled={!editProfileEnable}
                    >
                      {state.gender === "M"
                        ? "Male 👨🏿‍🦱"
                        : state.gender === "F"
                        ? "Female 👩🏿‍🦰"
                        : "Others 🌈"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={(e) =>
                          dispatch({ data: { ...state, gender: "M" } })
                        }
                      >
                        Male 👨🏿‍🦱
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) =>
                          dispatch({ data: { ...state, gender: "F" } })
                        }
                      >
                        Female 👩🏿‍🦰
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) =>
                          dispatch({ data: { ...state, gender: "O" } })
                        }
                      >
                        Others 🌈
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col></Col>
                <Col>
                  <Button
                    disabled={!editProfileEnable}
                    variant="success"
                    onClick={() => handleSaveChanges(state, context.token)}
                  >
                    <span className="text-2xl font-bold">🚀Save Changes</span>
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
