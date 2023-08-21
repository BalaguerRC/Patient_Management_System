import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDoctor = () => {
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Identity, setIdentity] = useState("");
  const [Image, setImage] = useState();

  /**Errors */

  const [ErrName, setErrName] = useState(false);
  const [ErrLastName, setErrLastName] = useState(false);
  const [ErrMail, setErrMail] = useState(false);
  const [ErrPhone, setErrPhone] = useState(false);
  const [ErrIdentity, setErrIdentity] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");

  const getUser = () => {
    fetch(import.meta.env.VITE_APIURL + "Doctors/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setName(data.data.name_Doctor);
        setLastName(data.data.lastName_Doctor);
        setMail(data.data.email_Doctor);
        setPhone(data.data.phone_Doctor);
        setIdentity(data.data.identity_Doctor);
        setImage(data.data.img_Doctor);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const Update = (name, lastname, mail, phone, identity, image) => {

    if (!Name || Name === "") setErrName(!ErrName);
    else if (!LastName || LastName === "") setErrLastName(!ErrLastName);
    else if (!Mail || Mail === "") setErrMail(!ErrMail);
    else if (!Phone || Phone === "") setErrPhone(!ErrPhone);
    else if (!Identity || Identity === "") setErrIdentity(!ErrIdentity);
    else {
      //console.log(name, lastname, mail, phone, identity, image);

      fetch(import.meta.env.VITE_APIURL + "Doctors/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/Json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name_Doctor: name,
          lastName_Doctor: lastname,
          email_Doctor: mail,
          phone_Doctor: phone,
          identity_Doctor: identity,
          img_Doctor: image,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.success) navigate("/doctors")
          else console.log(data)
        });
    }
  };

  return (
    <div>
      <Grid item>
        <Paper>
          <Grid
            container
            direction={"row"}
            justifyContent={"left"}
            alignItems={"center"}
            sx={{ p: 1 }}
          >
            <Grid item>
              <Button onClick={() => navigate("/doctors")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Update Doctor: {id}</Typography>
            </Grid>
          </Grid>
          <Divider />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pt: 4, pr: 4, pl: 4 }}
          >
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
              xs={6}
            >
              <TextField
                type="text"
                /*error*/
                error={ErrName}
                helperText={ErrName ? "falta name" : null}
                placeholder="name..."
                label={"Name"}
                variant="standard"
                value={Name}
                fullWidth
                required
                onChange={(e) => {
                  setName(e.target.value);
                  setErrName(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
              xs={6}
            >
              <TextField
                type="text"
                placeholder="lastname..."
                error={ErrLastName}
                helperText={ErrLastName ? "falta lastname" : null}
                value={LastName}
                required
                label={"Last Name"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrLastName(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
              xs={6}
            >
              <TextField
                type="text"
                error={ErrMail}
                helperText={ErrMail ? "falta mail" : null}
                value={Mail}
                placeholder="mail..."
                label={"Email"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setMail(e.target.value);
                  setErrMail(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
              xs={6}
            >
              <TextField
                type="text"
                error={ErrPhone}
                helperText={ErrPhone ? "falta Phone" : null}
                value={Phone}
                placeholder="Phone..."
                label={"Phone"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrPhone(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
              xs={6}
            >
              <TextField
                type="text"
                error={ErrIdentity}
                helperText={ErrIdentity ? "falta Identity" : null}
                value={Identity}
                placeholder="identity..."
                label={"Identity"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setIdentity(e.target.value);
                  setErrIdentity(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
              xs={6}
            >
              <TextField
                type="text"
                placeholder="img..."
                label={"Img"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                disabled
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid
            container
            direction={"row"}
            justifyContent={"right"}
            sx={{ p: 2 }}
          >
            <Grid item>
              <Button variant="contained" type="submit" disabled sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                type="submit"
                onClick={() =>
                  Update(Name, LastName, Mail, Phone, Identity, Image)
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

{
  /**
  <div>
      Edit {id}
      <Button onClick={() => navigate("/doctors")}>{"<-"}Back</Button>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField type="text" placeholder="name..." fullWidth value={Name} onChange={(e)=>setName(e.target.value)}/>
          <TextField type="text" placeholder="lastname..." fullWidth value={LastName} onChange={(e)=>setLastName(e.target.value)}/>
          <TextField type="text" placeholder="mail..." fullWidth value={Mail} onChange={(e)=>setMail(e.target.value)}/>
          <TextField type="text" placeholder="phone..." fullWidth value={Phone} onChange={(e)=>setPhone(e.target.value)}/>
          <TextField type="text" placeholder="identity..." fullWidth value={Identity} onChange={(e)=>setIdentity(e.target.value)}/>
          <TextField type="file" />

          <Button onClick={()=>Update(Name,LastName,Mail,Phone,Identity,Image)}>Save</Button>
        </Grid>
      </Paper>
    </div>
   */
}

export default EditDoctor;
