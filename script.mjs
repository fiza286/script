import express from "express";
import cors from "cors";
import path from "path";
const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.resolve();
app.use(express.json());
app.use(cors());
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get("/weather/:cityName", (req, res) => {
  const weatherData = {
    karachi: {
      cityName: "karachi",
      tempInC: 23,
      tempInF: 32,
      windDir: "NS",
      humidity: "41%",
      precipitation: "1%",
      condition: "Haze",
    },
    lahore: {
      cityName: "lahore",
      tempInC: 20,
      tempInF: 32,
      windDir: "WE",
      humidity: "81%",
      precipitation: "78%",
      condition: "Cloudy",
    },
    rawalpindi: {
      cityName: "rawalpindi",
      tempInC: 19,
      tempInF: 25,
      windDir: "WE",
      humidity: "91%",
      precipitation: "71%",
      condition: "Thunderstorm",
    },
  };

  let cityName = req.params.cityName.toLowerCase();
  const citySpecificData = weatherData[cityName];
  console.log(citySpecificData);
  console.log(cityName);
  res.send(citySpecificData);
});

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/users", (req, res) => {
  res.send("Arif", "Akmal", "Zahid");
});
app.use("/employee", express.static(path.join(__dirname, "public/post.html")));

const employeeArray = [];
app.post("/employeeAdd", (req, res) => {
  let data = req.body;
  employeeArray.push(data);

  console.log(employeeArray);
  res.send({ message: "Added Sucessfully" });
});

app.get("employeeGet", (req, res) => {
  res.send(employeeArray);
});

// Serve Static Files
app.use("/", express.static(path.join(__dirname, "public")));

// Employee Data Storage (Temporary)

// POST Route to Add Employee
app.post("/employeeAdd", (req, res) => {
  let data = req.body;
  let newEmployee = { id: employeeArray.length + 1, ...data }; // Add ID
  employeeArray.push(newEmployee);
  console.log(employeeArray);
  res.json({ message: "Employee Added Successfully", employee: newEmployee });
});

// GET Route to Retrieve All Employees
app.get("/employeeGet", (req, res) => {
  res.json(employeeArray);
});

// GET Route to Fetch Employee by ID
app.get("/employee/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  console.log(empId);
  const employee = employeeArray.find((emp) => emp.empId == empId);
  console.log(employeeArray)
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee Not Found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
