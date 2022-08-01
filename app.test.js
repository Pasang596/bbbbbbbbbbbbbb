const request = require('supertest');
const app = require('./app.js');

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklkIjoiNjJkZWY3NmE4MTEzNmEyNGIwMDgyMGRmIiwiaWF0IjoxNjU4OTQ0MDI5fQ.GmOkcex1KTS5TgLObZ4yGHQeTCzWu9GYT0qh0W-bduY"

const stafftoken= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklkIjoiNjJkZWY3NmE4MTEzNmEyNGIwMDgyMGRmIiwiaWF0IjoxNjU4OTQ0MDI5fQ.GmOkcex1KTS5TgLObZ4yGHQeTCzWu9GYT0qh0W-bduY"

test("staff login test", async () => {
    await request(app)
      .post("/staff/login")
      .send({
        Email: "Admin",
        Password: "P"
      })
      .expect("Content-Type", /json/)
     
  });

  test("customer login test", async () => {
    await request(app)
      .post("/customer/login")
      .send({
        Email: "pp",
        Password: "P"
      })
      .expect("Content-Type", /json/)
     
  });

  test("staff register", async () => {
    await request(app)
      .post("/staff/insert")
      .send({
        Firstname : "Pasang",
    Lastname: "Lama",
    Username: "Pasang",
    Email: "Staff",
    Password: "P",
    Age : "21",
    Date : "21 ",
    PhoneNumber :"98765432",
    Location: "Tinchuli" 
      })
      .expect("Content-Type", /json/)
     
  });

  test("staff appointment", async () => {
    await request(app)
      .post("/staff/appointment/dateandtime")
      .set("Authorization", stafftoken)
      .send({
        "date" : "24 jan, 2022" ,
        "time": ["12:00 am" , "2:00 pm", "4:00pm"]
      })
      .expect("Content-Type", /json/)
     
  });

  test("product insert", async () => {
    await request(app)
      .post("/product/insert")
      .set("Authorization", stafftoken)
      .send({
        Product_name : "natural green",

      })
      .expect("Content-Type", /json/)
     
  });
  test("view product", async () => {
    await request(app)
      .get("/product/display")
      .set("Authorization", stafftoken)
      
      .expect("Content-Type", /json/)
     
  });
  
