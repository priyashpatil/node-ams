const request = require("supertest");
const app = require("../app");

describe("Sample TEST", () => {
  test("GET /login --> get login", (done) => {
    request(app)
      .get("/login")
      .expect(200)
    //   .expect((res) => {
    //     res.body.data.length = 1;
    //     res.body.data[0].email = "test@example.com";
    //   })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("GET /users/id --> get user by id", () => {});

  it("POST /users --> add user", () => {});

  it("PATCH /users/id --> update user by id", () => {});

  it("DELETE /users/id --> delete user by id", () => {});
});