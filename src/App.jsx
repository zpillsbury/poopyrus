import AppBar from "@mui/material/AppBar"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import Switch from "@mui/material/Switch"

import "./App.css"
import Cat from "./images/cat.jpg"
import Dog from "./images/dog.jpg"

export function App() {
  const [dogName, setDogName] = useState("")
  const [catName, setCatName] = useState("")
  const [switchValue, setSwitchValue] = useState(false)

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Zakamo
          </Typography>
        </Toolbar>
      </AppBar>

      <div id="content">
        <Switch
          checked={switchValue}
          onChange={(e) => {
            setSwitchValue(e.target.checked)
          }}
        />

        <p>switch value: {`${switchValue}`}</p>

        <Grid container spacing={3}>
          <Grid size={6}>
            <Typography variant="h4">Cat {catName}</Typography>

            <img src={Cat} alt="Cat" className="pets" />

            <div>
              <TextField
                label="Name Em!"
                variant="outlined"
                className="name-input"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid size={6}>
            <Typography variant="h4">Dog {dogName}</Typography>

            <img src={Dog} alt="Dog" className="pets" />

            <div>
              <TextField
                label="Name Em!"
                variant="outlined"
                className="name-input"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
