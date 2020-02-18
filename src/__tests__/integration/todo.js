const supertest = require("supertest");
const faker = require("faker");
const Todo = require("../../models/todo");
const server = require("../../server");

const request = supertest(server);

const createTodo = async (id, complete = false) =>
  Todo.create({
    _id: id,
    text: faker.lorem.sentence(),
    complete
  });

const removeDateFields = todo => {
  delete todo.createdAt;
  delete todo.updatedAt;
  return todo;
};

describe("TODOS", () => {
  beforeEach(() => {
    faker.seed(156879);
  });

  afterEach(async () => {
    await Todo.collection.drop();
  });

  it("should fetch all the todos", async () => {
    await createTodo("56cb91bdc3464f14678934cd");
    await createTodo("56cb91bdc3464f14678934cb", true);
    await createTodo("56cb91bdc3464f14678934cc");
    const response = await request.get("/todos");
    expect(response.status).toBe(200);
    expect(response.body.map(removeDateFields)).toMatchSnapshot();
  });

  it("should create a todo", async () => {
    const text = "A todo description";
    const response = await request.post("/todos").send({ text });
    expect(response.status).toBe(200);
    const { body } = response;
    expect(response.body._id).toHaveLength(24); // valid object id
    delete body._id; // because this changes everytime
    expect(removeDateFields(body)).toMatchSnapshot();
  });

  it("should fetch a todo by id", async () => {
    const id = "56cb91bdc3464f14678934ca";
    await createTodo(id);
    const response = await request.get(`/todos/${id}`);
    expect(response.status).toBe(200);
    expect(removeDateFields(response.body)).toMatchSnapshot();
  });

  it("should update a todo by id", async () => {
    const id = "56cb91bdc3464f14678934ca";
    await createTodo(id);
    const text = "An updated description";
    const response = await request
      .put(`/todos/${id}`)
      .send({ text, complete: true });
    expect(response.status).toBe(200);
    expect(removeDateFields(response.body)).toMatchSnapshot();
  });
});
